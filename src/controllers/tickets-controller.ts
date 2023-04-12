import { Request, Response } from 'express';
import ticketsService from '@/services/tickets-service';

export async function getTicketsTypes(req: Request, res: Response) {
  try {
    const tickets = await ticketsService.getTicketsTypes();

    res.send(tickets);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(404);
    res.status(500).send(error.message);
  }
}

export async function getUserTickets(req: Request, res: Response) {
  const userId = res.locals.userId as number;

  try {
    const ticket = await ticketsService.getUserTickets(userId);

    res.status(200).json(ticket);
  } catch (error) {
    res.status(404).send(error.message);
  }
}

export async function postTicket(req: Request, res: Response) {
  const { ticketTypeId } = req.body;
  const userId = res.locals.userId as number;

  try {
    const ticket = await ticketsService.postTicket(ticketTypeId, userId);

    res.status(201).send(ticket);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(404);
    res.status(500).send(error.message);
  }
}
