import { User } from '../../models/User';

export interface AuthState {
  user?: User;
  loading: boolean;
  error?: string;
}

export const initialAuthState: AuthState = {
  loading: false,
};

export function getInitialAuthState(): AuthState {
  return initialAuthState;
}
