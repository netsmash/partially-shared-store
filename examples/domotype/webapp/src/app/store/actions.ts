import { createAction, props } from '@ngrx/store';

export enum AppActionTypes {
  StartApp = '[App] Start app',
}

export const startApp = createAction(AppActionTypes.StartApp);
