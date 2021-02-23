import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicePublicSelectorComponent } from './device-public-selector.component';

describe('DevicePublicSelectorComponent', () => {
  let component: DevicePublicSelectorComponent;
  let fixture: ComponentFixture<DevicePublicSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicePublicSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicePublicSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
