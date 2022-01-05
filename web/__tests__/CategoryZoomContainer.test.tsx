import { MockedProvider } from "@apollo/react-testing";
import { render, screen } from "@testing-library/react";
import React from "react";
import CategoryZoomContainer from "../src/components/Category/CategoryZoomContainer";
import { CategoriesQuery } from "../src/generated/graphql";

describe("Category Zoom Container", () => {
  it("renders category zoom container", () => {
    const data: CategoriesQuery = {
      categories: [
        {
          __typename: "Category",
          name: "Human Resources",
          description: "human resources sector",
          id: 1,
          employees: [],
        },
        {
          __typename: "Category",
          name: "Products",
          description: "prodcuts sector",
          id: 1,
          employees: [],
        },
      ],
    };
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CategoryZoomContainer data={data} loading={false} isEditable={false} />
      </MockedProvider>
    );

    expect(screen.getByText("Human Resources")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
  });
});
