import { prisma } from '@/config';
import { InsertPayment } from '@/protocols';

async function getTicketPayment(ticketId: number) {
  return await prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function paymentProcess(data: InsertPayment) {
  return await prisma.payment.create({
    data,
  });
}

async function updateTicket(id: number) {
  return await prisma.ticket.update({
    where: {
      id,
    },
    data: {
      status: 'PAID',
    },
  });
}

export default {
  getTicketPayment,
  paymentProcess,
  updateTicket,
};
