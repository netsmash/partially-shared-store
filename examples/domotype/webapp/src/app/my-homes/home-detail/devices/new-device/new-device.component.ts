import { Component, OnInit, Input } from '@angular/core';
import { HomeStore } from '@app/shared/utils';
import { ActionRequestTypes as ART } from 'domotype-store/action-requests';
import { DeviceType } from 'domotype-store/models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-device',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.scss'],
})
export class NewDeviceComponent implements OnInit {
  @Input('homeStore') protected homeStore: HomeStore;
  public deviceForm: FormGroup = this.fb.group({
    deviceType: [DeviceType.Bulb],
    state: {
      on: true,
      intensity: 100,
    },
    info: this.fb.group({
      name: ['New Device'],
      description: [''],
    }),
  });

  public constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  public createDevice() {
    this.homeStore.request(ART.AddDevice)(this.deviceForm.value);
    this.deviceForm.reset({
      deviceType: [DeviceType.Bulb],
      state: {
        on: true,
        intensity: 100,
      },
      info: this.fb.group({
        name: ['New Device'],
        description: [''],
      }),
    });
  }
}
