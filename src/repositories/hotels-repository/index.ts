import { prisma } from '@/config';

async function getAllHotels() {
  return await prisma.hotel.findMany();
}

async function getHotelRooms(hotelId: number) {
  return await prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

export default {
  getAllHotels,
  getHotelRooms,
};
