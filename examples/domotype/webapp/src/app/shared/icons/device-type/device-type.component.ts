import { Component, OnInit, Input } from '@angular/core';
import { DeviceType } from 'domotype-store/models';

@Component({
  selector: 'app-device-type',
  templateUrl: './device-type.component.html',
  styleUrls: ['./device-type.component.scss'],
})
export class DeviceTypeComponent {
  @Input('type') type: DeviceType = DeviceType.Bulb;

  constructor() {}

  public get isBulb(): boolean {
    return this.type === DeviceType.Bulb;
  }

  public get isBlind(): boolean {
    return this.type === DeviceType.Blind;
  }

  public get isThermostat(): boolean {
    return this.type === DeviceType.Thermostat;
  }
}
