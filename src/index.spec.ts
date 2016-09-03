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

describe("IncrementalSearch", () => {
  it("Should update state with inputed text", () => {
    const root = renderDOM(createElement(IncrementalSearch));
    const input = root.querySelector("input") as HTMLInputElement;
    const onInput = new Event("input", { bubbles: true });

    input.value = "abc";
    input.dispatchEvent(onInput);

    deepEqual(root.querySelector("input").value, "abc");
  });
});