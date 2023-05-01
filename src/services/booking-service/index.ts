import { notFoundError, unauthorizedError } from '@/errors';
import { InsertBooking } from '@/protocols';
import bookingRepository from '@/repositories/booking-repository';
import hotelsRepository from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getUserBooking(userId: number) {
  const booking = await bookingRepository.getUserBooking(userId);

  if (!booking) throw notFoundError();

  return booking;
}

async function postBooking(data: InsertBooking) {
  const enrollment = await ticketsRepository.getEnrollmentByUserId(data.userId);
  if (!enrollment) throw unauthorizedError();

  const ticket = await ticketsRepository.getTicketByEnrollment(enrollment.id);
  if (!ticket) throw unauthorizedError();

  const ticketType = await ticketsRepository.getUniqueTicketType(ticket.ticketTypeId);

  const room = await hotelsRepository.getRoomById(data.roomId);
  if (!room) throw notFoundError();

  if (room.Booking.length === room.capacity) throw unauthorizedError();
  if (ticketType.isRemote || !ticketType.includesHotel || ticket.status !== 'PAID') throw unauthorizedError();

  const booking = await bookingRepository.postBooking(data);

  return booking;
}

async function changeBooking(bookingId: number, roomId: number, userId: number) {
  const userBooking = await bookingRepository.getUserBooking(userId);
  if (!userBooking) throw unauthorizedError();

  const room = await hotelsRepository.getRoomById(roomId);
  if (!room) throw notFoundError();

  if (room.Booking.length === room.capacity) throw unauthorizedError();

  return await bookingRepository.changeBooking(bookingId, roomId);
}

export default {
  getUserBooking,
  postBooking,
  changeBooking,
};
