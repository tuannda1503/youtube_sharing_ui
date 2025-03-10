import {
  CaseReducer,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { TActionStage } from "../../classes/API";
import { LOCAL_STORAGE_KEYS } from "../../classes/Storage";
import authAPI, { TLoginOption, TShareOption } from "./authAPI";

export type TUser = {
  id?: number;
  email: string;
  password?: string | null;
};

export type TLoginError = {
  username?: string;
  password?: string;
  type?: string;
};

export type TAuthState = {
  bLogging?: TActionStage;
  token?: string;
  refreshToken?: string;
  user?: TUser;
  loginError?: TLoginError;

  bLoadingResetPassword?: TActionStage;
  bResetPasswordTokenExpired?: boolean;

  bLoadingSetPassword?: TActionStage;
  bSetPasswordTokenExpired?: boolean;

  bLoadingRefreshToken?: TActionStage;
  bAccessTokenExpired?: boolean;

  bAdminAct?: boolean;
  bFiveMinutesLeft?: boolean;
};

const initialState: TAuthState = {};

const _setToken: CaseReducer<TAuthState, PayloadAction<string | undefined>> = (
  state,
  action
) => {
  state.token = action.payload;
};

const _setRefreshToken: CaseReducer<
  TAuthState,
  PayloadAction<string | undefined>
> = (state, action) => {
  state.refreshToken = action.payload;
};

const _setProfile: CaseReducer<TAuthState, PayloadAction<TUser | undefined>> = (
  state,
  action
) => {
  state.user = action.payload;
};

const _logout: CaseReducer<TAuthState> = (state) => {
  state.token = undefined;
  state.user = undefined;
  window && window.localStorage.clear();
  state.bAccessTokenExpired = false;
  state.bAdminAct = false;
  state.bFiveMinutesLeft = false;
};

const _setAccessTokenExpired: CaseReducer<
  TAuthState,
  PayloadAction<boolean>
> = (state, action) => {
  window.localStorage.setItem(
    LOCAL_STORAGE_KEYS.expired,
    JSON.stringify(action.payload)
  );
  state.bAccessTokenExpired = action.payload;
};

const login = createAsyncThunk(
  "auth/sign-in",
  async (options: TLoginOption, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(options);
      return {
        ...response.data,
        email: options.email,
      };
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

const share = createAsyncThunk(
  "movie/share",
  async (options: TShareOption, { rejectWithValue }) => {
    try {
      const res = await authAPI.share(options);
      return res;
    } catch (err) {
      console.error("Error in share action:", err);
      return rejectWithValue(err.data);
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setToken: _setToken,
    setRefreshToken: _setRefreshToken,
    logout: _logout,
    setProfile: _setProfile,
    setAccessTokenExpired: _setAccessTokenExpired,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.bLogging = "pending";
      state.loginError = undefined;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.bLogging = "fulfilled";
      state.token = action.payload.access_token;
      state.user = { email: action.payload.email };
      window.localStorage.setItem(
        LOCAL_STORAGE_KEYS.accessToken,
        state.token || ""
      );
      window.localStorage.setItem(
        LOCAL_STORAGE_KEYS.email,
        action.payload.email || ""
      );
    });
    builder.addCase(login.rejected, (state, action) => {
      state.bLogging = "rejected";
      state.loginError = action.payload;
    });
  },
});

export const authActions = authSlice.actions;
export const authAsyncActions = {
  login,
  share,
};

export default authSlice.reducer;
