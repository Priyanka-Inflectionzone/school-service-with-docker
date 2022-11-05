/* eslint-disable linebreak-style */
import { ParentModel } from '../../models/parent/parent.model';
import { ErrorHandler } from '../../../common/error.handler';
import { Op } from 'sequelize';
import { Helper } from '../../../common/helper';

//////////////////////////////////////////////////////////////////////////

export class ParentService {

    Parent = ParentModel.Model;

    create = async (createModel) => {
        try {
            var record = await this.Parent.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create parent!', error);
        }
    }

    getById = async (id) => {
        try {
            var record = await this.Parent.findOne({
                where : {
                    id : id
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve parent!', error);
        }
    }

    exists = async (id) => {
        try {
            const record = await this.Parent.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of parent!', error);
        }
    }

    search = async (filters) => {
        try {

            var search = {
                where   : {},
                include : []
            };

            if (filters.UserId) {
                search.where['UserId'] = filters.UserId;
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

            const foundResults = await this.Parent.findAndCountAll(search);
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
                var res = await this.Parent.update(updateModel, {
                    where : {
                        id : id
                    }
                });
                if (res.length !== 1) {
                    throw new Error('Unable to update parent!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update parent!', error);
        }
    }

    delete = async (id) => {
        try {
            var result = await this.Parent.destroy({
                where : {
                    id : id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete parent!', error);
        }
    }

    getParent = async (
        userId
    ) => {

        var filters = [];

        if ( userId !== null) {
            filters.push({
                UserId : userId
            });
        }
        
        const parent = await this.Parent.findOne({
            where : {
                [Op.or] : filters
            }
        });

        if (!parent) {
            return null;
        }

        return parent;
    }

}
