import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-device-public',
  templateUrl: './device-public.component.html',
  styleUrls: ['./device-public.component.scss'],
})
export class DevicePublicComponent implements OnInit {
  @Input('value') value: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
