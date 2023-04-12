import { Prisma, TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function getTicketsTypes(): Promise<TicketType[]> {
  return await prisma.ticketType.findMany();
}

async function getUniqueTicketType(id: number): Promise<TicketType> {
  return await prisma.ticketType.findFirst({
    where: {
      id,
    },
  });
}

async function getEnrollment(userId: number) {
  return await prisma.enrollment.findFirst({
    where: {
      userId,
    },
  });
}

async function getTicketByEnrollment(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
  });
}

async function postTicket(data: any) {
  return await prisma.ticket.create({
    data,
  });
}

export default {
  getTicketsTypes,
  getEnrollment,
  getTicketByEnrollment,
  getUniqueTicketType,
  postTicket,
};
