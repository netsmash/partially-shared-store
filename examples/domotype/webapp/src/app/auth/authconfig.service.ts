import { Injectable } from '@angular/core';
import {
  AuthConfig,
  NullValidationHandler,
  OAuthService,
} from 'angular-oauth2-oidc';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User, parseUser, ReceivedUser } from '@models/User';
import { AppState } from '@app/store/state';
import { Store } from '@ngrx/store';
import { requestActualUser } from './store/actions';

@Injectable()
export class AuthConfigService {
  private initializedPromise: Promise<void>;
  private initializedPromiseResolve: () => any;

  get forToken() {
    return this.initializedPromise;
  }
  get accessToken() {
    return this.oauthService.getAccessToken();
  }

  constructor(
    private http: HttpClient,
    protected store: Store<AppState>,
    private readonly oauthService: OAuthService,
    private readonly authConfig: AuthConfig,
  ) {
    this.initializedPromise = new Promise(
      (resolve) => (this.initializedPromiseResolve = resolve),
    );

    this.initializedPromise.then((_) => {
      this.store.dispatch(requestActualUser());
    });
  }

  async initAuth(): Promise<void> {
    return new Promise((resolve, reject) => {
      // setup oauthService
      this.oauthService.configure(this.authConfig);
      this.oauthService.setStorage(localStorage);
      this.oauthService.tokenValidationHandler = new NullValidationHandler();

      // subscribe to token events
      this.oauthService.events.subscribe(() => {
        if (this.oauthService.hasValidAccessToken()) {
          this.initializedPromiseResolve();
        }
      });

      // continue initializing app or redirect to login-page

      this.oauthService.loadDiscoveryDocumentAndLogin().then((isLoggedIn) => {
        if (isLoggedIn) {
          this.oauthService.setupAutomaticSilentRefresh();
          resolve();
        } else {
          this.oauthService.initImplicitFlow();
          reject();
        }
      });
    });
  }

  public requestActualUser(): Observable<User> {
    const url: string = `${environment.server.url}/users/me`;
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });

    return this.http
      .get<ReceivedUser>(url, { headers })
      .pipe(map(parseUser));
  }
}
