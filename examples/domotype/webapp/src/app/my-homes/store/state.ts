import { Home } from '../../models/Home';

export interface HomesState {
  homes: {
    [key: string]: Home;
  };
  loading: boolean;
  error?: string;
}

export const initialHomesState: HomesState = {
  homes: {},
  loading: false,
};

export function getInitialHomesState(): HomesState {
  return initialHomesState;
}
