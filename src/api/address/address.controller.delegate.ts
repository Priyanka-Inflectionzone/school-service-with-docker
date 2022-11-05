import { AddressService } from '../../database/repository.services/address/address.service';
//import { SmsService } from '../../modules/communication/sms.service';
//import { UserOtpService } from '../../database/repository.services/user/user.otp.service';
import { ErrorHandler } from '../../common/error.handler';
import { Helper } from '../../common/helper';
//import { Logger } from '../../common/logger';
import { ApiError } from '../../common/api.error';
import { AddressValidator as validator } from './address.validator';
import {
    AddressDto,
    AddressSearchFilters,
    AddressSearchResults,
    AddressUpdateModel,
    AddressCreateModel
} from '../../domain.types/address/address.domain.types';
import { uuid } from '../../domain.types/miscellaneous/system.types';
//import { Loader } from '../../startup/loader';
//import { UserHelper } from '../user.helper';
//import { CurrentUser } from '../../domain.types/miscellaneous/current.user';

///////////////////////////////////////////////////////////////////////////////////////

export class AddressControllerDelegate {

    //#region member variables and constructors

    _service: AddressService = null;

    //_otpService: UserOtpService = null;

    //_smsService: SmsService = null;

    constructor() {
        this._service = new AddressService();
        // this._otpService = new UserOtpService();
        // this._smsService = new SmsService();
    }

    //#endregion

    create = async (requestBody: any) => {

        await validator.validateCreateRequest(requestBody);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // const { userCreateModel, password } =
        //     await UserHelper.getValidUserCreateModel(requestBody);
        var createModel: AddressCreateModel = this.getCreateModel(requestBody);

        const record: AddressDto = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create address!', 400);
        }

        // if (requestBody.CurrentUserId && dto.Email) {
        //     sendOnboardingEmail(dto, password)
        // }

        return this.getEnrichedDto(record);
    }

    getById = async (id: uuid) => {
        const record: AddressDto = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Address with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    }

    search = async (query) => {
        //await validator.validateSearchRequest(query);
        var filters: AddressSearchFilters = this.getSearchFilters(query);
        var searchResults: AddressSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getPublicDto(x));
        searchResults.Items = items;
        return searchResults;
    }

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record: AddressDto = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Address with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: AddressUpdateModel = this.getUpdateModel(requestBody);
        const updated: AddressDto = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update address!', 400);
        }
        return this.getEnrichedDto(updated);
    }

    delete = async (id: uuid) => {
        const record: AddressDto = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Address with id ' + id.toString() + ' cannot be found!');
        }
        const userDeleted: boolean = await this._service.delete(id);
        return {
            Deleted : userDeleted
        };
    }
   
    ///////////////////////////////////////////////////////////////////////////////////////////////

    getUpdateModel = (requestBody) => {

        const updateModel: AddressUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'StreetAddress')) {
            updateModel.StreetAddress = requestBody.StreetAddress;
        }
        if (Helper.hasProperty(requestBody, 'City')) {
            updateModel.City = requestBody.City;
        }
        if (Helper.hasProperty(requestBody, 'State')) {
            updateModel.State = requestBody.State;
        }
        if (Helper.hasProperty(requestBody, 'Country')) {
            updateModel.Country = requestBody.Country;
        }
        if (Helper.hasProperty(requestBody, 'Pincode')) {
            updateModel.Pincode = requestBody.Pincode;
        }
        return updateModel;
    }

    getSearchFilters = (query) => {
        var filters = {};
        var city = query.city ? query.city : null;
        if ( city != null) {
            filters['City'] = city;
        }
        var state = query.state ? query.state : null;
        if (state != null) {
            filters['State'] = state;
        }
        var country = query.country ? query.country : null;
        if (country != null) {
            filters['Country'] = country;
        }
        var country = query.country ? query.country : null;
        if (country != null) {
            filters['Country'] = country;
        }
        var pincode = query.pincode ? query.pincode : null;
        if (pincode != null) {
            filters['Pincode'] = pincode;
        }
        return filters;
    }

    getCreateModel = (requestBody): AddressCreateModel => {
        return {
            UserId        : requestBody.UserId ? requestBody.UserId : null,
            StreetAddress : requestBody.StreetAddress ? requestBody.StreetAddress : null,
            City          : requestBody.City ? requestBody.City : null,
            State         : requestBody.State ? requestBody.State : null,
            Country       : requestBody.Country ? requestBody.Country : null,
            Pincode       : requestBody.Pincode ? requestBody.Pincode : null,
        };
    }

    //This function returns a response DTO which is enriched with available resource data

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id            : record.id,
            UserId        : record.UserId,
            StreetAddress : record.StreetAddress,
            City          : record.City,
            State         : record.State,
            Country       : record.country,
            Pincode       : record.Pincode
        };

    };

    //This function returns a response DTO which has only public parameters

    getPublicDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id            : record.id,
            UserId        : record.UserId,
            StreetAddress : record.StreetAddress,
            City          : record.City,
            State         : record.State,
            Country       : record.country,
            Pincode       : record.Pincode
        };
    };

}
