import { User, Room } from '@prisma/client';
import { prisma } from '@/config';

export async function createBooking(user: User, room: Room) {
  return await prisma.booking.create({
    data: {
      userId: user.id,
      roomId: room.id,
    },
  });
}
