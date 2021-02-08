import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHomeItemComponent } from './new-home-item.component';

describe('NewHomeItemComponent', () => {
  let component: NewHomeItemComponent;
  let fixture: ComponentFixture<NewHomeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHomeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHomeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
