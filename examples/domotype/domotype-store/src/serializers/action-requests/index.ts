import {
	DeepReadonly,
	PartiallySharedStoreError
} from 'partially-shared-store';
import { SerializedTypes } from '../types';
import { State } from '../../state';
import {
	ActionRequest,
	ActionRequestTypes as ART,
	isActionRequest
} from '../../action-requests';
import {
	SerializedCloneActionRequest,
	serializeClone,
	deserializeClone,
}  from './clone.serializer';
import {
	SerializedAddDeviceActionRequest,
	serializeAddDevice,
	deserializeAddDevice,
}  from './add-device.serializer';
import {
	SerializedRemoveDeviceActionRequest,
	serializeRemoveDevice,
	deserializeRemoveDevice,
}  from './remove-device.serializer';
import {
	SerializedPublishDeviceActionRequest,
	serializePublishDevice,
	deserializePublishDevice,
}  from './publish-device.serializer';
import {
	SerializedUnpublishDeviceActionRequest,
	serializeUnpublishDevice,
	deserializeUnpublishDevice,
}  from './unpublish-device.serializer';
import {
	SerializedUpdateDeviceStateActionRequest,
	serializeUpdateDeviceState,
	deserializeUpdateDeviceState,
}  from './update-device-state.serializer';
import {
	SerializedUpdateDeviceInfoActionRequest,
	serializeUpdateDeviceInfo,
	deserializeUpdateDeviceInfo,
}  from './update-device-info.serializer';
import {
	SerializedAddUserActionRequest,
	serializeAddUser,
	deserializeAddUser,
}  from './add-user.serializer';
import {
	SerializedRemoveUserActionRequest,
	serializeRemoveUser,
	deserializeRemoveUser,
}  from './remove-user.serializer';

type AnySerializedActionRequest = SerializedCloneActionRequest
	| SerializedAddDeviceActionRequest
	| SerializedRemoveDeviceActionRequest
	| SerializedPublishDeviceActionRequest
	| SerializedUnpublishDeviceActionRequest
	| SerializedUpdateDeviceStateActionRequest
	| SerializedUpdateDeviceInfoActionRequest
	| SerializedAddUserActionRequest
	| SerializedRemoveUserActionRequest;

export type SerializedActionRequest<T extends ART = ART> = T extends ART.Clone
	? SerializedCloneActionRequest
	: T extends ART.AddDevice
	? SerializedAddDeviceActionRequest
	: T extends ART.RemoveDevice
	? SerializedRemoveDeviceActionRequest
	: T extends ART.PublishDevice
	? SerializedPublishDeviceActionRequest
	: T extends ART.UnpublishDevice
	? SerializedUnpublishDeviceActionRequest
	: T extends ART.UpdateDeviceState
	? SerializedUpdateDeviceStateActionRequest
	: T extends ART.UpdateDeviceInfo
	? SerializedUpdateDeviceInfoActionRequest
	: T extends ART.AddUser
	? SerializedAddUserActionRequest
	: T extends ART.RemoveUser
	? SerializedRemoveUserActionRequest
	: AnySerializedActionRequest;

export const isSerializedActionRequest = <T extends ART>(
  obj: any,
  type?: T,
): obj is SerializedActionRequest<T> =>
  Array.isArray(obj) &&
  obj.length > 1 &&
  obj[0] == SerializedTypes.ActionRequest &&
  (type === undefined || obj[1] === type);

