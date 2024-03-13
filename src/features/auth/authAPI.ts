import { requestCreator, TRequest } from "../../classes/API";
import { TUser } from "./authSlice";
import { attachAbortController } from "../../classes/AbortSignal";
const axios = require('axios');

export type TLoginReturn = {
    data: {
        access_token?: string;
        type: string;
        message: string[];
    };
};

export type TShareReturn = {
    data: {
        status: boolean;
    };
};

export type TLoginOption = { email: string; password: string; };
export type TShareOption = { url: string; };

export type TProfileReturn = {
    data: TUser;
};

export type TForgotPasswordReturn = {
    data: {
        email?: string;
        message?: string;
    };
};

export type TResetPasswordOption = {
    token: string;
    password: string;
};

export type TSetPasswordOption = {
    token: string;
    password: string;
};

const _login: TRequest<TLoginReturn, TLoginOption> = requestCreator<TLoginReturn, TLoginOption>(
    (options) => {
        return new Promise((resolve, reject) => {
            const { email, password } = options;
            axios
                .post(`http://localhost:3001/auth/login`, {
                    email,
                    password,
                })
                .then((data: any) => {
                    resolve(data);
                })
                .catch((err: any) => {
                    reject(err.response);
                });
        });
    }
);

const _share: TRequest<TShareReturn, TShareOption> = requestCreator<TShareReturn, TShareOption>(
    (options) => {
        const token = localStorage.getItem("accessToken");
        return new Promise((resolve, reject) => {
            const { url } = options;
            axios
                .post(`http://localhost:3001/movie/share`, {
                    url,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((data: any) => {
                    resolve(data);
                })
                .catch((err: any) => {
                    reject(err.response);
                });
        });
    }
);

const login = attachAbortController<TLoginReturn, TLoginOption>(_login);
const share = attachAbortController<TShareReturn, TShareOption>(_share);

const authAPI = {
    login,
    share,
};

export default authAPI;
