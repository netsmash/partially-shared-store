import * as WebSocket from 'ws';
import { HomeDocument, UserDocument } from '../models';
import { WsManagementService } from '../ws-management.service';

const wsManager = WsManagementService.getInstance();

export const onConnect = (
  user: UserDocument,
  home: HomeDocument,
): ((ws: WebSocket) => void) => (ws: WebSocket): void => {
  wsManager.bind(user._id, home._id, ws);
};
