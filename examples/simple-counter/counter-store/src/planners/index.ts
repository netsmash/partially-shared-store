import { RequestTypes as RT } from '../action-requests';
import { Store } from '../store';
import { clonePlanner } from './clone.planner';
import { incrementPlanner } from './increment.planner';
import { decrementPlanner } from './decrement.planner';

export const addPlanners = function (store: Store) {
  store.createPlanner(RT.Clone, clonePlanner);
  store.createPlanner(RT.Increment, incrementPlanner);
  store.createPlanner(RT.Decrement, decrementPlanner);
};
