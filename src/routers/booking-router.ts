import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getUserBooking, postBooking, changeBooking } from '@/controllers/booking-controller';
import { bookingSchema } from '@/schemas/booking-shcemas';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken);
bookingRouter.get('/', getUserBooking);
bookingRouter.post('/', validateBody(bookingSchema), postBooking);
bookingRouter.put('/:bookingId', validateBody(bookingSchema), changeBooking);

export { bookingRouter };
