const KEYS = ["accessToken", "refreshToken", "email", "sideBarScrollPosition", "expired"] as const;
export type TLocalStorageKey = (typeof KEYS)[number];
export const LOCAL_STORAGE_KEYS: {
    [key in TLocalStorageKey]: string;
} = {
    accessToken: "accessToken",
    refreshToken: "refreshToken",
    email: "email",
    sideBarScrollPosition: "sideBarScrollPosition",
    expired: "expired",
};
