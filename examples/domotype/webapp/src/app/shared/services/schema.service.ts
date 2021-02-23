import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchemaService {
  protected titleSource: BehaviorSubject<string> = new BehaviorSubject(
    'Contents',
  );
  public title$: Observable<string> = this.titleSource.asObservable();
  protected itemsSource: BehaviorSubject<string[]> = new BehaviorSubject([]);
  public items$: Observable<string[]> = this.itemsSource.asObservable();
  protected subscriptions?: Subscription[];

  constructor() {}

  public setTitle(title: string) {
    this.titleSource.next(title);
  }

  public setItems(items: string[]) {
    this.itemsSource.next(items);
  }
}
