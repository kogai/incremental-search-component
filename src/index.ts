import { Observable, Subject, BehaviorSubject, ReplaySubject } from "rxjs";
import { AjaxObservable, AjaxCreationMethod } from "rxjs/observable/dom/AjaxObservable";
import { createElement, Component } from "react";
import { merge } from "lodash";
import hh = require("hyperscript-helpers");

import { InputEvent, bindWith, bindWithAction, Action, ACTION_INPUT, ACTION_RESULT } from "./helpers";
import "of-type-operator";

const { div, input } = hh(createElement);
const { ajax, combineLatest } = Observable;
const defaultAuditTime = 100;

export interface IIncrementalSearch {
  url: string;
  query: string;
  onSearch: (result: any) => void;
  auditTime?: number;
}

interface State {
  input: string;
  result: any;
}

export class IncrementalSearch extends Component<IIncrementalSearch, State> {
  private action$: Subject<Action<any>>;
  private state$: Observable<State>;
  private onChange: (event: InputEvent) => void;

  constructor() {
    super();
    this.state = {
      input: "",
      result: {},
    };
  }

  private createInput$(action$: Subject<Action<any>>): Observable<string> {
    return action$
      .ofType<InputEvent>(ACTION_INPUT)
      .map(({ target }) => target.value)
      ;
  }

  private createResult$(input$: Observable<string>): Observable<any> {
    const { url, query, auditTime } = this.props;
    return input$
      .filter(input => input.length > 0)
      .auditTime(auditTime ? auditTime : defaultAuditTime)
      .mergeMap(input => ajax.getJSON(`${url}?${query}=${input}`))
      .do(this.props.onSearch)
      ;
  }

  private createState$(action$: Subject<Action<any>>): Observable<State> {
    const input$ = this.createInput$(action$);
    const result$ = this.createResult$(input$);
    return Observable.merge(
      input$.map(input => ({ input })),
      result$.map(result => ({ result }))
    )
    .scan<State>(merge)
    ;
  }

  componentWillMount() {
    this.action$ = new Subject<Action<any>>();
    this.onChange = bindWithAction(ACTION_INPUT, this.action$);
    this.state$ = this.createState$(this.action$);
    this.state$.subscribe(nextState => this.setState(nextState));
  }

  render() {
    const onChange = this.onChange.bind(this);

    return div(null, [
      input({
        key: 0,
        value: this.state.input,
        onChange,
      })
    ]);
  }
}
