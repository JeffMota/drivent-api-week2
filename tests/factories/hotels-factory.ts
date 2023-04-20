import { Hotel, Room, User } from '@prisma/client';
import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createHotel() {
  return await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    },
  });
}

export async function createRooms(hotel: Hotel) {
  return await prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: faker.datatype.number(),
      hotelId: hotel.id,
    },
  });
}

export async function createBooking(user: User, room: Room) {
  return await prisma.booking.create({
    data: {
      userId: user.id,
      roomId: room.id,
    },
  });
}
