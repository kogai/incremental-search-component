import { Subscriber, Observable, Operator } from "rxjs";

export interface Action<T> {
  type: string;
  payload: T;
}

export function ofType<T>(actionType: string): Observable<T> {
  return this.lift(new OfTypeOperator(actionType));
}

export interface OfTypeSignature<T> {
  <T>(actionType: string): Observable<T>;
}

export class OfTypeOperator<R> implements Operator<void, R> {
  constructor(private actionType: string) {}
  call(subscriber: Subscriber<R>, source: any): any {
    return source._subscribe(new OfTypeSubscriber(subscriber, this.actionType));
  }
}

export class OfTypeSubscriber<T, A extends Action<T>> extends Subscriber<T> {
  constructor(destination: Subscriber<T>, private actionType: string) {
    super(destination);
  }

  protected _next(value: A) {
    if (value.type === this.actionType) {
      this.destination.next(value.payload);
    }
  }
}

// interface Observable<T> {
//   ofType: OfTypeSignature<T>;
// }

// Observable.prototype.ofType = ofType;