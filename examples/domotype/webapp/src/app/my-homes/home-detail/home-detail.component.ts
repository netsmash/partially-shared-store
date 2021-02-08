import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, mergeMap, tap } from 'rxjs/operators';
import { State as HomeState } from 'domotype-store';
import { Observable } from 'rxjs';
import { HomeStore } from '@app/shared/utils';
import { HomeService } from '@app/shared/services/home.service';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.scss'],
})
export class HomeDetailComponent implements OnInit, OnDestroy {
  protected homeStore$: Observable<HomeStore>;
  public home$?: Observable<HomeState>;
  public homeId?: string;

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService,
  ) {}

  ngOnInit(): void {
    this.homeStore$ = this.route.paramMap.pipe(
      map((params) => params.get('id')),
      tap((homeId) => (this.homeId = homeId)),
      mergeMap((homeId) => this.homeService.getStore(homeId)),
    );
    this.home$ = this.homeStore$.pipe(mergeMap((store) => store.state$));
  }

  ngOnDestroy(): void {
    if (this.homeId) {
      this.homeService.disconnectStore(this.homeId);
    }
  }
}
