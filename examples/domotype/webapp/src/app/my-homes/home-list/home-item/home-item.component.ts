import { Component, Input, OnInit } from '@angular/core';
import { Home } from '@models/Home';
import { UserService } from '@app/shared/services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { tap, catchError } from 'rxjs/operators';
import { User } from '@app/models/User';
import { Store } from '@ngrx/store';
import { requestAddUserToHome } from '@app/my-homes/store/actions';

@Component({
  selector: 'app-home-item',
  templateUrl: './home-item.component.html',
  styleUrls: ['./home-item.component.scss'],
})
export class HomeItemComponent implements OnInit {
  @Input('home') home: Home;
  public addUserForm: FormGroup;

  constructor(
    protected readonly store: Store,
    protected readonly userService: UserService,
    protected readonly fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      displayName: '',
    });
  }

  public getUserNamesText(): string {
    const names = Object.values(this.home.users).map((user) => user.name);

    if (names.length > 3) {
      names.splice(3, names.length - 3, `${names.length - 3} more`);
    }

    return names.reduce((acc, curr, i) => {
      if (i + 1 === names.length) {
        return `${acc} and ${curr}`;
      }
      return `${acc}, ${curr}`;
    });
  }

  public addUserHandler() {
    const { displayName } = this.addUserForm.value;
    if (displayName.length < 1) {
      return;
    }
    const subscription = this.userService
      .requestUserByDisplayName(displayName)
      .pipe(tap(this.addUser.bind(this)))
      .subscribe((_) => subscription.unsubscribe());
  }

  protected addUser(user: User): void {
    this.store.dispatch(
      requestAddUserToHome({
        homeId: this.home.id,
        userId: user.id,
      }),
    );
  }
}
