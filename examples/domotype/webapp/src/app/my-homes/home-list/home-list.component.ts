import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Home } from '@models/Home';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss'],
})
export class HomeListComponent implements OnInit {
  @Input('homes$') homes$: Observable<Home[]>;

  constructor() {}

  ngOnInit(): void {}
}
