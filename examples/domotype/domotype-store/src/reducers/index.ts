import { ActionTypes as AT } from '../actions';
import { Store } from '../store';
import { cloneReducer }  from './clone.reducer';
import { addDeviceReducer }  from './add-device.reducer';
import { removeDeviceReducer }  from './remove-device.reducer';
import { publishDeviceReducer }  from './publish-device.reducer';
import { unpublishDeviceReducer }  from './unpublish-device.reducer';
import { updateDeviceStateReducer }  from './update-device-state.reducer';
import { updateDeviceInfoReducer }  from './update-device-info.reducer';
import { addUserReducer }  from './add-user.reducer';
import { removeUserReducer }  from './remove-user.reducer';


export const addReducers = function (store: Store) {
	store.createReducer(AT.Clone, cloneReducer);
	store.createReducer(AT.AddDevice, addDeviceReducer);
	store.createReducer(AT.RemoveDevice, removeDeviceReducer);
	store.createReducer(AT.PublishDevice, publishDeviceReducer);
	store.createReducer(AT.UnpublishDevice, unpublishDeviceReducer);
	store.createReducer(AT.UpdateDeviceState, updateDeviceStateReducer);
	store.createReducer(AT.UpdateDeviceInfo, updateDeviceInfoReducer);
	store.createReducer(AT.AddUser, addUserReducer);
	store.createReducer(AT.RemoveUser, removeUserReducer);
}