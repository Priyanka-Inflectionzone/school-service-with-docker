import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { SchoolControllerDelegate } from './school.controller.delegate';
import { BaseController } from '../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class SchoolController extends BaseController {

    //#region member variables and constructors

    _delegate: SchoolControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new SchoolControllerDelegate();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('School.Create', request, response, false);
            const record = await this._delegate.create(request.body);
            const message = 'School created successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    getById = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('School.GetById', request, response);
            const record = await this._delegate.getById(request.params.id);
            const message = 'School retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    search = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('School.Search', request, response);
            const searchResults = await this._delegate.search(request.query);
            const message = 'School records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    update = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('School.Update', request, response);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'School updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
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

