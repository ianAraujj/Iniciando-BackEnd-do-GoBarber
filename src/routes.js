import Router from 'express';
import UserController from './app/controllers/UserController';

const routes = new Router();


routes.post('/users', UserController.store);
routes.delete('/users/:id', UserController.delete);
routes.get('/users/:id', UserController.show);

export default routes;