export const serializeActionRequest = (state: DeepReadonly<State>) => <T extends ART> (
  actionRequest: DeepReadonly<ActionRequest<T>>
): SerializedActionRequest<T> => {
	if (isActionRequest(actionRequest, ART.Clone)) {
		return serializeClone(state)(actionRequest as ActionRequest<ART.Clone>) as SerializedActionRequest<T>;
	} else if (isActionRequest(actionRequest, ART.AddDevice)) {
		return serializeAddDevice(state)(actionRequest as ActionRequest<ART.AddDevice>) as SerializedActionRequest<T>;
	} else if (isActionRequest(actionRequest, ART.RemoveDevice)) {
		return serializeRemoveDevice(state)(actionRequest as ActionRequest<ART.RemoveDevice>) as SerializedActionRequest<T>;
	} else if (isActionRequest(actionRequest, ART.PublishDevice)) {
		return serializePublishDevice(state)(actionRequest as ActionRequest<ART.PublishDevice>) as SerializedActionRequest<T>;
	} else if (isActionRequest(actionRequest, ART.UnpublishDevice)) {
		return serializeUnpublishDevice(state)(actionRequest as ActionRequest<ART.UnpublishDevice>) as SerializedActionRequest<T>;
	} else if (isActionRequest(actionRequest, ART.UpdateDeviceState)) {
		return serializeUpdateDeviceState(state)(actionRequest as ActionRequest<ART.UpdateDeviceState>) as SerializedActionRequest<T>;
	} else if (isActionRequest(actionRequest, ART.UpdateDeviceInfo)) {
		return serializeUpdateDeviceInfo(state)(actionRequest as ActionRequest<ART.UpdateDeviceInfo>) as SerializedActionRequest<T>;
	} else if (isActionRequest(actionRequest, ART.AddUser)) {
		return serializeAddUser(state)(actionRequest as ActionRequest<ART.AddUser>) as SerializedActionRequest<T>;
	} else if (isActionRequest(actionRequest, ART.RemoveUser)) {
		return serializeRemoveUser(state)(actionRequest as ActionRequest<ART.RemoveUser>) as SerializedActionRequest<T>;
	}
	throw new PartiallySharedStoreError('Serialize Action Request: Unknown type.');
}

export const deserializeActionRequest = (state: DeepReadonly<State>) => <T extends ART> (
  serializedActionRequest: DeepReadonly<SerializedActionRequest<T>>
): ActionRequest<T> => {
	if (isSerializedActionRequest(serializedActionRequest, ART.Clone)) {
		return deserializeClone(state)(serializedActionRequest as SerializedActionRequest<ART.Clone>) as ActionRequest<T>;
	} else if (isSerializedActionRequest(serializedActionRequest, ART.AddDevice)) {
		return deserializeAddDevice(state)(serializedActionRequest as SerializedActionRequest<ART.AddDevice>) as ActionRequest<T>;
	} else if (isSerializedActionRequest(serializedActionRequest, ART.RemoveDevice)) {
		return deserializeRemoveDevice(state)(serializedActionRequest as SerializedActionRequest<ART.RemoveDevice>) as ActionRequest<T>;
	} else if (isSerializedActionRequest(serializedActionRequest, ART.PublishDevice)) {
		return deserializePublishDevice(state)(serializedActionRequest as SerializedActionRequest<ART.PublishDevice>) as ActionRequest<T>;
	} else if (isSerializedActionRequest(serializedActionRequest, ART.UnpublishDevice)) {
		return deserializeUnpublishDevice(state)(serializedActionRequest as SerializedActionRequest<ART.UnpublishDevice>) as ActionRequest<T>;
	} else if (isSerializedActionRequest(serializedActionRequest, ART.UpdateDeviceState)) {
		return deserializeUpdateDeviceState(state)(serializedActionRequest as SerializedActionRequest<ART.UpdateDeviceState>) as ActionRequest<T>;
	} else if (isSerializedActionRequest(serializedActionRequest, ART.UpdateDeviceInfo)) {
		return deserializeUpdateDeviceInfo(state)(serializedActionRequest as SerializedActionRequest<ART.UpdateDeviceInfo>) as ActionRequest<T>;
	} else if (isSerializedActionRequest(serializedActionRequest, ART.AddUser)) {
		return deserializeAddUser(state)(serializedActionRequest as SerializedActionRequest<ART.AddUser>) as ActionRequest<T>;
	} else if (isSerializedActionRequest(serializedActionRequest, ART.RemoveUser)) {
		return deserializeRemoveUser(state)(serializedActionRequest as SerializedActionRequest<ART.RemoveUser>) as ActionRequest<T>;
	}
	throw new PartiallySharedStoreError('Deserialize Action Request: Unknown type.');
}