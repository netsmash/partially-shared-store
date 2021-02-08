import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthConfigService } from './authconfig.service';
import { environment } from '@env/environment';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(protected authConfig: AuthConfigService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (request.url.includes(environment.server.url)) {
      return from(this.authConfig.forToken).pipe(
        mergeMap((_) =>
          next
            .handle(
              request.clone({
                setHeaders: {
                  Authorization: `Bearer ${this.authConfig.accessToken}`,
                },
              }),
            )
            .pipe(
              catchError((error: HttpErrorResponse) => {
                const data = {
                  reason:
                    error && error.error && error.error.reason
                      ? error.error.reason
                      : '',
                  status: error.status,
                };
                console.error(data);
                return throwError(error);
              }),
            ),
        ),
      );
    } else {
      return next.handle(request);
    }
  }
}
