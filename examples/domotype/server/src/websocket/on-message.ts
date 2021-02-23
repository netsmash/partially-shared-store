import { State, toIdentificable } from 'domotype-store';
import { Types } from 'mongoose';
import {
  ActionRequest,
  ActionRequestTypes as ART,
  isActionRequest,
} from 'domotype-store/action-requests';
import { Action } from 'domotype-store/actions';
import { shadeAction } from 'domotype-store/shaders';
import {
  deserializeActionRequest,
  serializeAction,
} from 'domotype-store/serializers';
import { DeepReadonly } from 'partially-shared-store';
import * as WebSocket from 'ws';
import { HomeDocument, UserDocument } from '../models';
import { StoreService } from '../store.service';
import { TaskService } from '../task.service';
import { WsManagementService } from '../ws-management.service';

const store = StoreService.getInstance();
const wsManager = WsManagementService.getInstance();
const taskService = TaskService.getInstance();

const getTargets = (home: HomeDocument) => (action: Action): Set<WebSocket> => {
  if (action.targets) {
    const targets = new Set(
      [...action.targets]
        .map((target) => target.id)
        .map(Types.ObjectId.createFromHexString)
        .map((userId) => wsManager.get(userId, home._id) as WebSocket),
    );
    return targets;
  } else {
    const targets = wsManager.getTfromB(home._id);
    return targets;
  }
};

export const onMessage = (
  _: UserDocument,
  _2: HomeDocument,
  ws: WebSocket,
): ((data: any) => void) => (data): void => {
  taskService.queue(async () => {
    const user = await wsManager.getUser(ws);
    const home = await wsManager.getHome(ws);
    console.log(`<- (${user._id}) ${user.displayName}:`, data);

    // deserialize
    const actualState = await home.deserialize();
    const request: ActionRequest = deserializeActionRequest(actualState)(
      JSON.parse(data),
    );

    // overwrite author
    if (isActionRequest(request, ART.AddUser)) {
      // do nothing
    } else if (request.author.id !== user.id) {
      console.error('Wrong Author');
      return;
    }

    // validate
    try {
      store.validate(request, actualState);
    } catch (e) {
      console.error(e);
      return;
    }

    // plan
    const actions: Action[] = store.plan(request, actualState);
    let newState: DeepReadonly<State> = actualState;

    const getTargetsForHome = getTargets(home);

    // for each action
    for (const action of actions) {
      // dispatch
      if (!action.serverIgnore) {
        newState = await store.dispatch(action, newState);
      }
      // save
      home.fromState(newState);
      await home.save();
      // send
      const targets = getTargetsForHome(action);
      for (const ws of targets) {
        const user = await wsManager.getUser(ws);
        // shadow
        const shadedAction: DeepReadonly<Action> = shadeAction(newState)(
          toIdentificable(user),
        )(action);
        // serialize
        const serializedAction = serializeAction(newState)(shadedAction);
        const data = JSON.stringify(serializedAction);
        // send
        console.log(`-> (${user._id}) ${user.displayName}:`, data);
        ws.send(data);
      }
    }
    // ignore
  });
};
