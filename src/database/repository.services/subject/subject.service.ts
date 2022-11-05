/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { SubjectModel } from '../../models/subject/subject.model';
import { ErrorHandler } from '../../../common/error.handler';
import { Op } from 'sequelize';
import { Helper } from '../../../common/helper';

////////////////////////////////////////////////////////////////////////

export class SubjectService {

    Subject = SubjectModel.Model;

    create = async (createModel) => {
        try {
            var record = await this.Subject.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create subject!', error);
        }
    }

    getById = async (id) => {
        try {
            var record = await this.Subject.findOne({
                where : {
                    id : id
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve subject!', error);
        }
    }

    exists = async (id) => {
        try {
            const record = await this.Subject.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of subject!', error);
        }
    }

    search = async (filters) => {
        try {

            var search = {
                where   : {},
                include : []
            };

            if (filters.SubjectTeacherId) {
                search.where['SubjectTeacherId'] = {
                    [Op.like] : '%' + filters.SubjectTeacherId + '%'
                };
            }
            if (filters.SubjectName) {
                search.where['SubjectName'] = filters.SubjectName;
           
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

            const foundResults = await this.Subject.findAndCountAll(search);
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

        } 
    }
    catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to search subject records!', error);
        }
    }

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.Subject.update(updateModel, {
                    where : {
                        id : id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update subject!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update subject!', error);
        }
    }

    delete = async (id) => {
        try {
            var result = await this.Subject.destroy({
                where : {
                    id : id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete subject!', error);
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
        
        const subject = await this.Subject.findOne({
            where : {
                [Op.or] : filters
            }
        });

        if (!subject) {
            return null;
        }

        return subject;
    }

    getClassUpdateModel = (inputModel) => {

        var updateModel: any = {};

        if (Helper.hasProperty(inputModel, 'SubjectName')) {
            updateModel.SubjectName = inputModel.SubjectName;
        }
        if (Helper.hasProperty(inputModel, 'SubjectTeacherId')) {
            updateModel.SubjectTeacherId = inputModel.SubjectTeacherId;
        }
    
        return updateModel;
    }

}
