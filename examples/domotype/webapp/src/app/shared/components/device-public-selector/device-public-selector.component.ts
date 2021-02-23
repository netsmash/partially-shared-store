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

@Component({
  selector: 'app-device-public-selector',
  templateUrl: './device-public-selector.component.html',
  styleUrls: ['./device-public-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DevicePublicSelectorComponent),
      multi: true,
    },
  ],
})
export class DevicePublicSelectorComponent implements ControlValueAccessor {
  @Input('public') value: boolean = true;
  @Output('public') valueChange: EventEmitter<boolean> = new EventEmitter();

  @HostBinding('class.disabled')
  @Input('disabled')
  disabled: boolean = false;

  public onChange: any = () => {};
  public onTouched: any = () => {};

  constructor() {}

  @HostListener('click')
  public onClick() {
    if (this.disabled) {
      return;
    }
    this.value = !this.value;
    this.outputValue();
  }

  public writeValue(value: boolean): void {
    this.value = value;
  }

  public outputValue() {
    this.onChange(this.value);
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
