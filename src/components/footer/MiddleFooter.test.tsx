import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MiddleFooter from "./MiddleFooter.module";

describe("MiddleFooter Component", () => {
  test("renders Fast Delivery section", () => {
    render(
      <MemoryRouter>
        <MiddleFooter />
      </MemoryRouter>
    );
    expect(screen.getByText(/Fast Delivery/i)).toBeInTheDocument();
  });

  test("renders 24-Hour Replacement section", () => {
    render(
      <MemoryRouter>
        <MiddleFooter />
      </MemoryRouter>
    );
    expect(screen.getByText(/24-Hour Replacement/i)).toBeInTheDocument();
  });

  test("renders No-Cost EMI section", () => {
    render(
      <MemoryRouter>
        <MiddleFooter />
      </MemoryRouter>
    );
    expect(screen.getByText(/No-Cost EMI/i)).toBeInTheDocument();
  });

  test("renders 'Join Now' button", () => {
    render(
      <MemoryRouter>
        <MiddleFooter />
      </MemoryRouter>
    );
    expect(screen.getByRole("link", { name: /Join Now/i })).toBeInTheDocument();
  });

  test("'Join Now' button navigates to '/user-register'", () => {
    render(
      <MemoryRouter>
        <MiddleFooter />
      </MemoryRouter>
    );
    const link = screen.getByRole("link", { name: /Join Now/i });
    expect(link).toHaveAttribute("href", "/user-register");
  });

  test("renders icons correctly", () => {
    render(
      <MemoryRouter>
        <MiddleFooter />
      </MemoryRouter>
    );
    expect(screen.getByTestId("FaShippingFast")).toBeInTheDocument();
    expect(screen.getByTestId("FaSyncAlt")).toBeInTheDocument();
    expect(screen.getByTestId("FaCreditCard")).toBeInTheDocument();
  });

  test("applies correct styles to 'Join Now' button", () => {
    render(
      <MemoryRouter>
        <MiddleFooter />
      </MemoryRouter>
    );
    const button = screen.getByRole("link", { name: /Join Now/i });
    expect(button).toHaveClass("bg-black text-white px-6 py-3 text-sm font-medium rounded-md shadow-md hover:bg-gray-800");
  });

  test("renders the component with correct background color", () => {
    render(
      <MemoryRouter>
        <MiddleFooter />
      </MemoryRouter>
    );
    const container = screen.getByTestId("middle-footer");
    expect(container).toHaveClass("bg-yellow-400");
  });
});
