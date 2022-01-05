import { MockedProvider } from "@apollo/react-testing";
import { render, screen } from "@testing-library/react";
import React from "react";
import CategoryContainer from "../src/components/Category/CategoryContainer";
import { CategoriesQuery } from "../src/generated/graphql";

describe("Category Container", () => {
  it("renders category containers", () => {
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
        <CategoryContainer data={data} isEditable={false} />
      </MockedProvider>
    );

    expect(screen.getByText("Human Resources")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
  });
});
