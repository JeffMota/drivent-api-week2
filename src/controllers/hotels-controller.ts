import { Request, Response } from 'express';
import hotelsService from '@/services/hotels-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
  const userId = Number(res.locals.userId);
  try {
    const hotels = await hotelsService.getAllHotels(userId);
    if (hotels.length === 0) return res.sendStatus(404);
    res.send(hotels);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(404);
    if (error.name === 'PaymentRequiredError') return res.sendStatus(402);
    res.status(400).send(error.message);
  }
}

export async function getHotelRooms(req: Request, res: Response) {
  const hotelId = Number(req.params.hotelId);
  const userId = Number(res.locals.userId);

  try {
    const hotel = await hotelsService.getHotelRooms(hotelId, userId);
    if (!hotel) return res.sendStatus(404);
    res.send(hotel);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(404);
    if (error.name === 'PaymentRequiredError') return res.sendStatus(402);
    res.status(400).send(error.message);
  }
}
