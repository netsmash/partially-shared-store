import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/state';
import { startApp } from '@app/store/actions';
import { Observable } from 'rxjs';
import { TitleService } from '@app/shared/services/title.service';
import { SchemaService } from '@app/shared/services/schema.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title$: Observable<string>;

  constructor(
    protected store: Store<AppState>,
    protected titleService: TitleService,
    public readonly schemaService: SchemaService,
  ) {
    this.title$ = this.titleService.title$;
  }

  ngOnInit() {
    this.store.dispatch(startApp());
  }
}
