import { MockedProvider } from "@apollo/react-testing";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import CategoryCard from "../src/components/Category/CategoryCard";
import {
  CategoriesQuery,
  DeleteCategoryDocument,
} from "../src/generated/graphql";

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
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CategoryCard cat={mockObject} isEditable={false} />
      </MockedProvider>
    );

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
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CategoryCard cat={mockObject} isEditable={false} />
      </MockedProvider>
    );
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
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CategoryCard cat={mockObject} isEditable={false} />
      </MockedProvider>
    );
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
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CategoryCard cat={mockObject} isEditable={false} />
      </MockedProvider>
    );
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
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CategoryCard cat={mockObject} isEditable={true} />
      </MockedProvider>
    );

    const heading = screen.getByText(/Testing/i);
    fireEvent.click(heading);
    const iconSvg = document.querySelector("svg");
    expect(iconSvg).toBeInTheDocument();
  });

  it("renders category options", async () => {
    const mockObject = {
      name: "Testing",
      description: "aaaa",
      id: 12,
      employees: [],
      catChildren: [],
    };
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CategoryCard cat={mockObject} isEditable={true} />
      </MockedProvider>
    );

    const options = screen.getByTestId("options-category");
    fireEvent.click(options);
    expect(screen.getByText(/Excluir/i)).toBeInTheDocument();
    expect(screen.getByText(/Editar/i)).toBeInTheDocument();
    expect(screen.getByText(/Adicionar Pessoa/i)).toBeInTheDocument();
  });

  it("renders category options", async () => {
    const mockObject = {
      name: "Testing",
      description: "aaaa",
      id: 12,
      employees: [],
      catChildren: [],
    };
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CategoryCard cat={mockObject} isEditable={true} />
      </MockedProvider>
    );

    const options = screen.getByTestId("options-category");
    fireEvent.click(options);
    expect(screen.getByText(/Excluir/i)).toBeInTheDocument();
    expect(screen.getByText(/Editar/i)).toBeInTheDocument();
    expect(screen.getByText(/Adicionar Pessoa/i)).toBeInTheDocument();
  });

  it("renders delete modal", async () => {
    const mockObject = {
      name: "Testing",
      description: "aaaa",
      id: 12,
      employees: [],
      catChildren: [],
    };
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CategoryCard cat={mockObject} isEditable={true} />
      </MockedProvider>
    );

    const options = screen.getByTestId("options-category");
    fireEvent.click(options);
    const deleteButton = screen.getByText(/Excluir/i);
    fireEvent.click(deleteButton);
    expect(screen.getByText(/Apagar categoria?/i)).toBeInTheDocument();
    expect(screen.getByText(/Confirmar/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancelar/i)).toBeInTheDocument();
  });

  it("deletes category", async () => {
    const mockObject = {
      name: "Name Category",
      description: "Description Category",
      id: 12,
      employees: [],
      catChildren: [],
    };

    const mocks = [
      {
        request: {
          query: DeleteCategoryDocument,
          variables: { id: 12 },
        },
        result: {
          data: { deleteCategory: true },
        },
      },
    ];
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CategoryCard cat={mockObject} isEditable={true} />
      </MockedProvider>
    );

    const options = screen.getByTestId("options-category");
    fireEvent.click(options);
    const deleteButton = screen.getByText(/Excluir/i);
    fireEvent.click(deleteButton);
    const confirmButton = screen.getByText(/Confirmar/i);
    await fireEvent.click(confirmButton);
    expect(await screen.findByText(/Categoria excluida!/i)).toBeInTheDocument();
  });

  it("not deletes category", async () => {
    const mockObject = {
      name: "Name Category",
      description: "Description Category",
      id: 12,
      employees: [],
      catChildren: [],
    };

    const mocks = [
      {
        request: {
          query: DeleteCategoryDocument,
          variables: { id: 12 },
        },
        result: {
          data: { deleteCategory: false },
        },
      },
    ];
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CategoryCard cat={mockObject} isEditable={true} />
      </MockedProvider>
    );

    const options = screen.getByTestId("options-category");
    fireEvent.click(options);
    const deleteButton = screen.getByText(/Excluir/i);
    fireEvent.click(deleteButton);
    const confirmButton = screen.getByText(/Confirmar/i);
    await fireEvent.click(confirmButton);
    expect(
      await screen.findByText(/Não foi possível excluir!/i)
    ).toBeInTheDocument();
  });
});
