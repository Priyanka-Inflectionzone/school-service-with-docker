/* eslint-disable linebreak-style */
/* eslint-disable indent */
import { ClassModel } from '../../models/class/class.model';
import { ErrorHandler } from '../../../common/error.handler';
import { Op } from 'sequelize';
import { Helper } from '../../../common/helper';

////////////////////////////////////////////////////////////////////////

export class ClassService {

    Class = ClassModel.Model;

    create = async (createModel) => {
        try {
            var record = await this.Class.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create class!', error);
        }
    }

    getById = async (id) => {
        try {
            var record = await this.Class.findOne({
                where : {
                    id : id
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve class!', error);
        }
    }

    exists = async (id) => {
        try {
            const record = await this.Class.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of class!', error);
        }
    }

    search = async (filters) => {
        try {

            var search = {
                where   : {},
                include : []
            };

            if (filters.ClassTeacherId) {
                search.where['ClassTeacherId'] = {
                    [Op.like] : '%' + filters.ClassTeacherId + '%'
                };
            }
            if (filters.ClassName) {
                search.where['ClassName'] = filters.ClassName;
            }
            if (filters.NumberOfStudents) {
                search.where['NumberOfStudents'] = filters.NumberOfStudents;
            }
            
            //Sorting
            let orderByColumn = 'CreatedAt';
            if (filters.OrderBy) {
                orderByColumn = filters.OrderBy;
            }
            let order = 'ASC';
            if (filters.Order === 'descending') {
                order = 'DESC';
            }
            search['order'] = [
                [orderByColumn, order]
            ];

            if (filters.OrderBy) {
                //In case the order-by attribute is on associated model
                //search['order'] = [[ '<AssociatedModel>', filters.OrderBy, order]];
            }

            //Pagination
            let limit = 25;
            if (filters.ItemsPerPage) {
                limit = filters.ItemsPerPage;
            }
            let offset = 0;
            let pageIndex = 0;
            if (filters.PageIndex) {
                pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
                offset = pageIndex * limit;
            }
            search['limit'] = limit;
            search['offset'] = offset;

            const foundResults = await this.Class.findAndCountAll(search);
            const searchResults = {
                TotalCount     : foundResults.count,
                RetrievedCount : foundResults.rows.length,
                PageIndex      : pageIndex,
                ItemsPerPage   : limit,
                Order          : order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy      : orderByColumn,
                Items          : foundResults.rows,
            };

            return searchResults;

        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to search class records!', error);
        }
    }

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.Class.update(updateModel, {
                    where : {
                        id : id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update class!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update class!', error);
        }
    }

    delete = async (id) => {
        try {
            var result = await this.Class.destroy({
                where : {
                    id : id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete class!', error);
        }
    }

    getClass = async (
        className,
        numberOfStudents
    ) => {

        var filters = [];

       if ( className !== null) {
            filters.push({
                ClassName : className
            });
        }
        else if (numberOfStudents !== null) {
            filters.push({
                NumberOfStudents : numberOfStudents
            });
        }
        
        const findClass = await this.Class.findOne({
            where : {
                [Op.or] : filters
            }
        });

        if (!findClass) {
            return null;
        }

        return findClass;
    }

    getClassUpdateModel = (inputModel) => {

        var updateModel: any = {};

        if (Helper.hasProperty(inputModel, 'ClassName')) {
            updateModel.ClassName = inputModel.ClassName;
        }
        if (Helper.hasProperty(inputModel, 'NumberOfStudents')) {
            updateModel.NumberOfStudents = inputModel.NumberOfStudents;
        }
    
        return updateModel;
    }

}

