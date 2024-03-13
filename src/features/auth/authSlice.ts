import { CaseReducer, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

const _setToken: CaseReducer<TAuthState, PayloadAction<string | undefined>> = (state, action) => {
    state.token = action.payload;
};

const _setRefreshToken: CaseReducer<TAuthState, PayloadAction<string | undefined>> = (
    state,
    action
) => {
    state.refreshToken = action.payload;
};

const _setProfile: CaseReducer<TAuthState, PayloadAction<TUser | undefined>> = (state, action) => {
    state.user = action.payload;
};

const _logout: CaseReducer<TAuthState> = (state) => {
    state.token = undefined;
    window && window.localStorage.clear();
    state.bAccessTokenExpired = false;
    state.bAdminAct = false;
    state.bFiveMinutesLeft = false;
};

const _setAccessTokenExpired: CaseReducer<TAuthState, PayloadAction<boolean>> = (state, action) => {
    window.localStorage.setItem(LOCAL_STORAGE_KEYS.expired, JSON.stringify(action.payload));
    state.bAccessTokenExpired = action.payload;
};

const login = createAsyncThunk("auth/login", (options: TLoginOption, { rejectWithValue }) => {
    const res = authAPI
        .login(options)
        .then((response) => {
            return {
                ...response.data,
                email: options.email,
            };
        })
        .catch((err) => {
            return rejectWithValue(err.data);
        });
    return res;
});

const share = createAsyncThunk("movie/share", (options: TShareOption, { rejectWithValue }) => {
    const res = authAPI
        .share(options)
        .then((response) => {
            return {
                ...response.data,
            };
        })
        .catch((err) => {
            return rejectWithValue(err.data);
        });
    return res;
});

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
            const accessToken = action.payload.access_token;
            console.log('extraReducers', accessToken)
            state.token = accessToken;
            if (state.user) {
                state.user.email = action.payload.email;
            }
            console.log('extraReducers', state.user)
            window &&
                window.localStorage.setItem(LOCAL_STORAGE_KEYS.accessToken, accessToken || "");
        });
    },
});

export const authActions = authSlice.actions;
export const authAsyncActions = {
    login,
    share,
};

export default authSlice.reducer;
