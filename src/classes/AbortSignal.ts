import { TRequest } from "./API";

export interface IAbortSignal {
    id: string;
    delegate: () => void;
    abort(): void;
}

export default class AbortSignal implements IAbortSignal {
    static ABORT = "ABORT";
    protected _id = `${AbortSignal.ABORT}-${Date.now()}`;
    protected _delegate: () => void = () => undefined;

    public get id(): string {
        return this._id;
    }

    public set delegate(v: () => void) {
        this._delegate = v;
    }

    abort() {
        this._delegate();
    }
}

/**
 * A request creator `closure`
 * @param fn
 * @returns
 */
export function attachAbortController<R = unknown, O = Record<string, unknown>>(
    fn: TRequest<R, O, IAbortSignal>
): TRequest<R, O, IAbortSignal> {
    const dfAbortSignal = new AbortSignal();
    return (options: O, abortSignal?: IAbortSignal) => {
        abortSignal = abortSignal || dfAbortSignal;
        return fn(options, abortSignal);
    };
}
