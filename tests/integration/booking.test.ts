import supertest from 'supertest';
import faker from '@faker-js/faker';
import { cleanDb, generateValidToken } from '../helpers';
import { createHotel, createRooms } from '../factories/hotels-factory';
import { createBooking } from '../factories/booking-factory';
import { createUser } from '../factories/users-factory';
import { createEnrollmentWithAddress, createTicket, createTicketType, createTicketTypeCustom } from '../factories';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
  await cleanDb();
});

afterEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /booking', () => {
  it('Should respond with status 401 if no token was given', async () => {
    const response = await server.get('/booking');

    expect(response.status).toBe(401);
  });
  it('Should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();
    const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(401);
  });
  describe('When token is valid', () => {
    it('Should respond with status 404 when there is no booking for this user', async () => {
      const token = await generateValidToken();
      const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });

    it('Should respond with status 200 and booking data', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const hotel = await createHotel();
      const room = await createRooms(hotel);
      const booking = await createBooking(user, room);

      const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: booking.id,
          Room: expect.objectContaining({
            id: room.id,
            name: room.name,
          }),
        }),
      );
    });
  });
});

describe('POST /booking', () => {
  it('Should respond with status 401 if no token was given', async () => {
    const response = await server.post('/booking');

    expect(response.status).toBe(401);
  });

  it('Should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();
    const response = await server.post('/booking').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(401);
  });

  describe('When token is valid', () => {
    it('Should respond with status 400 if no body is given', async () => {
      const token = await generateValidToken();
      const response = await server.post('/booking').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(400);
    });

    it('Should respond with status 400 if given body is not valid', async () => {
      const token = await generateValidToken();
      const response = await server
        .post('/booking')
        .set('Authorization', `Bearer ${token}`)
        .send({ roomId: faker.lorem.word() });

      expect(response.status).toBe(400);
    });

    describe('When roomId is valid', () => {
      it('Should respond with status 403 if do not exist enrollment for this roomId', async () => {
        const token = await generateValidToken();
        const response = await server
          .post('/booking')
          .set('Authorization', `Bearer ${token}`)
          .send({ roomId: faker.datatype.number() });

        expect(response.status).toBe(403);
      });

      it('Should respond with status 403 if do not exist ticket for this roomId', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const enrollment = await createEnrollmentWithAddress(user);
        const response = await server
          .post('/booking')
          .set('Authorization', `Bearer ${token}`)
          .send({ roomId: faker.datatype.number() });

        expect(response.status).toBe(403);
      });

      it('Should respond with status 404 if do not exist a room with this id', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const enrollment = await createEnrollmentWithAddress(user);
        const ticketType = await createTicketType();
        const ticket = await createTicket(enrollment.id, ticketType.id, 'RESERVED');
        const response = await server
          .post('/booking')
          .set('Authorization', `Bearer ${token}`)
          .send({ roomId: faker.datatype.number() });

        expect(response.status).toBe(404);
      });

      it('Should respond with status 403 if the room is at maximum capacity', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const enrollment = await createEnrollmentWithAddress(user);
        const ticketType = await createTicketType();
        const ticket = await createTicket(enrollment.id, ticketType.id, 'RESERVED');
        const hotel = await createHotel();
        const room = await createRooms(hotel);
        const booking = await createBooking(user, room);
        const response = await server
          .post('/booking')
          .set('Authorization', `Bearer ${token}`)
          .send({ roomId: room.id });

        expect(response.status).toBe(403);
      });

      it('Should respond with status 403 if the ticket type is remote', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const enrollment = await createEnrollmentWithAddress(user);
        const ticketType = await createTicketTypeCustom(true, false);
        const ticket = await createTicket(enrollment.id, ticketType.id, 'RESERVED');
        const hotel = await createHotel();
        const room = await createRooms(hotel);
        const response = await server
          .post('/booking')
          .set('Authorization', `Bearer ${token}`)
          .send({ roomId: room.id });

        expect(response.status).toBe(403);
      });

      it('Should respond with status 200 with roomId', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const enrollment = await createEnrollmentWithAddress(user);
        const ticketType = await createTicketTypeCustom(false, true);
        const ticket = await createTicket(enrollment.id, ticketType.id, 'PAID');
        const hotel = await createHotel();
        const room = await createRooms(hotel);
        const response = await server
          .post('/booking')
          .set('Authorization', `Bearer ${token}`)
          .send({ roomId: room.id });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          roomId: room.id,
        });
      });
    });
  });
});
