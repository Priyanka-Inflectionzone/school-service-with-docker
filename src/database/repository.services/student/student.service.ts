/* eslint-disable linebreak-style */
import { StudentModel } from '../../models/student/student.model';
import { ErrorHandler } from '../../../common/error.handler';
import { Op } from 'sequelize';
import { Helper } from '../../../common/helper';

/////////////////////////////////////////////////////////////////////////////

export class StudentService {

    Student = StudentModel.Model;

    create = async (createModel) => {
        try {
            var record = await this.Student.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create student!', error);
        }
    }

    getById = async (id) => {
        try {
            var record = await this.Student.findOne({
                where : {
                    id : id
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve student!', error);
        }
    }

    exists = async (id) => {
        try {
            const record = await this.Student.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of student!', error);
        }
    }

    search = async (filters) => {
        try {

            var search = {
                where   : {},
                include : []
            };

            if (filters.ClassId) {
                search.where['ClassId'] = filters.ClassId;
            }
            if (filters.UserId) {
                search.where['UserId'] = filters.UserId;
            }
            if (filters.ParentId) {
                search.where['ParentId'] = filters.ParentId;
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

            const foundResults = await this.Student.findAndCountAll(search);
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search student records!', error);
        }
    }

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.Student.update(updateModel, {
                    where : {
                        id : id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update student!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update student!', error);
        }
    }

    delete = async (id) => {
        try {
            var result = await this.Student.destroy({
                where : {
                    id : id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete student!', error);
        }
    }

    getClass = async (
        userId,
        classId,
        parentId

    ) => {

        var filters = [];

        if ( userId !== null) {
            filters.push({
                UserId : userId
            });
        }
        else if (classId !== null) {
            filters.push({
                ClassId : classId
            });
        }
        else if (parentId !== null) {
            filters.push({
                ParentId : parentId
            });
        }
        
        const student = await this.Student.findOne({
            where : {
                [Op.or] : filters
            }
        });

        if (!student) {
            return null;
        }

        return student;
    }

    getClassUpdateModel = (inputModel) => {

        var updateModel: any = {};

        if (Helper.hasProperty(inputModel, 'ClassId')) {
            updateModel.ClassId = inputModel.ClassId;
        }
        return updateModel;
    }

}
