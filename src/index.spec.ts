import * as React from "react";
import { ReactElement, ComponentElement, Component, createElement } from "react";
import { render } from "react-dom";
import { fakeServer, spy, SinonFakeServer } from 'sinon';

import { deepEqual } from "assert";
import { IIncrementalSearch, IncrementalSearch } from "./";

const renderDOM = (vDOMInstance: ReactElement<IIncrementalSearch>): HTMLDivElement => {
  const root = document.createElement("div");
  document.body.appendChild(root);
  render(vDOMInstance, root);
  return root;
};

describe("IncrementalSearch", () => {
  let server: SinonFakeServer;
  beforeEach(() => {
    server = fakeServer.create();
  });

  afterEach(() => {
    server.restore();
  });

  it("Should update state with inputed text", (done) => {
    const respose = { foo: "bar" };
    server.respondWith("GET", /test\?query=abc/, JSON.stringify(respose));

    const rootVirtualDOM = createElement(IncrementalSearch, {
      url: "/test",
      query: "query",
      onSearch: (result: any) => {
        deepEqual(result, respose);
        done();
      },
    });
    const root = renderDOM(rootVirtualDOM);
    const input = root.querySelector("input") as HTMLInputElement;
    const onInput = new Event("input", { bubbles: true });

    deepEqual(root.querySelector("input").value, "");

    input.value = "abc";
    input.dispatchEvent(onInput);
    setTimeout(server.respond.bind(server), 100);
    deepEqual(root.querySelector("input").value, "abc");
  });
});