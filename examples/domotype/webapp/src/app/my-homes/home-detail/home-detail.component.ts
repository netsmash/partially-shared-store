import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, mergeMap, tap } from 'rxjs/operators';
import { State as HomeState } from 'domotype-store';
import { Observable } from 'rxjs';
import { HomeStore } from '@app/shared/utils';
import { HomeService } from '@app/shared/services/home.service';
import { TitleService } from '@app/shared/services/title.service';
import { Device } from 'domotype-store/models';
import { SchemaService } from '@app/shared/services/schema.service';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.scss'],
})
export class HomeDetailComponent implements OnInit, OnDestroy {
  public homeStore$: Observable<HomeStore>;
  public home$?: Observable<HomeState>;
  public devices$?: Observable<Device[]>;
  public homeId?: string;

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService,
    private titleService: TitleService,
    protected schemaService: SchemaService,
  ) {
    this.schemaService.setTitle('Devices');
  }

  ngOnInit(): void {
    this.homeStore$ = this.route.paramMap.pipe(
      map((params) => params.get('id')),
      tap((homeId) => (this.homeId = homeId)),
      mergeMap((homeId) => this.homeService.getStore(homeId)),
    );
    this.home$ = this.homeStore$.pipe(
      mergeMap((store) => store.state$),
      tap((state) => this.titleService.setTitle(state.name)),
    );
    this.devices$ = this.home$.pipe(
      map((state) => Object.values(state.devices)),
      tap((homes) =>
        this.schemaService.setItems(homes.map((home) => home.name)),
      ),
    );
  }

  ngOnDestroy(): void {
    if (this.homeId) {
      this.homeService.disconnectStore(this.homeId);
    }
  }
}
