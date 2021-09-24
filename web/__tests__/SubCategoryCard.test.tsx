import React from "react";
import { render, screen } from "@testing-library/react";
import SubCategoryCard from "../src/components/SubCategoryCard";

describe("Sub Category Card", () => {
  it("renders the title card", () => {
    const mockObject = {
      name: "Testing",
      description: "aaaa",
      id: 12,
      bgColor: "#fff",
      textColor: "#000",
      employees: [],
      catChildren: [],
    };
    const mockFunction = () => {};
    render(
      <SubCategoryCard subCategory={mockObject} zoomFunction={mockFunction} />
    );

    const heading = screen.getByRole("heading", {
      name: "Testing",
    });

    expect(heading).toBeInTheDocument();
  });
});
