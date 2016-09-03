import { Observable, Subject } from "rxjs";
import { createElement, Component } from "react";
import hh = require("hyperscript-helpers");
import { InputEvent, bindWith, bindWithAction, Action, ACTION_INPUT } from "./helpers";
import { ofType } from "./OfType";

Observable.prototype.ofType = ofType;

const { div, input } = hh(createElement);

export interface IIncrementalSearch {}

interface State {
  value: string;
}

export class IncrementalSearch extends Component<IIncrementalSearch, State> {
  private action$: Subject<any>;
  private input$: Observable<string>;
  private onChange: (event: InputEvent) => void;

  constructor() {
    super();
    this.action$ = new Subject();
    this.input$ = this.createValue$(this.action$);

    this.onChange = bindWithAction(ACTION_INPUT, this.action$);
    this.state = { value: "" };
  }

  private createValue$(action$: Subject<Action<InputEvent>>): Observable<string> {
    return action$
      .ofType<InputEvent>(ACTION_INPUT)
      // .do(console.log)
      .map(({ target }) => target.value)
      ;
  }

  componentWillMount() {
    this.input$.subscribe(value => this.setState({ value }));
  }

  render() {
    const { value } = this.state;
    const onChange = this.onChange.bind(this);

    return div(null, [
      input({
        key: 0,
        value: value,
        onChange,
      })
    ]);
  }
}
