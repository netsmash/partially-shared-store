import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTypeSelectorComponent } from './device-type-selector.component';

describe('DeviceTypeSelectorComponent', () => {
  let component: DeviceTypeSelectorComponent;
  let fixture: ComponentFixture<DeviceTypeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceTypeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
