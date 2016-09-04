import * as React from "react";
import { ReactElement, ComponentElement, Component, createElement } from "react";
import { render } from "react-dom";

import { deepEqual } from "assert";
import { IIncrementalSearch, IncrementalSearch } from "./";

const renderDOM = (vDOMInstance: ReactElement<IIncrementalSearch>): HTMLDivElement => {
  const root = document.createElement("div");
  document.body.appendChild(root);
  render(vDOMInstance, root);
  return root;
};

describe("IncrementalSearch", () => {
  it("Should update state with inputed text", () => {
    const rootVirtualDOM = createElement(IncrementalSearch, {
      url: "https://api.github.com/search/repositories",
      query: "q",
      onSearch: (result: any) => console.log(result),
    });
    const root = renderDOM(rootVirtualDOM);
    const input = root.querySelector("input") as HTMLInputElement;
    const onInput = new Event("input", { bubbles: true });

    deepEqual(root.querySelector("input").value, "");

    input.value = "abc";
    input.dispatchEvent(onInput);
    deepEqual(root.querySelector("input").value, "abc");
  });
});