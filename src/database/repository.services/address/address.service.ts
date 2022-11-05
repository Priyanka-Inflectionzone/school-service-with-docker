/* eslint-disable linebreak-style */
import { AddressModel } from '../../models/address/address.model';
import { ErrorHandler } from '../../../common/error.handler';
import { Op } from 'sequelize';
import { Helper } from '../../../common/helper';

////////////////////////////////////////////////////////////////////////////////

export class AddressService {

    Address = AddressModel.Model;

    create = async (createModel) => {
        try {
            var record = await this.Address.create(createModel);
            return await this.getById(record.id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create user!', error);
        }
    }

    getById = async (id) => {
        try {
            var record = await this.Address.findOne({
                where : {
                    id : id
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve address!', error);
        }
    }

    exists = async (id) => {
        try {
            const record = await this.Address.findByPk(id);
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of address!', error);
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
            if (filters.City) {
                search.where['City'] = filters.City;
            }
            if (filters.State) {
                search.where['State'] = filters.State;
            }
            if (filters.Pincode) {
                search.where['Pincode'] = filters.Pincode;
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

            const foundResults = await this.Address.findAndCountAll(search);
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search address records!', error);
        }
    }

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.Address.update(updateModel, {
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
            var result = await this.Address.destroy({
                where : {
                    id : id
                }
            });
            return result === 1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete address!', error);
        }
    }

    getAddressWithPincode = async (pincode) => {
        try {
            const record = await this.Address.findOne({
                where : {
                    Pincode : pincode
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to check if address exists with pincode!', error);
        }
    }

    getAddressWithStreetAddress = async (streetAddress) => {
        try {
            const record = await this.Address.findOne({
                where : {
                    StreetAddress : streetAddress
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to check street-address!', error);
        }
    }

    getAddress = async (
        streetAddress,
        city,
        state,
        country,
        pincode
    ) => {

        var filters = [];

        if (pincode !== null && city !== null) {
            filters.push({
                City    : city,
                Pincode : pincode
            });
        }
        else if (streetAddress !== null) {
            filters.push({
                StreetAddress : streetAddress
            });
        }
        else if (state !== null) {
            filters.push({
                State : state
            });
        }
        else if (country !== null) {
            filters.push({
                Country : country
            });
        }
        const address = await this.Address.findOne({
            where : {
                [Op.or] : filters
            }
        });

        if (!address) {
            return null;
        }

        return address;
    }

    getAddressUpdateModel = (inputModel) => {

        var updateModel: any = {};

        if (Helper.hasProperty(inputModel, 'StreetAddress')) {
            updateModel.StreetAddress = inputModel.StreetAddress;
        }
        if (Helper.hasProperty(inputModel, 'City')) {
            updateModel.City = inputModel.City;
        }
        if (Helper.hasProperty(inputModel, 'State')) {
            updateModel.State = inputModel.State;
        }
        if (Helper.hasProperty(inputModel, 'Country')) {
            updateModel.Country = inputModel.Country;
        }
        if (Helper.hasProperty(inputModel, 'Pincode')) {
            updateModel.Pincode = inputModel.Pincode;
        }
        return updateModel;
    }

}
