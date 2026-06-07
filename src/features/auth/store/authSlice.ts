import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '@config/constants';
import type { RootState } from '@app/store';
import type { AuthResponse, AuthUser } from '../types/auth.types';

interface AuthState {
  token: string | null;
  user: AuthUser | null;
}

function readUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

const initialState: AuthState = {
  token: localStorage.getItem(STORAGE_KEYS.TOKEN),
  user: readUser(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
      localStorage.setItem(STORAGE_KEYS.TOKEN, action.payload.accessToken);
      localStorage.setItem(
        STORAGE_KEYS.USER,
        JSON.stringify(action.payload.user),
      );
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectIsAuthenticated = (state: RootState): boolean =>
  Boolean(state.auth.token);
export const selectAuthUser = (state: RootState): AuthUser | null =>
  state.auth.user;
