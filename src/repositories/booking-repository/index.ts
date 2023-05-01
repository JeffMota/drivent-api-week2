import { prisma } from '@/config';
import { InsertBooking } from '@/protocols';

async function getUserBooking(userId: number) {
  return await prisma.booking.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
      Room: true,
    },
  });
}

async function postBooking(data: InsertBooking) {
  return await prisma.booking.create({
    data,
  });
}

async function changeBooking(bookingId: number, roomId: number) {
  return await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      roomId,
    },
  });
}

export default {
  getUserBooking,
  postBooking,
  changeBooking,
};
