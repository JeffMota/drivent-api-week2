import joi from 'joi';

export const postTicketSchema = joi.object({
  ticketTypeId: joi.number().required(),
});
