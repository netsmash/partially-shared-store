import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyHomesComponent } from './my-homes/my-homes.component';
import { HomeDetailComponent } from './my-homes/home-detail/home-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'homes',
    pathMatch: 'full',
  },
  {
    path: 'homes',
    component: MyHomesComponent,
  },
  {
    path: 'homes/:id',
    component: HomeDetailComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
