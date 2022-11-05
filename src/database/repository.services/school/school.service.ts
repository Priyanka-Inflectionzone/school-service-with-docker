/* eslint-disable lines-between-class-members */
/* eslint-disable linebreak-style */
import { SchoolModel } from '../../models/school/school.model';
import { ErrorHandler } from '../../../common/error.handler';
import { Op } from 'sequelize';
//import { Helper } from '../../../common/helper';

////////////////////////////////////////////////////////////////////////////////

export class SchoolService {

    School = SchoolModel.Model;

    create = async (createModel) => {
        try {
            var record = await this.School.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create user!', error);
        }
    }

    getById = async (id) => {
        try {
            var record = await this.School.findOne({
                where : {
                    id : id
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve school!', error);
        }
    }

    exists = async (id) => {
        try {
            const record = await this.School.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of school!', error);
        }
    }

    search = async (filters) => {
        try {

            var search = {
                where   : {},
                include : []
            };

            if (filters.SchoolName) {
                search.where['SchoolName'] = filters.SchoolName;
            }
            if (filters.Address) {
                search.where['Address'] = filters.Address;
            }
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

            const foundResults = await this.School.findAndCountAll(search);
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search school records!', error);
        }
    }

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.School.update(updateModel, {
                    where : {
                        id : id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update school!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update school!', error);
        }
    }

    delete = async (id) => {
        try {
            var result = await this.School.destroy({
                where : {
                    id : id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete school!', error);
        }
    }

    getSchool = async (
        schoolName,
        schoolAddress
    ) => {

        var filters = [];

        if (schoolName !== null && schoolAddress !== null) {
            filters.push({
                SchoolName : schoolName,
                Address    : schoolAddress
            });
        }
        
        const school = await this.School.findOne({
            where : {
                [Op.or] : filters
            }
        });

        if (!school) {
            return null;
        }

        return school;
    }


}
