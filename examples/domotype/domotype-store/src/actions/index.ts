import { ActionTypes as AT } from './types';
import { createIdentificable } from '../identificable';
import { CloneAction }  from './clone.action';
import { AddDeviceAction }  from './add-device.action';
import { RemoveDeviceAction }  from './remove-device.action';
import { PublishDeviceAction }  from './publish-device.action';
import { UnpublishDeviceAction }  from './unpublish-device.action';
import { UpdateDeviceStateAction }  from './update-device-state.action';
import { UpdateDeviceInfoAction }  from './update-device-info.action';
import { AddUserAction }  from './add-user.action';
import { RemoveUserAction }  from './remove-user.action';

type AnyAction = CloneAction
	| AddDeviceAction
	| RemoveDeviceAction
	| PublishDeviceAction
	| UnpublishDeviceAction
	| UpdateDeviceStateAction
	| UpdateDeviceInfoAction
	| AddUserAction
	| RemoveUserAction;

export type Action<T extends AT = AT> = T extends AT.Clone
	? CloneAction
	: T extends AT.AddDevice
	? AddDeviceAction
	: T extends AT.RemoveDevice
	? RemoveDeviceAction
	: T extends AT.PublishDevice
	? PublishDeviceAction
	: T extends AT.UnpublishDevice
	? UnpublishDeviceAction
	: T extends AT.UpdateDeviceState
	? UpdateDeviceStateAction
	: T extends AT.UpdateDeviceInfo
	? UpdateDeviceInfoAction
	: T extends AT.AddUser
	? AddUserAction
	: T extends AT.RemoveUser
	? RemoveUserAction
	: AnyAction;

export const isAction = <T extends AT>(
  obj: any,
  type?: T,
): obj is Action<T> =>
  typeof obj === 'object' &&
  'type' in obj &&
  obj.type in AT &&
  (type === undefined || obj.type === type);

export const createAction = <T extends AT>(type: T) => (
  obj: Omit<Action<T>, 'id' | 'type'>,
): Action<T> =>
  (({
    ...createIdentificable(),
    type,
    ...obj,
  } as unknown) as Action<T>);

export * from './types';