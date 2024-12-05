import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProductDetail from "./ProductDetail.module";
import { useProduct } from "../../customs/hooks/useProduct";
import { useCart } from "../../customs/hooks/useCart";
import { useCustomer } from "../../customs/hooks/generic/useCustomer";

jest.mock("../../customs/hooks/useProduct");
jest.mock("../../customs/hooks/useCart");
jest.mock("../../customs/hooks/generic/useCustomer");

const mockUseProduct = useProduct as jest.Mock;
const mockUseCart = useCart as jest.Mock;
const mockUseCustomer = useCustomer as jest.Mock;

describe("ProductDetail Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockProduct = {
    id: "1",
    productName: "Test Product",
    productDesc: "This is a test product",
    cost: 1000,
    discount: 20,
    images: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150.mp4",
    ],
  };

  const mockCart = {
    items: [],
  };

  test("renders loading state when fetching data", () => {
    mockUseCart.mockReturnValue({
        cart: null,
        updateCart: { mutateAsync: jest.fn() },
      });
  
      mockUseProduct.mockReturnValue({
        product: null,
        isFetchingProduct: true,
        fetchErrorId: null,
      });
  
      mockUseCustomer.mockReturnValue({
        isFetchingEntities: true,
      });
  
      render(
        <MemoryRouter>
          <ProductDetail />
        </MemoryRouter>
      );
  
      expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("renders error state when fetching fails", () => {
    mockUseProduct.mockReturnValue({
      product: null,
      isFetchingProduct: false,
      fetchErrorId: { message: "Error fetching product" },
    });
    mockUseCustomer.mockReturnValue({ isFetchingEntities: false });

    mockUseCart.mockReturnValue({
        cart: null,
        updateCart: { mutateAsync: jest.fn() },
    });

    render(
      <MemoryRouter>
        <ProductDetail />
      </MemoryRouter>
    );

    expect(screen.getByText(/Error: Error fetching product/i)).toBeInTheDocument();
  });

  test("renders product details", () => {
    mockUseProduct.mockReturnValue({
      product: mockProduct,
      isFetchingProduct: false,
      fetchErrorId: null,
    });
    mockUseCustomer.mockReturnValue({ isFetchingEntities: false });

    mockUseCart.mockReturnValue({
        cart: null,
        updateCart: { mutateAsync: jest.fn() },
    });

    render(
      <MemoryRouter>
        <ProductDetail />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("This is a test product")).toBeInTheDocument();
    expect(screen.getByText(/₹800\.00/i)).toBeInTheDocument();
    expect(screen.getByText(/₹1000/i)).toBeInTheDocument();
    expect(screen.getByText(/20% off/i)).toBeInTheDocument();
  });

  test("renders product images and video thumbnails", () => {
    mockUseProduct.mockReturnValue({
      product: mockProduct,
      isFetchingProduct: false,
      fetchErrorId: null,
    });

    mockUseCustomer.mockReturnValue({ isFetchingEntities: false });

    mockUseCart.mockReturnValue({
        cart: null,
        updateCart: { mutateAsync: jest.fn() },
    });

    render(
      <MemoryRouter>
        <ProductDetail />
      </MemoryRouter>
    );

    const images = screen.getAllByRole("img");

    expect(images).toHaveLength(2);
  });

  test("updates quantity on selection", () => {
    mockUseProduct.mockReturnValue({
      product: mockProduct,
      isFetchingProduct: false,
      fetchErrorId: null,
    });
    mockUseCustomer.mockReturnValue({ isFetchingEntities: false });
    mockUseCart.mockReturnValue({
        cart: null,
        updateCart: { mutateAsync: jest.fn() },
    });

    render(
      <MemoryRouter>
        <ProductDetail />
      </MemoryRouter>
    );

    const quantitySelect = screen.getByRole("combobox");
    fireEvent.change(quantitySelect, { target: { value: "3" } });

    expect(quantitySelect).toHaveValue("3");
  });

  test("handles add to cart when cartId is not present", () => {
    mockUseProduct.mockReturnValue({
      product: mockProduct,
      isFetchingProduct: false,
      fetchErrorId: null,
    });
    mockUseCustomer.mockReturnValue({ isFetchingEntities: false });
    mockUseCart.mockReturnValue({
      cart: null,
      updateCart: {
        mutateAsync: jest.fn(),
      },
    });

    render(
      <MemoryRouter>
        <ProductDetail />
      </MemoryRouter>
    );

    const addToCartButton = screen.getByText(/Add to Cart/i);
    fireEvent.click(addToCartButton);

    expect(screen.getByText(/Cart not found!/i)).toBeInTheDocument();
  });

  test("handles add to cart when product is already in cart", async () => {
    mockUseProduct.mockReturnValue({
      product: mockProduct,
      isFetchingProduct: false,
      fetchErrorId: null,
    });
    mockUseCustomer.mockReturnValue({ isFetchingEntities: false });
    mockUseCart.mockReturnValue({
      cart: {
        items: [{ productId: "1", quantity: 1 }],
      },
      updateCart: {
        mutateAsync: jest.fn(),
      },
    });

    render(
      <MemoryRouter>
        <ProductDetail />
      </MemoryRouter>
    );

    const addToCartButton = screen.getByText(/Add to Cart/i);
    fireEvent.click(addToCartButton);

    const modalText = await waitFor(() =>
        document.querySelector('.swal2-title')
      );

    expect(modalText).toBeInTheDocument();
  });

  test("successfully adds product to cart", async () => {
    mockUseProduct.mockReturnValue({
      product: mockProduct,
      isFetchingProduct: false,
      fetchErrorId: null,
    });
    mockUseCustomer.mockReturnValue({ isFetchingEntities: false });
    mockUseCart.mockReturnValue({
      cart: mockCart,
      updateCart: {
        mutateAsync: jest.fn(),
      },
    });

    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<div>Cart Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const addToCartButton = screen.getByText(/Add to Cart/i);
    fireEvent.click(addToCartButton);

    const modalText = await waitFor(() =>
        document.querySelector('.swal2-title')
    );

    expect(modalText).toBeInTheDocument();
  });
});
