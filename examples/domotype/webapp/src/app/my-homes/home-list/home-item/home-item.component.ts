import { Component, Input, OnInit } from '@angular/core';
import { Home } from '@models/Home';

@Component({
  selector: 'app-home-item',
  templateUrl: './home-item.component.html',
  styleUrls: ['./home-item.component.scss'],
})
export class HomeItemComponent implements OnInit {
  @Input('home') home: Home;

  constructor() {}

  ngOnInit(): void {}
}
