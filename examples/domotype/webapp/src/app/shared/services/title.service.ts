import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  protected titleSource: BehaviorSubject<string> = new BehaviorSubject(
    'DomoType App',
  );
  public title$: Observable<string> = this.titleSource.asObservable();
  protected subscription?: Subscription;

  constructor() {}

  public setTitle(title: string) {
    this.titleSource.next(title);
  }
}
