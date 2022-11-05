import express from 'express';
import { RoleController } from './role.controller';
import { Loader } from '../../startup/loader';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const authenticator = Loader.Authenticator;
    const controller = new RoleController();

    router.post('', controller.create);
    router.delete('/:id', controller.delete);

    router.get('/:name', authenticator.authenticateUser, controller.getByName);
    router.get('/:id', authenticator.authenticateUser, controller.getById);

    app.use('/api/v1/role', router);
};
