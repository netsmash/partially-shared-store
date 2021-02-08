import { UserDocument, UserModel } from './user';
import { Document, model, Schema, Types, Model } from 'mongoose';

const WEBSOCKET_TICKET_EXPIRATION_TIME = 300;

export interface SerializedWebSocketTicket {
  id: string;
  expiresAt: number;
}

export interface WebSocketTicketDocument extends Document {
  userId: Types.ObjectId;
  expiresAt: Date;
  serialize: () => SerializedWebSocketTicket;
}

const WebSocketTicketSchema = new Schema<WebSocketTicketDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  expiresAt: {
    type: Schema.Types.Date,
  },
});

WebSocketTicketSchema.methods.serialize = function (): SerializedWebSocketTicket {
  return {
    id: this._id.toString(),
    expiresAt: this.expiresAt.getTime(),
  };
};

WebSocketTicketSchema.static(
  'use',
  async function (
    ticketId: string | Types.ObjectId,
  ): Promise<UserDocument | undefined> {
    await WebSocketTicketModel.deleteMany({ expiresAt: { $lte: new Date() } });
    const ticket = await WebSocketTicketModel.findByIdAndDelete(ticketId);
    if (!ticket) {
      return;
    }
    const user = await UserModel.findById(ticket.userId);
    if (!user) {
      return;
    }
    return user;
  },
);

WebSocketTicketSchema.static(
  'issue',
  async function (userId: Types.ObjectId): Promise<WebSocketTicketDocument> {
    const expiresAt: Date = new Date(
      Date.now() + WEBSOCKET_TICKET_EXPIRATION_TIME * 1000,
    );
    const ticket = new WebSocketTicketModel({
      expiresAt,
      userId,
    });
    await ticket.save();
    return ticket;
  },
);

interface WebSocketTicketModelInterface extends Model<WebSocketTicketDocument> {
  use: (ticketId: string | Types.ObjectId) => Promise<UserDocument | undefined>;
  issue: (userId: Types.ObjectId) => Promise<WebSocketTicketDocument>;
}

export const WebSocketTicketModel = model<
  WebSocketTicketDocument,
  WebSocketTicketModelInterface
>('WebSocketTicket', WebSocketTicketSchema);
