import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class AddressValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                UserId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                StreetAddress : joi.string().max(256).optional(),
                City          : joi.string().max(64).optional(),
                State         : joi.string().max(64).optional(),
                Country       : joi.string().max(64).optional(),
                Pincode       : joi.string().max(10).optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                UserId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                StreetAddress : joi.string().max(256).optional(),
                City          : joi.string().max(64).optional(),
                State         : joi.string().max(64).optional(),
                Country       : joi.string().max(64).optional(),
                Pincode       : joi.string().max(10).optional()
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                UserId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                StreetAddress : joi.string().max(256).optional(),
                City          : joi.string().max(64).optional(),
                State         : joi.string().max(64).optional(),
                Country       : joi.string().max(64).optional(),
                Pincode       : joi.string().max(10).optional()

            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

}
