import { Component } from '@angular/core';
import { PartiallySharedStoreService } from './psstore.service';
import { map } from 'rxjs/operators';
import { RequestTypes as RT, createRequest } from 'counter-store/action-requests';
import { State as CounterState } from 'counter-store/state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <div>Counter: {{ value$ | async }}</div>
    <button (click)="decrement()">-1</button>
    <button (click)="increment()">+1</button>
  `,
  styles: [],
})
export class AppComponent {
  title = 'client';
  value$: Observable<number>;

  constructor(private psStore: PartiallySharedStoreService) {
    this.value$ = this.psStore.state$.pipe(map((state: CounterState) => state.value));
  }

  increment() {
    this.psStore.request(
      createRequest(RT.Increment)({
        author: this.psStore.identity,
      }),
    );
  }

  decrement() {
    this.psStore.request(
      createRequest(RT.Decrement)({
        author: this.psStore.identity,
      }),
    );
  }
}
