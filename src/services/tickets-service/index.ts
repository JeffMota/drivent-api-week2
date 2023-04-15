import { notFoundError } from '@/errors';
import ticketsRepository from '@/repositories/tickets-repository';

async function getTicketsTypes() {
  const tickets = await ticketsRepository.getTicketsTypes();
  return tickets;
}

async function getUserTickets(userId: number) {
  const enrollment = await ticketsRepository.getEnrollmentByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.getTicketByEnrollment(enrollment.id);
  if (!ticket) throw notFoundError();

  return ticket;
}

async function postTicket(ticketTypeId: number, userId: number) {
  const enrollment = await ticketsRepository.getEnrollmentByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.postTicket({
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: 'RESERVED',
  });

  const result = await ticketsRepository.getTicketById(ticket.id);

  return result;
}

export default {
  getTicketsTypes,
  getUserTickets,
  postTicket,
};
