import {
  Component,
  forwardRef,
  ViewChild,
  ElementRef,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
})
export class InputTextComponent implements ControlValueAccessor {
  @Input('label') label?: string;
  @ViewChild('input', { static: true, read: ElementRef })
  inputElementRef: ElementRef<HTMLInputElement>;
  public onChange: any = () => {};
  public onTouched: any = () => {};

  constructor() {}

  public writeValue(value: string): void {
    this.inputElementRef.nativeElement.value = value;
  }

  public outputValue() {
    const value = this.inputElementRef.nativeElement.value;
    this.onChange(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.inputElementRef.nativeElement.disabled = isDisabled;
  }
}