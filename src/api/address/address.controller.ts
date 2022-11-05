import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { AddressControllerDelegate } from './address.controller.delegate';
import { BaseController } from '../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class AddressController extends BaseController {

    //#region member variables and constructors

    _delegate: AddressControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new AddressControllerDelegate();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('Address.Create', request, response, false);
            const record = await this._delegate.create(request.body);
            const message = 'Address created successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    getById = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('Address.GetById', request, response);
            const record = await this._delegate.getById(request.params.id);
            const message = 'Address retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    search = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('Address.Search', request, response);
            const searchResults = await this._delegate.search(request.query);
            const message = 'Address records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    update = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('Address.Update', request, response);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Address updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    delete = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('Address.Delete', request, response);
            const result = await this._delegate.delete(request.params.id);
            const message = 'Address deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}

