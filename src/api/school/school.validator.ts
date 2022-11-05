import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class SchoolValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                SchoolName : joi.string().max(64).optional(),
                Address    : joi.string().max(256).optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                SchoolName : joi.string().max(64).optional(),
                Address    : joi.string().max(256).optional(),
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                SchoolName : joi.string().max(64).optional(),
                Address    : joi.string().max(256).optional(),

            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

}
