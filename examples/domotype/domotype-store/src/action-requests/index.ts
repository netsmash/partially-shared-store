import { ActionRequestTypes as ART } from './types';
import { createIdentificable } from '../identificable';
import { CloneActionRequest }  from './clone.action-request';
import { AddDeviceActionRequest }  from './add-device.action-request';
import { RemoveDeviceActionRequest }  from './remove-device.action-request';
import { PublishDeviceActionRequest }  from './publish-device.action-request';
import { UnpublishDeviceActionRequest }  from './unpublish-device.action-request';
import { UpdateDeviceStateActionRequest }  from './update-device-state.action-request';
import { UpdateDeviceInfoActionRequest }  from './update-device-info.action-request';
import { AddUserActionRequest }  from './add-user.action-request';
import { RemoveUserActionRequest }  from './remove-user.action-request';

type AnyActionRequest = CloneActionRequest
	| AddDeviceActionRequest
	| RemoveDeviceActionRequest
	| PublishDeviceActionRequest
	| UnpublishDeviceActionRequest
	| UpdateDeviceStateActionRequest
	| UpdateDeviceInfoActionRequest
	| AddUserActionRequest
	| RemoveUserActionRequest;

export type ActionRequest<T extends ART = ART> = T extends ART.Clone
	? CloneActionRequest
	: T extends ART.AddDevice
	? AddDeviceActionRequest
	: T extends ART.RemoveDevice
	? RemoveDeviceActionRequest
	: T extends ART.PublishDevice
	? PublishDeviceActionRequest
	: T extends ART.UnpublishDevice
	? UnpublishDeviceActionRequest
	: T extends ART.UpdateDeviceState
	? UpdateDeviceStateActionRequest
	: T extends ART.UpdateDeviceInfo
	? UpdateDeviceInfoActionRequest
	: T extends ART.AddUser
	? AddUserActionRequest
	: T extends ART.RemoveUser
	? RemoveUserActionRequest
	: AnyActionRequest;

export const isActionRequest = <T extends ART>(
  obj: any,
  type?: T,
): obj is ActionRequest<T> =>
  typeof obj === 'object' &&
  'type' in obj &&
  obj.type in ART &&
  (type === undefined || obj.type === type);

export const createActionRequest = <T extends ART>(type: T) => (
  obj: Omit<ActionRequest<T>, 'id' | 'type'>,
): ActionRequest<T> =>
  (({
    ...createIdentificable(),
    type,
    ...obj,
  } as unknown) as ActionRequest<T>);

export * from './types';