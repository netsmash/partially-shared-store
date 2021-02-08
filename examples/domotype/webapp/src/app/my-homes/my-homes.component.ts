import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from '@app/store/state';
import { Home } from '@models/Home';

@Component({
  selector: 'app-my-homes',
  templateUrl: './my-homes.component.html',
  styleUrls: ['./my-homes.component.scss'],
})
export class MyHomesComponent implements OnInit {
  public homes$: Observable<Home[]>;

  constructor(protected store: Store<AppState>) {}

  ngOnInit(): void {
    this.homes$ = this.store.pipe(
      map((state) => Object.values(state.homes.homes)),
    );
  }
}
