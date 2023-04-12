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

  const type = await ticketsRepository.getUniqueTicketType(ticket.ticketTypeId);

  return {
    id: ticket.id,
    status: ticket.status,
    ticketTypeId: ticket.ticketTypeId,
    enrollmentId: ticket.enrollmentId,
    TicketType: {
      createdAt: type.createdAt,
      id: type.id,
      includesHotel: type.includesHotel,
      isRemote: type.isRemote,
      name: type.name,
      price: type.price,
      updatedAt: type.updatedAt,
    },
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt,
  };
}

async function postTicket(ticketTypeId: number, userId: number) {
  const enrollment = await ticketsRepository.getEnrollmentByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.postTicket({
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: 'RESERVED',
  });

  const type = await ticketsRepository.getUniqueTicketType(ticket.ticketTypeId);

  return {
    id: ticket.id,
    status: ticket.status,
    ticketTypeId: ticket.ticketTypeId,
    enrollmentId: ticket.enrollmentId,
    TicketType: {
      createdAt: type.createdAt,
      id: type.id,
      includesHotel: type.includesHotel,
      isRemote: type.isRemote,
      name: type.name,
      price: type.price,
      updatedAt: type.updatedAt,
    },
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt,
  };
}

export default {
  getTicketsTypes,
  getUserTickets,
  postTicket,
};
