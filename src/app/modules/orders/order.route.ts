import express from 'express';
import { orderController } from './oder.controller';

const router = express.Router();
router.post('/', orderController.orderCreateController);
router.get('/', orderController.getAllOrderController);

export const orderRouter = router;
