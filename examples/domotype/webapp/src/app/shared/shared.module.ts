import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { AddCircleOutlineComponent } from './icons/add-circle-outline/add-circle-outline.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { InputTextMultilineComponent } from './components/input-text-multiline/input-text-multiline.component';
import { DeviceTypeComponent } from './icons/device-type/device-type.component';
import { DeviceTypeSelectorComponent } from './components/device-type-selector/device-type-selector.component';
import { DeviceStateSelectorComponent } from './components/device-state-selector/device-state-selector.component';
import { CoolSwitchComponent } from './components/cool-switch/cool-switch.component';
import { CardComponent } from './components/card/card.component';
import { DevicePublicSelectorComponent } from './components/device-public-selector/device-public-selector.component';
import { DevicePublicComponent } from './icons/device-public/device-public.component';
import { RemoveComponent } from './icons/remove/remove.component';

@NgModule({
  declarations: [
    ButtonComponent,
    AddCircleOutlineComponent,
    InputTextComponent,
    InputTextMultilineComponent,
    DeviceTypeComponent,
    DeviceTypeSelectorComponent,
    DeviceStateSelectorComponent,
    CoolSwitchComponent,
    CardComponent,
    DevicePublicSelectorComponent,
    DevicePublicComponent,
    RemoveComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputTextComponent,
    InputTextMultilineComponent,
    AddCircleOutlineComponent,
    DeviceTypeComponent,
    DeviceTypeSelectorComponent,
    DeviceStateSelectorComponent,
    CardComponent,
    DevicePublicSelectorComponent,
    RemoveComponent,
  ],
})
export class SharedModule {}
