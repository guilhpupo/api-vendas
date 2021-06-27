import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const usersController = new UsersController();

const usersRoutes = Router();

usersRoutes.get('/', isAuthenticated, usersController.index);

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.store,
);

export default usersRoutes;
