import * as WebSocket from 'ws';
import { HomeDocument, UserDocument } from '../models';
import { WsManagementService } from '../ws-management.service';

const wsManager = WsManagementService.getInstance();

export const onClose = (
  user: UserDocument,
  home: HomeDocument,
  ws: WebSocket,
): ((...args: any[]) => void) => (...args: any[]) => {
  wsManager.unlink(ws);
};
