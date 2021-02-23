import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceStateSelectorComponent } from './device-state-selector.component';

describe('DeviceStateSelectorComponent', () => {
  let component: DeviceStateSelectorComponent;
  let fixture: ComponentFixture<DeviceStateSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceStateSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceStateSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
