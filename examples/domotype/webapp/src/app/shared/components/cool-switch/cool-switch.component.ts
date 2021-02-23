import {
  Component,
  forwardRef,
  Output,
  EventEmitter,
  Input,
  HostListener,
  HostBinding,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-cool-switch',
  templateUrl: './cool-switch.component.html',
  styleUrls: ['./cool-switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CoolSwitchComponent),
      multi: true,
    },
  ],
})
export class CoolSwitchComponent implements ControlValueAccessor {
  @HostBinding('class.active')
  @Input('value')
  value: boolean;
  @Output() valueChange: EventEmitter<boolean> = new EventEmitter();
  public isDisabled: boolean = false;

  public onChange: any = () => {};
  public onTouched: any = () => {};

  @HostListener('click')
  public onClick() {
    if (this.isDisabled) {
      return;
    }
    this.value = !this.value;
    this.valueChange.emit(this.value);
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
    this.isDisabled = isDisabled;
  }
}
