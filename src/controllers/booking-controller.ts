import { Response, Request } from 'express';
import bookingService from '@/services/booking-service';
import { InsertBooking } from '@/protocols';

export async function getUserBooking(req: Request, res: Response) {
  const userId = res.locals.userId;

  try {
    const booking = await bookingService.getUserBooking(userId);
    res.send(booking);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(404);
  }
}

export async function postBooking(req: Request, res: Response) {
  const roomId = req.body.roomId as number;
  const userId = res.locals.userId as number;

  const data: InsertBooking = {
    roomId,
    userId,
  };

  try {
    const booking = await bookingService.postBooking(data);
    res.send({ roomId: booking.roomId });
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(404);
    res.status(403).send(error.message);
  }
}
