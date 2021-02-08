import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { AuthModule } from '@app/auth/auth.module';
import { MyHomesComponent } from '@app/my-homes/my-homes.component';
import { HomeListComponent } from '@app/my-homes/home-list/home-list.component';
import { HomeItemComponent } from '@app/my-homes/home-list/home-item/home-item.component';
import { environment } from '@env/environment';
import { AppEffects } from '@app/store/effects';
import { HomesEffects } from '@app/my-homes/store/effects';
import { AuthEffects } from '@app/auth/store/effects';
import { appReducers, metaReducers } from '@app/store/reducers';
import { SharedModule } from '@app/shared/shared.module';
import { NewHomeItemComponent } from './my-homes/home-list/new-home-item/new-home-item.component';
import { HomeDetailComponent } from './my-homes/home-detail/home-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MyHomesComponent,
    HomeListComponent,
    HomeItemComponent,
    NewHomeItemComponent,
    HomeDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,

    StoreModule.forRoot(appReducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects, HomesEffects, AuthEffects]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
