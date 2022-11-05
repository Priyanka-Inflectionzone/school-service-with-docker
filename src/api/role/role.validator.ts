import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class RoleValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                RoleName    : joi.string().max(64).optional(),
                Description : joi.string().max(256).optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                RoleName    : joi.string().max(64).optional(),
                Description : joi.string().max(256).optional()
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                RoleName    : joi.string().max(64).optional(),
                Description : joi.string().max(256).optional()

            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

}
