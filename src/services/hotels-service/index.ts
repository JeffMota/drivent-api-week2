import { notFoundError } from '@/errors';
import { paymentRequiredError } from '@/errors/payment-required-error';
import hotelsRepository from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getAllHotels(userId: number) {
  const enrollment = await ticketsRepository.getEnrollmentByUserId(userId);
  if (!enrollment) throw notFoundError();
  const ticket = await ticketsRepository.getTicketByEnrollment(enrollment.id);
  if (!ticket) throw notFoundError();

  const ticketType = await ticketsRepository.getUniqueTicketType(ticket.ticketTypeId);

  if (ticket.status !== 'PAID' || ticketType.isRemote || !ticketType.includesHotel) throw paymentRequiredError();

  return await hotelsRepository.getAllHotels();
}

async function getHotelRooms(hotelId: number, userId: number) {
  const enrollment = await ticketsRepository.getEnrollmentByUserId(userId);
  if (!enrollment) throw notFoundError();
  const ticket = await ticketsRepository.getTicketByEnrollment(enrollment.id);
  if (!ticket) throw notFoundError();

  const ticketType = await ticketsRepository.getUniqueTicketType(ticket.ticketTypeId);

  if (ticket.status !== 'PAID' || ticketType.isRemote || !ticketType.includesHotel) throw paymentRequiredError();

  const hotel = hotelsRepository.getHotelRooms(hotelId);
  if (!hotel) throw notFoundError();

  return hotel;
}

export default {
  getAllHotels,
  getHotelRooms,
};
