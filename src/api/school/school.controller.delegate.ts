import { SchoolService } from '../../database/repository.services/school/school.service';
//import { SmsService } from '../../modules/communication/sms.service';
//import { UserOtpService } from '../../database/repository.services/user/user.otp.service';
import { ErrorHandler } from '../../common/error.handler';
import { Helper } from '../../common/helper';
//import { Logger } from '../../common/logger';
import { ApiError } from '../../common/api.error';
import { SchoolValidator as validator } from './school.validator';
import {
    SchoolDto,
    SchoolSearchFilters,
    SchoolSearchResults,
    SchoolUpdateModel,
    SchoolCreateModel
} from '../../domain.types/school/school.domain.types';
import { uuid } from '../../domain.types/miscellaneous/system.types';
//import { Loader } from '../../startup/loader';
//import { UserHelper } from '../user.helper';
//import { CurrentUser } from '../../domain.types/miscellaneous/current.user';

///////////////////////////////////////////////////////////////////////////////////////

export class SchoolControllerDelegate {

    //#region member variables and constructors

    _service: SchoolService = null;

    //_otpService: UserOtpService = null;

    //_smsService: SmsService = null;

    constructor() {
        this._service = new SchoolService();
        // this._otpService = new UserOtpService();
        // this._smsService = new SmsService();
    }

    //#endregion

    create = async (requestBody: any) => {

        await validator.validateCreateRequest(requestBody);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // const { userCreateModel, password } =
        //     await UserHelper.getValidUserCreateModel(requestBody);
        var createModel: SchoolCreateModel = this.getCreateModel(requestBody);

        const record: SchoolDto = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create school!', 400);
        }

        // if (requestBody.CurrentUserId && dto.Email) {
        //     sendOnboardingEmail(dto, password)
        // }

        return this.getEnrichedDto(record);
    }

    getById = async (id: uuid) => {
        const record: SchoolDto = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('School with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    }

    search = async (query) => {
        //await validator.validateSearchRequest(query);
        var filters: SchoolSearchFilters = this.getSearchFilters(query);
        var searchResults: SchoolSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getPublicDto(x));
        searchResults.Items = items;
        return searchResults;
    }

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record: SchoolDto = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('School with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: SchoolUpdateModel = this.getUpdateModel(requestBody);
        const updated: SchoolDto = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update school!', 400);
        }
        return this.getEnrichedDto(updated);
    }

    delete = async (id: uuid) => {
        const record: SchoolDto = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('School with id ' + id.toString() + ' cannot be found!');
        }
        const userDeleted: boolean = await this._service.delete(id);
        return {
            Deleted : userDeleted
        };
    }
   
    ///////////////////////////////////////////////////////////////////////////////////////////////

    getUpdateModel = (requestBody) => {

        const updateModel: SchoolUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'SchoolName')) {
            updateModel.SchoolName = requestBody.SchoolName;
        }
        if (Helper.hasProperty(requestBody, 'Address')) {
            updateModel.Address = requestBody.Address;
        }
        return updateModel;
    }

    getSearchFilters = (query) => {
        var filters = {};
        var schoolName = query.schoolName ? query.schoolName : null;
        if ( schoolName != null) {
            filters['SchoolName'] = schoolName;
        }
        var address = query.address ? query.address : null;
        if (address != null) {
            filters['Address'] = address;
        }
        return filters;
    }

    getCreateModel = (requestBody): SchoolCreateModel => {
        return {
            SchoolName : requestBody.SchoolName ? requestBody.SchoolName : null,
            Address    : requestBody.Address ? requestBody.Address : null,
        };
    }

    //This function returns a response DTO which is enriched with available resource data

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id         : record.id,
            SchoolName : record.BiocubeId,
            Address    : record.UserName,

        };
    }

    //This function returns a response DTO which has only public parameters

    getPublicDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id         : record.id,
            SchoolName : record.SchoolName,
            Address    : record.Address,
        };
    }

}
