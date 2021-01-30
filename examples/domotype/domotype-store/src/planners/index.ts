import { ActionRequestTypes as ART } from '../action-requests';
import { Store } from '../store';
import { clonePlanner }  from './clone.planner';
import { addDevicePlanner }  from './add-device.planner';
import { removeDevicePlanner }  from './remove-device.planner';
import { publishDevicePlanner }  from './publish-device.planner';
import { unpublishDevicePlanner }  from './unpublish-device.planner';
import { updateDeviceStatePlanner }  from './update-device-state.planner';
import { updateDeviceInfoPlanner }  from './update-device-info.planner';
import { addUserPlanner }  from './add-user.planner';
import { removeUserPlanner }  from './remove-user.planner';


export const addPlanners = function (store: Store) {
	store.createPlanner(ART.Clone, clonePlanner);
	store.createPlanner(ART.AddDevice, addDevicePlanner);
	store.createPlanner(ART.RemoveDevice, removeDevicePlanner);
	store.createPlanner(ART.PublishDevice, publishDevicePlanner);
	store.createPlanner(ART.UnpublishDevice, unpublishDevicePlanner);
	store.createPlanner(ART.UpdateDeviceState, updateDeviceStatePlanner);
	store.createPlanner(ART.UpdateDeviceInfo, updateDeviceInfoPlanner);
	store.createPlanner(ART.AddUser, addUserPlanner);
	store.createPlanner(ART.RemoveUser, removeUserPlanner);
}