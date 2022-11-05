/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { StaffModel } from '../../models/staff/staff.model';
import { ErrorHandler } from '../../../common/error.handler';
import { Op } from 'sequelize';
import { Helper } from '../../../common/helper';

/////////////////////////////////////////////////////////////////////////

export class StaffService {

    Staff = StaffModel.Model;

    create = async (createModel) => {
        try {
            var record = await this.Staff.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create staff!', error);
        }
    }

    getById = async (id) => {
        try {
            var record = await this.Staff.findOne({
                where : {
                    id : id
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve staff!', error);
        }
    }

    exists = async (id) => {
        try {
            const record = await this.Staff.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of staff!', error);
        }
    }

    search = async (filters) => {
        try {

            var search = {
                where   : {},
                include : []
            };

            if (filters.UserId) {
                search.where['UserId'] = {
                    [Op.like] : '%' + filters.UserId + '%'
                };
            }
            if (filters.Stafftype) {
                search.where['Stafftype'] = filters.StaffType;
            }
            
            //Sorting
            let orderByColumn = 'Salary';
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

            const foundResults = await this.Staff.findAndCountAll(search);
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search staff records!', error);
        }
    }

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.Staff.update(updateModel, {
                    where : {
                        id : id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update address!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update address!', error);
        }
    }

    delete = async (id) => {
        try {
            var result = await this.Staff.destroy({
                where : {
                    id : id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete staff!', error);
        }
    }

    getStaff = async (
        staffType,
        salary
    ) => {

        var filters = [];

       if (staffType !== null) {
            filters.push({
                StaffType : staffType
            });
        }
        else if (salary !== null) {
            filters.push({
                Salary : salary
            });
        }
        
        const staff = await this.Staff.findOne({
            where : {
                [Op.or] : filters
            }
        });

        if (!staff) {
            return null;
        }

        return staff;
    }

    getStaffUpdateModel = (inputModel) => {

        var updateModel: any = {};

        if (Helper.hasProperty(inputModel, 'StaffType')) {
            updateModel.StaffType = inputModel.StaffType;
        }
        if (Helper.hasProperty(inputModel, 'Salary')) {
            updateModel.Salary = inputModel.Salary;
        }
    
        return updateModel;
    }

}

