import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { RoleControllerDelegate } from './role.controller.delegate';
import { BaseController } from '../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class RoleController extends BaseController {

    //#region member variables and constructors

    _delegate: RoleControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new RoleControllerDelegate();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('Role.Create', request, response, false);
            const record = await this._delegate.create(request.body);
            const message = 'Role created successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    getById = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('Role.GetById', request, response);
            const record = await this._delegate.getById(request.params.id);
            const message = 'Role retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    getByName = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('Role.GetByName', request, response);
            const record = await this._delegate.getByName(request.params.id);
            const message = 'Role retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    delete = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('School.Delete', request, response);
            const result = await this._delegate.delete(request.params.id);
            const message = 'School deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}

