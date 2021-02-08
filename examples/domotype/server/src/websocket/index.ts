import * as WebSocket from 'ws';
import * as http from 'http';
import * as url from 'url';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { HomeDocument, HomeModel } from '../models';
import { onConnect } from './on-connect';
import { onClose } from './on-close';
import { onMessage } from './on-message';

export interface RequestWs extends Request {
  home: HomeDocument;
}

export const useWebsocket = (server: http.Server) => {
  // init services
  const authService = AuthService.getInstance();

  // constants
  const pathRegex = /.*\/ws\/homes\/([0-9a-f]+)\/?(\?.*)?$/;

  // create wss
  const wss: WebSocket.Server = new WebSocket.Server({ noServer: true });

  // on upgrade connection assign the user
  server.on('upgrade', async (request: Request, socket, head) => {
    await authService
      // authenticate
      .websocketTicketAuthentication(request)
      // extract home id from url
      .then((_) => {
        const pathname = url.parse(request.url).pathname;
        const matches = pathname && pathname.match(pathRegex);
        if (!matches || matches.length < 1) {
          throw Error('No url match');
        }
        return matches[1];
      })
      // get home model
      .then(async (homeId: string) => {
        // get home
        const home = await HomeModel.findById(homeId);
        if (!home) {
          throw Error('Invalid home id');
        }
        return home;
      })
      // check permissions
      .then((home: HomeDocument) => {
        // check user have access
        const hasAccess = !!home.users.find((userId) =>
          request.user._id.equals(userId),
        );
        if (!hasAccess) {
          throw Error('Forbidden home');
        }

        return home;
      })
      // upgrade connection
      .then((home: HomeDocument) => {
        wss.handleUpgrade(request, socket, head, (ws, request) => {
          wss.emit('connection', ws, request, home);
        });
      })
      // reject connection
      .catch((error) => {
        console.error(error);
        socket.destroy();
      });
  });

  // on connection
  wss.on(
    'connection',
    (ws: WebSocket, request: RequestWs, home: HomeDocument) => {
      // on init
      onConnect(request.user, home)(ws);

      // on message
      ws.on('message', onMessage(request.user, home, ws));

      // on close
      ws.on('close', onClose(request.user, home, ws));
    },
  );

  return wss;
};
