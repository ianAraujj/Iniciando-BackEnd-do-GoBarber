import Router from 'express';
import UserController from './app/controllers/UserController';
import SessionsController from './app/controllers/SessionsController';

const routes = new Router();


routes.post('/users', UserController.store);
routes.delete('/users/:id', UserController.delete);
routes.get('/users/:id', UserController.show);

routes.post('/sessions', SessionsController.store);

export default routes;