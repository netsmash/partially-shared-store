import * as WebSocket from 'ws';
import { IdentityMapping, TaskQueuer } from 'partially-shared-store/utils';
import { Store } from 'counter-store';
import { isRequest, Request, Action, isAction, ActionTypes as AT } from 'counter-store/';
import { Identificable } from './identificable';

const send = (ws: WebSocket, data: any) => {
  console.log('SENT:', data);
  return ws.send(JSON.stringify(data));
};

export const onMessage = (
  ws: WebSocket,
  store: Store,
  taskQueuer: TaskQueuer,
  idMap: IdentityMapping<WebSocket, Identificable, Identificable['id']>,
) => {
  const planRequest = async (request: Request): Promise<void> => {
    try {
      await store.validate(request);
    } catch (e) {
      console.error('ValidationError', e.message);
      return;
    }
    const actions: Action[] = await store.plan(request);
    for (let action of actions) {
      await dispatchAction(action);
    }
  };

  const dispatchAction = async (action: Action): Promise<void> => {
    if (!isAction(action, AT.Clone)) {
      await store.dispatch(action);
    }

    const targets: Identificable[] = isAction(action, AT.Clone)
      ? [idMap.getId(ws) as Identificable]
      : idMap.getAllIdentities();

    targets.forEach((target) => {
      const ws = idMap.getT(target);
      if (ws) {
        const actionData = action;
        send(ws, actionData);
      }
    });
  };

  return (rawData: string) => {
    taskQueuer.queue(async () => {
      const request = JSON.parse(rawData);
      console.log('RECEIVED:', request);
      if (isRequest(request)) {
        await planRequest(request);
      } else {
        console.log('it is NOT an action request');
      }
    });
  };
};
