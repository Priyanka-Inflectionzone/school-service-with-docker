import { RoleService } from '../../database/repository.services/role.service';
//import { SmsService } from '../../modules/communication/sms.service';
//import { UserOtpService } from '../../database/repository.services/user/user.otp.service';
import { ErrorHandler } from '../../common/error.handler';
//import { Helper } from '../../common/helper';
//import { Logger } from '../../common/logger';
import { ApiError } from '../../common/api.error';
import { RoleValidator as validator } from './role.validator';
import {
    RoleDto,
    RoleCreateModel
} from '../../domain.types/role.domain.types';
import { uuid } from '../../domain.types/miscellaneous/system.types';
//import { Loader } from '../../startup/loader';
//import { UserHelper } from '../user.helper';
//import { CurrentUser } from '../../domain.types/miscellaneous/current.user';

///////////////////////////////////////////////////////////////////////////////////////

export class RoleControllerDelegate {

    //#region member variables and constructors

    _service: RoleService = null;

    //_otpService: UserOtpService = null;

    //_smsService: SmsService = null;

    constructor() {
        this._service = new RoleService();
        // this._otpService = new UserOtpService();
        // this._smsService = new SmsService();
    }

    //#endregion

    create = async (requestBody: any) => {

        await validator.validateCreateRequest(requestBody);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // const { userCreateModel, password } =
        //     await UserHelper.getValidUserCreateModel(requestBody);
        var createModel: RoleCreateModel = this.getCreateModel(requestBody);

        const record: RoleDto = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create role!', 400);
        }

        // if (requestBody.CurrentUserId && dto.Email) {
        //     sendOnboardingEmail(dto, password)
        // }

        return this.getEnrichedDto(record);
    }

    getById = async (id: uuid) => {
        const record: RoleDto = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Role with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    }

       getByName = async (name: string) => {
           const record: RoleDto = await this._service.getByName(name);
           if (record === null) {
               ErrorHandler.throwNotFoundError('Role with name ' + name.toString() + ' cannot be found!');
           }
           return this.getEnrichedDto(record);
       }
       // search = async (query) => {
       //     //await validator.validateSearchRequest(query);
       //     var filters: RoleSearchFilters = this.getSearchFilters(query);
       //     var searchResults: RoleSearchResults = await this._service.search(filters);
       //     var items = searchResults.Items.map(x => this.getPublicDto(x));
       //     searchResults.Items = items;
       //     return searchResults;
       // }

    delete = async (id: uuid) => {
        const record: RoleDto = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Role with id ' + id.toString() + ' cannot be found!');
        }
        const userDeleted: boolean = await this._service.delete(id);
        return {
            Deleted : userDeleted
        };
    }
   
    ///////////////////////////////////////////////////////////////////////////////////////////////

    getCreateModel = (requestBody): RoleCreateModel => {
        return {
            RoleName    : requestBody.RoleName ? requestBody.RoleName : null,
            Description : requestBody.Description ? requestBody.Description : null,
        };
    }

    //This function returns a response DTO which is enriched with available resource data

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id          : record.id,
            RoleName    : record.RoleName,
            Description : record.Description,

        };
    }

    //This function returns a response DTO which has only public parameters

    getPublicDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id          : record.id,
            RoleName    : record.RoleName,
            Description : record.Description,
        };
    }

}
