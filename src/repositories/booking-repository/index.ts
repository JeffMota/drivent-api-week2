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

export default {
  getUserBooking,
  postBooking,
};
