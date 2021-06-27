import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

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

usersRoutes.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRoutes;
