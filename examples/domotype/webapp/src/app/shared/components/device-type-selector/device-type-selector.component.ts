import {
  Component,
  forwardRef,
  Output,
  EventEmitter,
  Input,
  HostBinding,
  HostListener,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DeviceType } from 'domotype-store/models';

@Component({
  selector: 'app-device-type-selector',
  templateUrl: './device-type-selector.component.html',
  styleUrls: ['./device-type-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DeviceTypeSelectorComponent),
      multi: true,
    },
  ],
})
export class DeviceTypeSelectorComponent implements ControlValueAccessor {
  @Input('type') type: DeviceType = DeviceType.Bulb;
  @Output() typeChange: EventEmitter<DeviceType> = new EventEmitter();

  @HostBinding('class.disabled')
  @Input('disabled')
  disabled: boolean = false;

  protected values = [DeviceType.Bulb, DeviceType.Blind, DeviceType.Thermostat];

  public onChange: any = () => {};
  public onTouched: any = () => {};

  constructor() {}

  @HostListener('click')
  public onClick() {
    if (this.disabled) {
      return;
    }
    const index = this.values.findIndex((type) => this.type === type);
    const newIndex = (index + 1) % this.values.length;
    this.type = this.values[newIndex];
    this.outputValue();
  }

  public writeValue(type: DeviceType): void {
    this.type = type;
  }

  public outputValue() {
    this.onChange(this.type);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
