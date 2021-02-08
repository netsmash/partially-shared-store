import { Types } from 'mongoose';
import * as WebSocket from 'ws';
import { HomeDocument, HomeModel, UserDocument, UserModel } from './models';
import { ManyToManyThrought } from './utils';

/* WsManagementService
 *
 * Singleton which manages the mapping between Users, Homes and (opened) WebSockets
 * in the following way:
 *
 * 1. Each User has associated multiple websockets.
 * 2. Each Home has associated multiple websockets.
 * 3. Each WebSocket has associated exactly one User and one Home.
 *
 * Observe that (3) creates a many-to-many relation between Users and Homes
 * through the websockets.
 *
 * Observe that the three poins imply the following:
 *
 * With the types Users, Homes and WebSockets, instances of any pair determine
 * exactly one instance of the third type.
 *
 */

type UserId = Types.ObjectId;
type HomeId = Types.ObjectId;

export class WsManagementService {
  protected static instance?: WsManagementService;
  protected userWsMap: Map<Types.ObjectId, WebSocket> = new Map();
  protected HEARTBEAT_RATE: number = 10000;
  protected _nextId: number = 0;
  protected mapWsId: Map<WebSocket, number> = new Map();
  protected mapIdWs: Map<number, WebSocket> = new Map();
  protected m2m: ManyToManyThrought<
    string,
    string,
    WebSocket
  > = new ManyToManyThrought();

  protected constructor() {}

  public static getInstance(): WsManagementService {
    if (!WsManagementService.instance) {
      WsManagementService.instance = new WsManagementService();
    }
    return WsManagementService.instance;
  }

  protected getNextId(): number {
    const id = this._nextId;
    this._nextId++;
    return id;
  }

  public bind(
    userId: UserId,
    homeId: HomeId,
    ws: WebSocket,
  ): WsManagementService {
    this.set(userId, homeId, ws);

    const wsId = this.getNextId();
    this.mapIdWs.set(wsId, ws);
    this.mapWsId.set(ws, wsId);

    this.sendHeartbeat(ws);
    return this;
  }

  public unlink(ws: WebSocket): WsManagementService {
    this.remove(ws);
    return this;
  }

  public async getUser(ws: WebSocket): Promise<UserDocument> {
    const userId = this.getUserId(ws);
    if (!userId) {
      throw new Error(
        `Websocket ${this.mapWsId.get(ws)} has no user associated.`,
      );
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error(
        `Websocket ${this.mapWsId.get(ws)} associated to invalid user id`,
      );
    }
    return user;
  }

  public async getHome(ws: WebSocket): Promise<HomeDocument> {
    const homeId = this.getHomeId(ws);
    if (!homeId) {
      throw new Error('Websocket has no home associated.');
    }
    const home = await HomeModel.findById(homeId);
    if (!home) {
      throw new Error('Websocket associated to invalid home id');
    }
    return home;
  }

  public remove(ws: WebSocket): WsManagementService {
    const id = this.mapWsId.get(ws);
    this.mapWsId.delete(ws);
    if (id !== undefined) {
      this.mapIdWs.delete(id);
    }
    this.m2m.remove(ws);
    return this;
  }

  public sendHeartbeat(ws: WebSocket) {
    if (ws && ws.readyState == WebSocket.OPEN) {
      const pingData = JSON.stringify({ event: 'heartbeat' });
      ws.ping(pingData);
      setTimeout(() => this.sendHeartbeat(ws), this.HEARTBEAT_RATE);
    }
  }

  public getContentInfo(): string {
    let s = '';
    s += `\nUser Id -> WebSocket Id\n=======================\n`;
    this.m2m.mapAT.forEach((ts, a) =>
      ts.forEach((t) => {
        const ta = a.constructor.name;
        const tt = t.constructor.name;
        s += `${ta} ${a} -> ${tt} ${this.mapWsId.get(t)} \n`;
      }),
    );
    s += `\nWebSocket Id -> User Id\n=======================\n`;
    this.m2m.mapTA.forEach((a, t) => {
      const ta = a.constructor.name;
      const tt = t.constructor.name;
      s += `${tt} ${this.mapWsId.get(t)} -> ${ta} ${a} \n`;
    });
    s += `\nHome Id -> WebSocket Id\n=======================\n`;
    this.m2m.mapBT.forEach((ts, b) =>
      ts.forEach((t) => {
        const tb = b.constructor.name;
        const tt = t.constructor.name;
        s += `${tb} ${b} -> ${tt} ${this.mapWsId.get(t)} \n`;
      }),
    );
    s += `\nWebSocket Id -> Home Id\n=======================\n`;
    this.m2m.mapTB.forEach((b, t) => {
      const tb = b.constructor.name;
      const tt = t.constructor.name;
      s += `${tt} ${this.mapWsId.get(t)} -> ${tb} ${b} \n`;
    });
    s += `\n`;
    return s;
  }

  public set(a: UserId, b: HomeId, t: WebSocket) {
    this.m2m.set(a.toHexString(), b.toHexString(), t);
    return this;
  }

  public removeUserId(a: UserId) {
    this.m2m.removeA(a.toHexString());
    return this;
  }

  public removeHomeId(b: HomeId) {
    this.m2m.removeB(b.toHexString());
    return this;
  }
  public hasUserId(a: UserId) {
    return this.m2m.hasA(a.toHexString());
  }
  public hasHomeId(b: HomeId) {
    return this.m2m.hasB(b.toHexString());
  }

  public get(a: UserId, b: HomeId) {
    return this.m2m.get(a.toHexString(), b.toHexString());
  }

  public getUserId(t: WebSocket) {
    const a = this.m2m.getA(t);
    if (a) {
      return Types.ObjectId.createFromHexString(a);
    }
  }

  public getHomeId(t: WebSocket) {
    const b = this.m2m.getB(t);
    if (b) {
      return Types.ObjectId.createFromHexString(b);
    }
  }
  public getTfromA(a: UserId) {
    return this.m2m.getTfromA(a.toHexString());
  }
  public getTfromB(b: HomeId) {
    return this.m2m.getTfromB(b.toHexString());
  }
}
