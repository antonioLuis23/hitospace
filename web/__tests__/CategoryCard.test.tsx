import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CategoryCard from "../src/components/Category/CategoryCard";
import { CategoriesQuery } from "../src/generated/graphql";

describe("Category Card", () => {
  it("renders simple category card", () => {
    const mockObject = {
      name: "Testing",
      description: "aaaa",
      id: 12,
      employees: [],
      catChildren: [],
    };
    const mockFunction = () => {};
    render(<CategoryCard cat={mockObject} isEditable={false} />);

    const heading = screen.getByRole("heading", {
      name: "Testing",
    });

    expect(heading).toBeInTheDocument();
  });

  it("renders with subcategory", async () => {
    const mockObject = {
      name: "Testing",
      description: "aaaa",
      id: 12,
      employees: [],
      catChildren: [
        {
          __typename: "Category",
          name: "subcategory",
          description: "teste",
          id: 1,
          employees: [],
        },
      ],
    } as CategoriesQuery["categories"][0];
    render(<CategoryCard cat={mockObject} isEditable={false} />);
    const heading = screen.getByText(/Testing/i);
    fireEvent.click(heading);
    expect(screen.getByText(/subcategory/i)).toBeInTheDocument();
  });

  it("renders with people", async () => {
    const mockObject = {
      name: "Testing",
      description: "aaaa",
      id: 12,
      employees: [
        {
          __typename: "Employee",
          function: "Desenvolvedor",
          id: 2,
          name: "Antonio",
        },
      ],
      catChildren: [
        {
          __typename: "Category",
          name: "subcategory",
          description: "teste",
          id: 1,
          employees: [],
        },
      ],
    } as CategoriesQuery["categories"][0];
    render(<CategoryCard cat={mockObject} isEditable={false} />);
    const heading = screen.getByText(/Testing/i);
    fireEvent.click(heading);
    expect(screen.getByText(/Antonio/i)).toBeInTheDocument();
  });

  it("renders with people on subcategory", async () => {
    const mockObject = {
      name: "Testing",
      description: "aaaa",
      id: 12,
      employees: [],
      catChildren: [
        {
          __typename: "Category",
          name: "subcategory",
          description: "teste",
          id: 1,
          employees: [
            {
              __typename: "Employee",
              function: "Desenvolvedor",
              id: 2,
              name: "Antonio",
            },
          ],
        },
      ],
    } as CategoriesQuery["categories"][0];
    render(<CategoryCard cat={mockObject} isEditable={false} />);
    const heading = screen.getByText(/Testing/i);
    fireEvent.click(heading);
    const subcategory = screen.getByText(/subcategory/i);
    fireEvent.click(subcategory);
    expect(screen.getByText(/Antonio/i)).toBeInTheDocument();
  });

  it("renders in edit mode", async () => {
    const mockObject = {
      name: "Testing",
      description: "aaaa",
      id: 12,
      employees: [],
      catChildren: [],
    };
    render(<CategoryCard cat={mockObject} isEditable={true} />);

    const heading = screen.getByText(/Testing/i);
    fireEvent.click(heading);
    const iconSvg = document.querySelector("svg");
    expect(iconSvg).toBeInTheDocument();
  });
});
