import { Router } from 'express';

import orderRouter from './entities/order/router';

const router = Router();

router.use(orderRouter);

export default router;