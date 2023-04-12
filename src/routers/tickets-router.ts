import { Router } from 'express';
import { getTicketsTypes, getUserTickets, postTicket } from '@/controllers/tickets-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { postTicketSchema } from '@/schemas/tickets-schemas';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken);
ticketsRouter.get('/', getUserTickets);
ticketsRouter.get('/types', getTicketsTypes);
ticketsRouter.post('/', validateBody(postTicketSchema), postTicket);

export { ticketsRouter };
