import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoolSwitchComponent } from './cool-switch.component';

describe('CoolSwitchComponent', () => {
  let component: CoolSwitchComponent;
  let fixture: ComponentFixture<CoolSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoolSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoolSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
