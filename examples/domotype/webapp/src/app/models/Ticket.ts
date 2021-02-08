export interface ReceivedTicket {
  expiresAt: number;
  id: string;
}

export interface Ticket {
  expiresAt: Date;
  id: string;
}

export const parseTicket = (serializedTicket: ReceivedTicket): Ticket => ({
  id: serializedTicket.id,
  expiresAt: new Date(serializedTicket.expiresAt),
});
