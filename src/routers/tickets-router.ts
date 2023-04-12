import { Router } from 'express';
import { getTicketsTypes, getUserTickets } from '@/controllers/tickets-controller';
import { authenticateToken } from '@/middlewares';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken);
ticketsRouter.get('/', getUserTickets);
ticketsRouter.get('/types', getTicketsTypes);
ticketsRouter.post('/', getUserTickets);

export { ticketsRouter };
