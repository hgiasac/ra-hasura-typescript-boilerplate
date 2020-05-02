/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import * as React from "react";
import { mount } from "cypress-react-unit-test";
import * as ra from "react-admin";
import Login from "../../../../src/shared/components/Auth/Login";

const TestContext = (ra as any).TestContext;

describe("HelloWorld component", () => {
  it("works", () => {
    mount(
      <TestContext enableReducers>
        <Login />
      </TestContext>
    );

    cy.get("input[name=username]").should("be.visible");
    cy.get("input[name=password]").should("be.visible");
  });
});
