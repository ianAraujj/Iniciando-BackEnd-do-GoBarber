import Router from 'express';
import UserController from './app/controllers/UserController';
import SessionsController from './app/controllers/SessionsController';
import Auth from './app/middlewares/auth';

const routes = new Router();


routes.post('/users', UserController.store);
routes.post('/sessions', SessionsController.store);

// - Agora eu vou adicionar um Middleware Global. Ele será válido para todas as 
// rotas ABAIXO dele

routes.use(Auth);
routes.put('/users', UserController.update);

export default routes;