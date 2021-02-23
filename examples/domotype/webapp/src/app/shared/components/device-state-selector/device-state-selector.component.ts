import {
  Component,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {
  DeviceState,
  DeviceType,
  BulbState,
  BlindState,
  ThermostatState,
} from 'domotype-store/models';

@Component({
  selector: 'app-device-state-selector',
  templateUrl: './device-state-selector.component.html',
  styleUrls: ['./device-state-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DeviceStateSelectorComponent),
      multi: true,
    },
  ],
})
export class DeviceStateSelectorComponent
  implements ControlValueAccessor, OnChanges {
  @Input('type') type: DeviceType;
  @Output('state') stateChange: EventEmitter<DeviceState> = new EventEmitter();
  public bulbOn: boolean = false;
  public bulbIntensityStr: string = '100';
  public blindRaised: boolean = true;
  public thermostatTemperatureStr: string = '18';

  public onChange: any = () => {};
  public onTouched: any = () => {};

  public DeviceType = DeviceType;

  public get bulbIntensity(): number {
    return Number(this.bulbIntensityStr);
  }

  public set bulbIntensity(value: number) {
    this.bulbIntensityStr = '' + value;
  }

  public get thermostatTemperature(): number {
    return Number(this.thermostatTemperatureStr);
  }

  public set thermostatTemperature(value: number) {
    this.thermostatTemperatureStr = '' + value;
  }

  public get state(): DeviceState {
    switch (this.type) {
      case DeviceType.Bulb:
        return {
          on: this.bulbOn,
          intensity: this.bulbIntensity,
        };
      case DeviceType.Blind:
        return {
          raised: this.blindRaised,
        };
      case DeviceType.Thermostat:
        return {
          temperature: this.thermostatTemperature,
        };
    }
  }

  public onChangeBulbIntensity($event) {
    this.bulbIntensityStr = $event.target.value;
    this.onStateChange();
  }

  public onChangeThermostatTemperature($event) {
    this.thermostatTemperatureStr = $event.target.value;
    this.onStateChange();
  }

  public onStateChange() {
    this.stateChange.emit(this.state);
    this.outputValue();
  }

  public writeValue(state: DeviceState): void {
    switch (this.type) {
      case DeviceType.Bulb:
        this.bulbOn = (state as BulbState).on;
        this.bulbIntensity = (state as BulbState).intensity;
        break;
      case DeviceType.Blind:
        this.blindRaised = (state as BlindState).raised;
        break;
      case DeviceType.Thermostat:
        this.thermostatTemperature = (state as ThermostatState).temperature;
        break;
    }
  }

  public outputValue() {
    this.onChange(this.state);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  public ngOnChanges(changes) {
    const { type: typeChanges } = changes;
    if (typeChanges && !typeChanges.firstChange) {
      this.onStateChange();
    }
  }
}
