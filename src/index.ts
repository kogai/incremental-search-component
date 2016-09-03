import { Observable } from "rxjs";
import { createElement, Component } from "react";
import hh = require("hyperscript-helpers");
const { div, input } = hh(createElement);

interface IIncrementalSearch {
}

interface State {
  value: string;
}

interface InputEvent {
  target: {
    value: string;
  };
}

export class IncrementalSearch extends Component<IIncrementalSearch, State> {
  componentWillMount() {
    this.setState({ value: "" });
  }

  _onChange(event: InputEvent) {
    const { value } = event.target;
    this.setState({ value });
  }

  render() {
    const { value } = this.state;
    const onChange = this._onChange.bind(this);

    return div(null, [
      input({
        key: 0,
        value: value,
        onChange,
      })
    ]);
  }
}
