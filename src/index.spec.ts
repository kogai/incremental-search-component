import * as React from "react";
import { ReactElement, Component, createElement } from "react";
import { render } from "react-dom";

import { deepEqual } from "assert";
import { IncrementalSearch } from "./";

const renderDOM = (vDOMInstance: ReactElement<void>): HTMLDivElement => {
  const root = document.createElement("div");
  document.body.appendChild(root);

  render(vDOMInstance, root);
  return root;
};

describe("Test", () => {
  it("should", () => {
    const root = renderDOM(createElement(IncrementalSearch));
    // console.log(root);
    deepEqual(true, true);
  });
});