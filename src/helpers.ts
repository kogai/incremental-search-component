import { Subject } from "rxjs";

export const bindTo = <T>(onAction$: Subject<T>) => (event: T) => onAction$.next(event);

export interface InputEvent {
  target: {
    value: string;
  };
}
