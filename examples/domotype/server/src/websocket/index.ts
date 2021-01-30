import * as WebSocket from 'ws';
import * as http from 'http';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { HomeDocument } from '../models';

export interface RequestWs extends Request {
  home: HomeDocument;
}

export const useWebsocket = (server: http.Server) => {
  // init services
  const authService = AuthService.getInstance();

  // create wss
  const wss: WebSocket.Server = new WebSocket.Server({ noServer: true });

  // on upgrade connection assign the user
  server.on('upgrade', async (request: Request, socket, head) => {
    await authService
      .authentication()(request)
      .then((_) => {
        // upgrade connection
        wss.handleUpgrade(request, socket, head, (ws, request) => {
          wss.emit('connection', ws, request);
        });
      })
      .catch((_) => {
        socket.destroy();
      });
  });

  // on connection
  wss.on('connection', (ws: WebSocket, request: RequestWs) => {
    // on init

    // on message
    ws.on('message', (ws) => {});

    // on close
    ws.on('close', (ws) => {});
  });

  return wss;
};
