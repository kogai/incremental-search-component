import { Subject } from "rxjs";

export interface InputEvent {
  target: {
    value: string;
  };
}

export const ACTION_INPUT = "ACTION_INPUT";
export const ACTION_RESULT = "ACTION_RESULT";

export interface Action<T> {
  type: string;
  payload: T;
}

export const bindWith = <T>(onAction$: Subject<T>) => (event: T) => onAction$.next(event);

export const bindWithAction = <T>(type: string, action$: Subject<Action<T>>) => (payload: T) => action$.next({
  type,
  payload,
});
