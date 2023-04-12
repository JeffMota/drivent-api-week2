import { Router } from 'express';
import { getTicketPayment, paymentProcess } from '@/controllers/payments-controller';
import { authenticateToken } from '@/middlewares';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken);
paymentsRouter.get('/', getTicketPayment);
paymentsRouter.post('/process', paymentProcess);

export { paymentsRouter };
