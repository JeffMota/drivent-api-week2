import hotelsService from '@/services/hotels-service';
import hotelsRepository from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';

describe('Hotels unit test suite', () => {
  it('Should respond with status 404 if hotel not found', () => {
    const hotelId = 1;
    const userId = 1;

    jest.spyOn(ticketsRepository, 'getEnrollmentByUserId').mockImplementationOnce((): any => {
      return {
        id: 1,
      };
    });

    jest.spyOn(ticketsRepository, 'getTicketByEnrollment').mockImplementationOnce((): any => {
      return {
        id: 1,
        status: 'PAID',
      };
    });

    jest.spyOn(ticketsRepository, 'getUniqueTicketType').mockImplementationOnce((): any => {
      return {
        id: 1,
        isRemote: false,
        includesHotel: true,
      };
    });

    jest.spyOn(hotelsRepository, 'getHotelRooms').mockImplementationOnce((): any => {
      return null;
    });

    const response = hotelsService.getHotelRooms(hotelId, userId);
    expect(response).rejects.toEqual({
      name: 'NotFoundError',
      message: 'No result for this search!',
    });
  });
});
