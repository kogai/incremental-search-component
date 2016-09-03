import { createElement, StatelessComponent } from "react";
import hh = require("hyperscript-helpers");
const { div } = hh(createElement);

export const IncrementalSearch: StatelessComponent<void> = () => {
  return div(".id", null, ["テキストファイル!!!"]);
};

IncrementalSearch.displayName = "IncrementalSearch";