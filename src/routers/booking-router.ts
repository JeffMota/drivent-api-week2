import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getUserBooking, postBooking } from '@/controllers/booking-controller';
import { bookingSchema } from '@/schemas/booking-shcemas';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken);
bookingRouter.get('/', getUserBooking);
bookingRouter.post('/', validateBody(bookingSchema), postBooking);

export { bookingRouter };
