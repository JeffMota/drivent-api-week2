import { ApplicationError } from '@/protocols';

export function unauthorizedError(): ApplicationError {
  return {
    name: 'UnauthorizedError',
    message: 'You must be signed in to continue',
  };
}

export function doesntOwnTicket(): ApplicationError {
  return {
    name: 'DoesntOwnTicketError',
    message: 'You are not the owner of this ticket',
  };
}
