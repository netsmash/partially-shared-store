import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicePublicComponent } from './device-public.component';

describe('DevicePublicComponent', () => {
  let component: DevicePublicComponent;
  let fixture: ComponentFixture<DevicePublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicePublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
