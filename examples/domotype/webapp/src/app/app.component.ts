import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/state';
import { startApp } from '@app/store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'DomoType';

  constructor(protected store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(startApp());
  }
}
