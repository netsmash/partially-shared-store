import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Device, DeviceState } from 'domotype-store/models';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HomeStore } from '@app/shared/utils';
import { ActionRequestTypes as ART } from 'domotype-store/action-requests';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-device-list-item',
  templateUrl: './device-list-item.component.html',
  styleUrls: ['./device-list-item.component.scss'],
})
export class DeviceListItemComponent implements OnInit, OnDestroy {
  @Input('homeStore') protected homeStore: HomeStore;
  @Input('device') device: Device;
  public isOwn: boolean = false;
  public deviceForm: FormGroup;
  public devicePublicForm: FormGroup;
  protected formSubscription: Subscription;
  protected formPublicSubscription: Subscription;

  public constructor(private fb: FormBuilder) {}

  public ngOnInit() {
    this.isOwn = this.homeStore.user.id === this.device.owner.id;
    this.deviceForm = this.fb.group({
      state: this.device.state,
    });
    this.formSubscription = this.deviceForm.valueChanges.subscribe(
      (formValue) => this.changeDeviceState(formValue),
    );
    this.devicePublicForm = this.fb.group({
      public: new FormControl({
        value: this.device.public,
        disabled: !this.isOwn,
      }),
    });
    this.formPublicSubscription = this.devicePublicForm.valueChanges.subscribe(
      (formValue) => this.changeDevicePublic(formValue),
    );
  }

  public ngOnDestroy() {
    this.formSubscription.unsubscribe();
    this.formPublicSubscription.unsubscribe();
  }

  public changeDeviceState(formValue: { state: DeviceState }) {
    this.homeStore.request(ART.UpdateDeviceState)({
      ...formValue,
      device: this.device,
    });
  }

  public changeDevicePublic(formValue: { public: boolean }) {
    if (formValue.public) {
      this.homeStore.request(ART.PublishDevice)({
        device: this.device,
      });
    } else {
      this.homeStore.request(ART.UnpublishDevice)({
        device: this.device,
      });
    }
  }

  public removeDevice() {
    this.homeStore.request(ART.RemoveDevice)({
      device: this.device,
    });
  }
}
