import { Router } from 'express';
import ProductController from '../controllers/ProductsController';

const productsController = new ProductController();

const productsRouter = Router();

productsRouter.get('/', productsController.index);
productsRouter.get('/:id', productsController.show);
productsRouter.post('/', productsController.store);
productsRouter.put('/:id', productsController.update);
productsRouter.delete('/:id', productsController.delete);

export default productsRouter;
