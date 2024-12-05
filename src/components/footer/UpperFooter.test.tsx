import { render, screen } from "@testing-library/react";
import UpperFooter from "./UpperFooter.module";

describe("UpperFooter Component", () => {
  test("renders the main heading correctly", () => {
    render(<UpperFooter />);
    const heading = screen.getByRole("heading", {
      name: /STORIES, STYLES AND SPORTSWEAR AT ACTIVEATTIRE, SINCE 2024/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test("renders the first paragraph", () => {
    render(<UpperFooter />);
    expect(
      screen.getByText(/Sport keeps us fit\. Keeps you mindful\. Brings us together\./i)
    ).toBeInTheDocument();
  });

  test("renders the second paragraph", () => {
    render(<UpperFooter />);
    expect(
      screen.getByText(
        /ActiveAttire is about more than sportswear and workout clothes\./i
      )
    ).toBeInTheDocument();
  });

  test("renders the ActiveAttire brand name as a subheading", () => {
    render(<UpperFooter />);
    const subheading = screen.getByRole("heading", {
      name: 'ActiveAttire',
    });
    expect(subheading).toBeInTheDocument();
  });

  test("applies the correct background and text color classes", () => {
    render(<UpperFooter />);
    const container = screen.getByText(/Sport keeps us fit\. Keeps you mindful\. Brings us together\./i).closest(
      "div"
    );
    expect(container).toHaveClass("max-w-6xl mx-auto text-center");
  });

  test("applies correct font and size classes to the main heading", () => {
    render(<UpperFooter />);
    const heading = screen.getByRole("heading", {
      name: /STORIES, STYLES AND SPORTSWEAR AT ACTIVEATTIRE, SINCE 2024/i,
    });
    expect(heading).toHaveClass("text-2xl md:text-4xl font-bold");
  });

  test("renders text content within a centered container", () => {
    render(<UpperFooter />);
    const container = screen.getByText(/Sport keeps us fit\. Keeps you mindful\. Brings us together\./i).closest(
      "div"
    );
    expect(container).toHaveClass("max-w-6xl mx-auto text-center");
  });

  test("renders the component with correct padding", () => {
    render(<UpperFooter />);
    const container = screen.getByText(/Sport keeps us fit\. Keeps you mindful\. Brings us together\./i).closest(
      "div"
    );
    expect(container).toHaveClass("max-w-6xl mx-auto text-center");
  });
});
