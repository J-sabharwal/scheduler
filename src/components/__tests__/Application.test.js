import React from "react";
import { getByText, getAllByText } from "@testing-library/react"
import { render, cleanup } from "@testing-library/react";
import Application from "components/Application";
import { waitForElement, fireEvent, prettyDOM, getAllByTestId, getByLabelText, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react"

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

  it("loads data, books an inyerview and reduces the spots for the first day by 1", async() => {

    const { container} = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
        target: { value: "Lydia Miller-Jones" }
      });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    })
})