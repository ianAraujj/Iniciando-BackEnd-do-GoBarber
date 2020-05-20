import Router from 'express';
import UserController from './app/controllers/UserController';
import SessionsController from './app/controllers/SessionsController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import Auth from './app/middlewares/auth';
import multerConfig from './config/multer';
import multer from 'multer';

const routes = new Router();


routes.post('/users', UserController.store);
routes.post('/sessions', SessionsController.store);

// - Agora eu vou adicionar um Middleware Global. Ele será válido para todas as 
// rotas ABAIXO dele

const upload = multer(multerConfig);

routes.use(Auth);
routes.put('/users', UserController.update);
routes.get('/user', UserController.show);

// 'file' vai ser o nome do campo
routes.post('/files', upload.single('file'), FileController.store);

routes.get('/users', UserController.index);
routes.get('/providers', ProviderController.index);

export default routes;