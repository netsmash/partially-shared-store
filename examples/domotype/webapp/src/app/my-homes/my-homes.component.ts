import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AppState } from '@app/store/state';
import { Home } from '@models/Home';
import { TitleService } from '@app/shared/services/title.service';
import { SchemaService } from '@app/shared/services/schema.service';

@Component({
  selector: 'app-my-homes',
  templateUrl: './my-homes.component.html',
  styleUrls: ['./my-homes.component.scss'],
})
export class MyHomesComponent implements OnInit {
  public homes$: Observable<Home[]>;

  constructor(
    protected store: Store<AppState>,
    protected titleService: TitleService,
    protected schemaService: SchemaService,
  ) {
    this.titleService.setTitle('My homes');
    this.schemaService.setTitle('Homes');
  }

  ngOnInit(): void {
    this.homes$ = this.store.pipe(
      map((state) => Object.values(state.homes.homes)),
      tap(console.log),
      tap((homes) =>
        this.schemaService.setItems(homes.map((home) => home.name)),
      ),
    );
  }
}
