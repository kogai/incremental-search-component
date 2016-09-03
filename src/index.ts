import { Observable, Subject } from "rxjs";
import { createElement, Component } from "react";
import hh = require("hyperscript-helpers");
import { InputEvent, bindTo } from "./helpers";

const { div, input } = hh(createElement);

export interface IIncrementalSearch {}

interface State {
  value: string;
}

export class IncrementalSearch extends Component<IIncrementalSearch, State> {
  private onChange$: Subject<InputEvent>;
  private onChange: (event: InputEvent) => void;

  constructor() {
    super();
    this.onChange$ = new Subject<InputEvent>();
    this.onChange = bindTo(this.onChange$);
    this.state = { value: "" };
  }

  private createValue$(onChange$: Subject<InputEvent>): Observable<string> {
    return onChange$
      .map(({ target }) => target.value);
  }

  componentWillMount() {
    const value$ = this.createValue$(this.onChange$);
    value$.subscribe(value => this.setState({ value }));
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
