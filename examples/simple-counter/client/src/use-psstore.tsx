import * as React from 'react';
import { DeepReadonly } from 'partially-shared-store';
import { State, createStore, Request, createRequest, RequestTypes as RT, isAction } from 'counter-store';

const sendThroughWS = (ws: WebSocket) => (o: Object) => {
  console.log('SEND', o);
  ws.send(JSON.stringify(o));
};

export interface UsePSStoreProps {
  endpoint: string;
}

export interface UsePSStoreReturn {
  state: DeepReadonly<State>;
  request: (r: Request) => void;
}

export const usePSStore: React.FC<UsePSStoreProps> = ({ endpoint }): UsePSStoreReturn => {
  const store = createStore();
  const [state, setState] = React.useState<DeepReadonly<State>>(store.currentState);
  const [request, setRequest] = React.useState<(r: Request) => void>(() => (_: Request) => {});

  React.useEffect(() => {
    const ws = new WebSocket(endpoint);
    const send = sendThroughWS(ws);

    // setting request
    setRequest(() => (request: Request) => send(request));

    // at stablishing connection request for clone action
    ws.addEventListener('open', () => {
      send(createRequest(RT.Clone)({}));
    });

    // at receive action, apply the reducer
    ws.addEventListener('message', ({ data }) => {
      const action = JSON.parse(data);
      console.log('RECEIVED', action);
      if (isAction(action)) {
        store
          .dispatch(action)
          .then((state) => {
            console.log('here', state);
            return state;
          })
          .then((state) => setState(state))
          .then((_) => {
            console.log('here');
          });
      } else {
        console.error('Received data is not an action');
      }
    });

    // on message, update store
    return () => ws.close();
  }, []);

  return { state, request };
};
