import { ActionRequestTypes as ART } from '../action-requests';
import { Store } from '../store';
import { cloneValidator }  from './clone.validator';
import { addDeviceValidator }  from './add-device.validator';
import { removeDeviceValidator }  from './remove-device.validator';
import { publishDeviceValidator }  from './publish-device.validator';
import { unpublishDeviceValidator }  from './unpublish-device.validator';
import { updateDeviceStateValidator }  from './update-device-state.validator';
import { updateDeviceInfoValidator }  from './update-device-info.validator';
import { addUserValidator }  from './add-user.validator';
import { removeUserValidator }  from './remove-user.validator';


export const addValidators = function (store: Store) {
	store.createValidator(ART.Clone, cloneValidator);
	store.createValidator(ART.AddDevice, addDeviceValidator);
	store.createValidator(ART.RemoveDevice, removeDeviceValidator);
	store.createValidator(ART.PublishDevice, publishDeviceValidator);
	store.createValidator(ART.UnpublishDevice, unpublishDeviceValidator);
	store.createValidator(ART.UpdateDeviceState, updateDeviceStateValidator);
	store.createValidator(ART.UpdateDeviceInfo, updateDeviceInfoValidator);
	store.createValidator(ART.AddUser, addUserValidator);
	store.createValidator(ART.RemoveUser, removeUserValidator);
}