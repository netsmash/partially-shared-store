import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ReceivedHome, Home, parseHome, RequestedNewHome } from '@models/Home';
import { environment } from '@env/environment';
import { map, tap, filter, mergeMap } from 'rxjs/operators';
import { Ticket, parseTicket, ReceivedTicket } from '@app/models/Ticket';
import { HomeStore, WebSocketReadyState } from '../utils';
import { Id } from 'domotype-store';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/state';
import { User } from '@app/models/User';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  protected homeStores: Map<Id, HomeStore> = new Map();

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  public requestHomes(): Observable<Home[]> {
    const url: string = `${environment.server.url}/homes`;
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });

    return this.http
      .get<ReceivedHome[]>(url, { headers })
      .pipe(map((receivedHomes) => receivedHomes.map(parseHome)));
  }

  public createHome(data: RequestedNewHome): Observable<Home> {
    const url: string = `${environment.server.url}/homes`;
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });

    return this.http
      .post<ReceivedHome>(url, data, { headers })
      .pipe(map(parseHome));
  }

  protected requestTicket(): Observable<Ticket> {
    const url: string = `${environment.server.url}/ws/tickets/issue`;
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });

    return this.http
      .get<ReceivedTicket>(url, { headers })
      .pipe(map(parseTicket));
  }

  protected connectToStore(homeId: Id): Observable<HomeStore> {
    return this.store.pipe(
      map((state: AppState) => state.auth.user),
      filter((user) => !!user),
      mergeMap((user: User) =>
        this.requestTicket().pipe(
          map((ticket) => new HomeStore(user, homeId, ticket)),
        ),
      ),
    );
  }

  public getStore(homeId: Id): Observable<HomeStore> {
    const homeStore = this.homeStores.get(homeId);
    if (homeStore) {
      return of(homeStore);
    }
    return this.connectToStore(homeId).pipe(
      tap((homeStore) => {
        const subscription = homeStore.connectionState$
          .pipe(filter((state) => state === WebSocketReadyState.CLOSED))
          .subscribe((state) => {
            this.homeStores.delete(homeId);
            subscription.unsubscribe();
          });

        this.homeStores.set(homeId, homeStore);
      }),
    );
  }

  public disconnectStore(homeId: Id): boolean {
    const homeStore = this.homeStores.get(homeId);
    if (!homeStore) {
      return false;
    }
    homeStore.close();
    return true;
  }
}
