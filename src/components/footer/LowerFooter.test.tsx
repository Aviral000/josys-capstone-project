import { render, screen } from "@testing-library/react";
import LowerFooter from "./LowerFooter.module";

describe("LowerFooter Component", () => {
  beforeEach(() => {
    render(<LowerFooter />);
  });

  test("renders all section headings", () => {
    const expectedHeadings = [
      "PRODUCTS",
      "SPORTS",
      "COLLECTIONS",
      "SUPPORT",
      "COMPANY INFO",
      "FOLLOW US"
    ];

    expectedHeadings.forEach(heading => {
      expect(screen.getByText(heading)).toBeInTheDocument();
    });
  });

  test("renders all product links", () => {
    const productLinks = [
      "Footwear",
      "Clothing",
      "Accessories",
      "Outlet-Sale",
      "New Arrivals",
      "Special Offer",
      "Flat 50% Off!"
    ];

    productLinks.forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  test("renders all sports links", () => {
    const sportsLinks = [
      "CRICKET",
      "Running",
      "Football",
      "Gym/Training",
      "Tennis",
      "Outdoor",
      "Basketball",
      "Swimming",
      "Skateboarding"
    ];

    sportsLinks.forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  test("renders all collection links", () => {
    const collectionLinks = [
      "Ultraboost",
      "Superstar",
      "NMD",
      "Stan Smith",
      "Sustainability",
      "Predator",
      "Parley",
      "Adicolor"
    ];

    collectionLinks.forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  test("renders all support links", () => {
    const supportLinks = [
      "Help",
      "Customer Services",
      "Returns & Exchanges",
      "Shipping",
      "Order Tracker",
      "Store Finder",
      "adiClub",
      "adiClub Terms and conditions"
    ];

    supportLinks.forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  test("renders all company info links", () => {
    const companyLinks = [
      "About Us",
      "adidas stories",
      "adidas Apps",
      "Entity Details",
      "Press",
      "Careers"
    ];

    companyLinks.forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  test("renders social media icons", () => {
    const instagramIcon = document.querySelector('svg');
    expect(instagramIcon).toBeInTheDocument();
  });

  test("renders footer bottom section with copyright and links", () => {
    expect(screen.getByText(/© 2024 ActiveAttire India Marketing Pvt. Ltd/)).toBeInTheDocument();

    const footerLinks = ["Privacy Policy", "Terms and Conditions", "Cookies"];
    footerLinks.forEach(link => {
      const linkElement = screen.getByText(link);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement.tagName.toLowerCase()).toBe("a");
      expect(linkElement).toHaveAttribute("href", "/");
    });
  });

  test("applies correct styling classes", () => {
    const mainContainer = screen.getByText("PRODUCTS").closest(".bg-white");
    expect(mainContainer).toHaveClass("py-8", "px-4");

    const bottomFooter = screen.getByText(/© 2024/).closest(".bg-gray-900");
    expect(bottomFooter).toHaveClass("text-white", "py-4", "px-4");
  });

  test("footer links have hover effect class", () => {
    const privacyLink = screen.getByText("Privacy Policy");
    expect(privacyLink).toHaveClass("hover:underline");
  });

  test("layout is responsive", () => {
    const gridContainer = screen.getByText("PRODUCTS").closest(".grid");
    expect(gridContainer).toHaveClass(
      "grid-cols-2",
      "md:grid-cols-5",
      "gap-6"
    );

    const bottomContainer = screen.getByText(/© 2024/).closest(".flex");
    expect(bottomContainer).toHaveClass(
      "flex-col",
      "md:flex-row"
    );
  });
});