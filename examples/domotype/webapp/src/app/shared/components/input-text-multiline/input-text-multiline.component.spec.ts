import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextMultilineComponent } from './input-text-multiline.component';

describe('InputTextMultilineComponent', () => {
  let component: InputTextMultilineComponent;
  let fixture: ComponentFixture<InputTextMultilineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputTextMultilineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextMultilineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
