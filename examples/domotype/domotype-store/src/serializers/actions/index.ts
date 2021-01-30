import {
	DeepReadonly,
	PartiallySharedStoreError
} from 'partially-shared-store';
import { SerializedTypes } from '../types';
import { State } from '../../state';
import {
	Action,
	ActionTypes as AT,
	isAction,
} from '../../actions';
import {
	SerializedCloneAction,
	serializeClone,
	deserializeClone,
}  from './clone.serializer';
import {
	SerializedAddDeviceAction,
	serializeAddDevice,
	deserializeAddDevice,
}  from './add-device.serializer';
import {
	SerializedRemoveDeviceAction,
	serializeRemoveDevice,
	deserializeRemoveDevice,
}  from './remove-device.serializer';
import {
	SerializedPublishDeviceAction,
	serializePublishDevice,
	deserializePublishDevice,
}  from './publish-device.serializer';
import {
	SerializedUnpublishDeviceAction,
	serializeUnpublishDevice,
	deserializeUnpublishDevice,
}  from './unpublish-device.serializer';
import {
	SerializedUpdateDeviceStateAction,
	serializeUpdateDeviceState,
	deserializeUpdateDeviceState,
}  from './update-device-state.serializer';
import {
	SerializedUpdateDeviceInfoAction,
	serializeUpdateDeviceInfo,
	deserializeUpdateDeviceInfo,
}  from './update-device-info.serializer';
import {
	SerializedAddUserAction,
	serializeAddUser,
	deserializeAddUser,
}  from './add-user.serializer';
import {
	SerializedRemoveUserAction,
	serializeRemoveUser,
	deserializeRemoveUser,
}  from './remove-user.serializer';

type AnySerializedAction = SerializedCloneAction
	| SerializedAddDeviceAction
	| SerializedRemoveDeviceAction
	| SerializedPublishDeviceAction
	| SerializedUnpublishDeviceAction
	| SerializedUpdateDeviceStateAction
	| SerializedUpdateDeviceInfoAction
	| SerializedAddUserAction
	| SerializedRemoveUserAction;

export type SerializedAction<T extends AT = AT> = T extends AT.Clone
	? SerializedCloneAction
	: T extends AT.AddDevice
	? SerializedAddDeviceAction
	: T extends AT.RemoveDevice
	? SerializedRemoveDeviceAction
	: T extends AT.PublishDevice
	? SerializedPublishDeviceAction
	: T extends AT.UnpublishDevice
	? SerializedUnpublishDeviceAction
	: T extends AT.UpdateDeviceState
	? SerializedUpdateDeviceStateAction
	: T extends AT.UpdateDeviceInfo
	? SerializedUpdateDeviceInfoAction
	: T extends AT.AddUser
	? SerializedAddUserAction
	: T extends AT.RemoveUser
	? SerializedRemoveUserAction
	: AnySerializedAction;

export const isSerializedAction = <T extends AT>(
  obj: any,
  type?: T,
): obj is SerializedAction<T> =>
  Array.isArray(obj) &&
  obj.length > 1 &&
  obj[0] == SerializedTypes.Action &&
  (type === undefined || obj[1] === type);

export const serializeAction = (state: DeepReadonly<State>) => <T extends AT> (
  action: DeepReadonly<Action<T>>
): SerializedAction<T> => {
	if ( isAction(action, AT.Clone) ) {
		return serializeClone(state)(action as Action<AT.Clone>) as SerializedAction<T>;
	} else if ( isAction(action, AT.AddDevice) ) {
		return serializeAddDevice(state)(action as Action<AT.AddDevice>) as SerializedAction<T>;
	} else if ( isAction(action, AT.RemoveDevice) ) {
		return serializeRemoveDevice(state)(action as Action<AT.RemoveDevice>) as SerializedAction<T>;
	} else if ( isAction(action, AT.PublishDevice) ) {
		return serializePublishDevice(state)(action as Action<AT.PublishDevice>) as SerializedAction<T>;
	} else if ( isAction(action, AT.UnpublishDevice) ) {
		return serializeUnpublishDevice(state)(action as Action<AT.UnpublishDevice>) as SerializedAction<T>;
	} else if ( isAction(action, AT.UpdateDeviceState) ) {
		return serializeUpdateDeviceState(state)(action as Action<AT.UpdateDeviceState>) as SerializedAction<T>;
	} else if ( isAction(action, AT.UpdateDeviceInfo) ) {
		return serializeUpdateDeviceInfo(state)(action as Action<AT.UpdateDeviceInfo>) as SerializedAction<T>;
	} else if ( isAction(action, AT.AddUser) ) {
		return serializeAddUser(state)(action as Action<AT.AddUser>) as SerializedAction<T>;
	} else if ( isAction(action, AT.RemoveUser) ) {
		return serializeRemoveUser(state)(action as Action<AT.RemoveUser>) as SerializedAction<T>;
	}
	throw new PartiallySharedStoreError('Serialize Action: Unknown type.');
}

export const deserializeAction = (state: DeepReadonly<State>) => <T extends AT> (
  serializedAction: DeepReadonly<SerializedAction<T>>
): Action<T> => {
	if (isSerializedAction(serializedAction, AT.Clone)) {
		return deserializeClone(state)(serializedAction as SerializedAction<AT.Clone>) as Action<T>;
	} else if (isSerializedAction(serializedAction, AT.AddDevice)) {
		return deserializeAddDevice(state)(serializedAction as SerializedAction<AT.AddDevice>) as Action<T>;
	} else if (isSerializedAction(serializedAction, AT.RemoveDevice)) {
		return deserializeRemoveDevice(state)(serializedAction as SerializedAction<AT.RemoveDevice>) as Action<T>;
	} else if (isSerializedAction(serializedAction, AT.PublishDevice)) {
		return deserializePublishDevice(state)(serializedAction as SerializedAction<AT.PublishDevice>) as Action<T>;
	} else if (isSerializedAction(serializedAction, AT.UnpublishDevice)) {
		return deserializeUnpublishDevice(state)(serializedAction as SerializedAction<AT.UnpublishDevice>) as Action<T>;
	} else if (isSerializedAction(serializedAction, AT.UpdateDeviceState)) {
		return deserializeUpdateDeviceState(state)(serializedAction as SerializedAction<AT.UpdateDeviceState>) as Action<T>;
	} else if (isSerializedAction(serializedAction, AT.UpdateDeviceInfo)) {
		return deserializeUpdateDeviceInfo(state)(serializedAction as SerializedAction<AT.UpdateDeviceInfo>) as Action<T>;
	} else if (isSerializedAction(serializedAction, AT.AddUser)) {
		return deserializeAddUser(state)(serializedAction as SerializedAction<AT.AddUser>) as Action<T>;
	} else if (isSerializedAction(serializedAction, AT.RemoveUser)) {
		return deserializeRemoveUser(state)(serializedAction as SerializedAction<AT.RemoveUser>) as Action<T>;
	}
	throw new PartiallySharedStoreError('Deserialize Action: Unknown type.');
}