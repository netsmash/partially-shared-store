import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCircleOutlineComponent } from './add-circle-outline.component';

describe('AddCircleOutlineComponent', () => {
  let component: AddCircleOutlineComponent;
  let fixture: ComponentFixture<AddCircleOutlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCircleOutlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCircleOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
