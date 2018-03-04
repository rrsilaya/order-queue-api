import { Router } from 'express';
import * as orderController from './controller';

const router = Router();

router
  .get('/order', orderController.getOrders)
  .post('/order', orderController.addOrder)
  .put('/order/:_id', orderController.updateOrder)
  .delete('/order/:_id', orderController.deleteOrder);

export default router;