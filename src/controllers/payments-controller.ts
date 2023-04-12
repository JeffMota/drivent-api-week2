import { Request, Response } from 'express';
import paymentService from '@/services/payments-service';

export async function getTicketPayment(req: Request, res: Response) {
  const userId = res.locals.userId;

  const ticketId = Number(req.query.ticketId);
  if (!ticketId) return res.sendStatus(400);

  try {
    const payment = await paymentService.getTicketPayment(ticketId, userId);

    res.status(200).send(payment);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(404);
    if (error.name === 'DoesntOwnTicketError') return res.sendStatus(401);
    res.status(500).send(error.message);
  }
}

export async function paymentProcess(req: Request, res: Response) {
  const userId = res.locals.userId;
  const body = req.body;
  if (!body.ticketId) return res.sendStatus(400);
  if (!body.cardData) return res.sendStatus(400);

  try {
    const payment = await paymentService.paymentProcess(body, userId);
    res.send(payment);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(404);
    if (error.name === 'DoesntOwnTicketError') return res.sendStatus(401);
    res.status(500).send(error.message);
  }
}
