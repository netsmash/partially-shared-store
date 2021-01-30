import { UserDocument } from '../src/models';

declare global {
  namespace Express {
    export interface Request {
      user: UserDocument;
    }
  }
}
