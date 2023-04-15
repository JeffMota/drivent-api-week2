import { notFoundError, doesntOwnTicket } from '@/errors';
import { InsertPayment, PaymentBody } from '@/protocols';
import paymentRepository from '@/repositories/payment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getTicketPayment(ticketId: number, userId: number) {
  const ticket = await ticketsRepository.getTicketById(ticketId);
  if (!ticket) throw notFoundError();

  const enrollment = await ticketsRepository.getEnrollmentById(ticket.enrollmentId);
  if (enrollment.userId !== userId) throw doesntOwnTicket();

  const payment = await paymentRepository.getTicketPayment(ticketId);

  return payment;
}

async function paymentProcess(body: PaymentBody, userId: number) {
  const ticket = await ticketsRepository.getTicketById(body.ticketId);
  if (!ticket) throw notFoundError();

  const enrollment = await ticketsRepository.getEnrollmentById(ticket.enrollmentId);
  if (enrollment.userId !== userId) throw doesntOwnTicket();

  const insert: InsertPayment = {
    ticketId: ticket.id,
    value: ticket.TicketType.price,
    cardIssuer: body.cardData.issuer,
    cardLastDigits: String(body.cardData.number).slice(11, 15),
  };

  const payment = await paymentRepository.paymentProcess(insert);

  await paymentRepository.updateTicket(ticket.id);
  return payment;
}

export default {
  getTicketPayment,
  paymentProcess,
};
