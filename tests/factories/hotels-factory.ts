import { Hotel } from '@prisma/client';
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

export async function createRooms(hotel: Hotel, capacity = 1) {
  return await prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity,
      hotelId: hotel.id,
    },
  });
}
