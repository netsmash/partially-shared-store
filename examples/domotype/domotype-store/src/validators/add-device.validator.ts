import { DeepReadonly } from 'partially-shared-store';
import { State } from '../state';
import { ActionRequest, ActionRequestTypes as ART } from '../action-requests';
import { isDeviceInfoValid, isDeviceStateTypeConsistent } from './utils';

export const addDeviceValidator = (
  state: DeepReadonly<State>,
  request: ActionRequest<ART.AddDevice>,
): void => {
  isDeviceStateTypeConsistent(request.deviceType)(request.state);
  isDeviceInfoValid(state)(request.info);
};
