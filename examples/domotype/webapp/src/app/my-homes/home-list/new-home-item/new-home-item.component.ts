import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { requestNewHome } from '@app/my-homes/store/actions';

@Component({
  selector: 'app-new-home-item',
  templateUrl: './new-home-item.component.html',
  styleUrls: ['./new-home-item.component.scss'],
})
export class NewHomeItemComponent implements OnInit {
  public homeForm: FormGroup = this.fb.group({
    name: ['New home name'],
  });

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.homeForm = this.fb.group({
      name: ['New home name'],
    });
  }

  createHome(): void {
    this.store.dispatch(requestNewHome({ data: this.homeForm.value }));
  }
}
