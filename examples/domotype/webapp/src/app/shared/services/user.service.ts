import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { User, ReceivedUser, parseUser } from '@app/models/User';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public requestUserByDisplayName(displayName: string): Observable<User> {
    const url: string = `${environment.server.url}/users/name/${displayName}`;
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });

    return this.http
      .get<ReceivedUser>(url, { headers })
      .pipe(map(parseUser));
  }
}
