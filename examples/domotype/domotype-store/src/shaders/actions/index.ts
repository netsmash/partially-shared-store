import {
	DeepReadonly,
	PartiallySharedStoreError
} from 'partially-shared-store';
import { State } from '../../state';
import {
	Action,
	ActionTypes as AT,
	isAction,
} from '../../actions';
import { Identificable } from '../../identificable';
import { shadeClone }  from './clone.shader';
import { shadeAddDevice }  from './add-device.shader';
import { shadeRemoveDevice }  from './remove-device.shader';
import { shadePublishDevice }  from './publish-device.shader';
import { shadeUnpublishDevice }  from './unpublish-device.shader';
import { shadeUpdateDeviceState }  from './update-device-state.shader';
import { shadeUpdateDeviceInfo }  from './update-device-info.shader';
import { shadeAddUser }  from './add-user.shader';
import { shadeRemoveUser }  from './remove-user.shader';

export const shadeAction = (state: DeepReadonly<State>) => (
	to: DeepReadonly<Identificable>
) => <T extends AT> (
  action: Action<T>
): Action<T> => {
	if (isAction(action, AT.Clone)) {
		return shadeClone(state)(to)(action as Action<AT.Clone>) as Action<T>;
	} else if (isAction(action, AT.AddDevice)) {
		return shadeAddDevice(state)(to)(action as Action<AT.AddDevice>) as Action<T>;
	} else if (isAction(action, AT.RemoveDevice)) {
		return shadeRemoveDevice(state)(to)(action as Action<AT.RemoveDevice>) as Action<T>;
	} else if (isAction(action, AT.PublishDevice)) {
		return shadePublishDevice(state)(to)(action as Action<AT.PublishDevice>) as Action<T>;
	} else if (isAction(action, AT.UnpublishDevice)) {
		return shadeUnpublishDevice(state)(to)(action as Action<AT.UnpublishDevice>) as Action<T>;
	} else if (isAction(action, AT.UpdateDeviceState)) {
		return shadeUpdateDeviceState(state)(to)(action as Action<AT.UpdateDeviceState>) as Action<T>;
	} else if (isAction(action, AT.UpdateDeviceInfo)) {
		return shadeUpdateDeviceInfo(state)(to)(action as Action<AT.UpdateDeviceInfo>) as Action<T>;
	} else if (isAction(action, AT.AddUser)) {
		return shadeAddUser(state)(to)(action as Action<AT.AddUser>) as Action<T>;
	} else if (isAction(action, AT.RemoveUser)) {
		return shadeRemoveUser(state)(to)(action as Action<AT.RemoveUser>) as Action<T>;
	}
	return action;
}