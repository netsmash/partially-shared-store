import { DeepReadonly } from 'partially-shared-store';
import { TaskQueuer } from 'partially-shared-store/utils';
import {
  Store,
  createInitialState,
  Id,
  toIdentificable,
  State,
  createStore,
} from 'domotype-store';
import {
  Action,
  createAction,
  ActionTypes as AT,
} from 'domotype-store/actions';
import {
  ActionRequest,
  createActionRequest,
  ActionRequestTypes as ART,
} from 'domotype-store/action-requests';
import {
  serializeActionRequest,
  Serialized,
  deserializeAction,
} from 'domotype-store/serializers';
import { environment } from '@env/environment';
import { Ticket } from '@models/Ticket';
import { Subject, Observable } from 'rxjs';
import { User } from '@app/models/User';

type LocalActionRequest<T extends ART> = Omit<
  ActionRequest<T>,
  'id' | 'type' | 'author'
>;

export enum WebSocketReadyState {
  CONNECTING,
  OPEN,
  CLOSING,
  CLOSED,
}

export class HomeStore {
  protected store: Store = createStore();
  protected taskQueuer: TaskQueuer = new TaskQueuer();
  protected websocket: WebSocket;
  protected subjectConnectionState: Subject<WebSocketReadyState> = new Subject();
  public connectionState$: Observable<WebSocketReadyState> = this.subjectConnectionState.asObservable();
  protected stateSource: Subject<DeepReadonly<State>> = new Subject();
  public state$: Observable<
    DeepReadonly<State>
  > = this.stateSource.asObservable();

  constructor(
    protected user: User,
    protected homeId: Id,
    protected ticket: Ticket,
  ) {
    this.connect();
    this.stateToSource();
    this.taskQueuer.start();
  }

  protected connect(): void {
    this.websocket = new WebSocket(
      `${environment.server.ws}/homes/${this.homeId}/?ticket=${this.ticket.id}`,
    );
    this.subjectConnectionState.next(this.websocket.readyState);
    this.addEventListeners();
  }

  protected async stateToSource(): Promise<void> {
    for await (let state of this.store.state) {
      this.stateSource.next(state);
    }
    this.stateSource.complete();
  }

  protected addEventListeners(): void {
    // connect
    this.websocket.addEventListener('open', (event) => {
      this.subjectConnectionState.next(this.websocket.readyState);
      this.request(ART.Clone)({});
    });

    // Listen for messages
    this.websocket.addEventListener('message', (event) =>
      this.taskQueuer.queue(async () => {
        const serializedAction: Serialized<Action> = JSON.parse(event.data);
        const action: Action = deserializeAction(this.store.currentState)(
          serializedAction,
        );
        await this.store.dispatch(action);
      }),
    );

    // on close
    this.websocket.addEventListener('close', (event) => {
      this.subjectConnectionState.next(this.websocket.readyState);
      this.close();
    });

    // on error
    this.websocket.addEventListener('error', (event) => {
      event.preventDefault();
      this.subjectConnectionState.next(this.websocket.readyState);
      this.close();
    });
  }

  protected addAuthorToLocalActionRequest<T extends ART>(
    type: T,
  ): (obj: LocalActionRequest<T>) => Omit<ActionRequest<T>, 'id' | 'type'> {
    return (
      obj: LocalActionRequest<T>,
    ): Omit<ActionRequest<T>, 'id' | 'type'> =>
      ({
        ...obj,
        author: toIdentificable(this.user),
      } as Omit<ActionRequest<T>, 'id' | 'type'>);
  }

  public request<T extends ART>(type: T): (obj: LocalActionRequest<T>) => void {
    return (obj: LocalActionRequest<T>) => {
      const objWithAuthor = this.addAuthorToLocalActionRequest(type)(obj);

      const actionRequest: ActionRequest = createActionRequest(type)(
        objWithAuthor,
      );

      const serializedActionRequest = serializeActionRequest(
        this.store.currentState,
      )(actionRequest);
      this.websocket.send(JSON.stringify(serializedActionRequest));
    };
  }

  public close(): void {
    this.stateSource.complete();
    this.websocket.close();
  }
}
