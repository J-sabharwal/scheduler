import React from "react";
import { render, cleanup } from "@testing-library/react";
import Application from "components/Application";
import { waitForElement, fireEvent } from "@testing-library/react"

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    
    // waiting for a click event to tuesday's schedule and then checks for Leopold's name in the DOM
    return waitForElement(() => getByText("Monday"))
      .then(() => {
        fireEvent.click(getByText("Tuesday"));
        expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });
})