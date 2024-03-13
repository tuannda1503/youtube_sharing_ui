import { IAbortSignal } from "./AbortSignal";

export type TActionStage = "pending" | "fulfilled" | "rejected";

export type TError = {
    status: number;
    code?: string;
    message?: string;
};

/**
 * `R`: Return type of the request.
 * `O`: Option type object of the request.
 * `A`: Abort signal type of the request.
 *
 */
export type TRequest<R = unknown, O = Record<string, unknown>, A = IAbortSignal> = (
    options: O,
    abortSignal?: A
) => Promise<R>;

/**
 *
 * @param fn: Domain function of the request.
 * @returns
 */
export function requestCreator<R, O>(fn: (options: O) => Promise<R>): TRequest<R, O> {
    return (options, abortSignal?) => {
        return new Promise((resolve, reject) => {
            abortSignal?.abort();
            const delay = (options as Record<string, unknown>).delay;
            if (!delay || typeof delay !== "number") {
                resolve(fn(options));
                return;
            }
            const timer = setTimeout(() => {
                resolve(fn(options));
            }, delay);

            if (!abortSignal) return;
            abortSignal.delegate = () => {
                clearTimeout(timer);
                reject(abortSignal.id);
            };
        });
    };
}
