import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Swal from "sweetalert2";
import AM from "./AM.module";
import { useBanner } from "../../../customs/hooks/useBanner";

jest.mock("../../../customs/hooks/useBanner");
jest.mock("sweetalert2");

const mockUseBanner = useBanner as jest.Mock;

describe("AM Component", () => {
  const mockUpdateBanner = jest.fn();
  const mockResetBanner = jest.fn();

  const mockBanners = [
    { id: "1", discount: "10%", description: "Banner 1 description" },
    { id: "2", heading: "Sale", discount: "20%", description: "Banner 2 description" },
    { id: "3", heading: "Limited Offer", discount: "30%", description: "Banner 3 description" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setupMocks = (overrides = {}) => {
    mockUseBanner.mockReturnValue({
      data: mockBanners,
      isLoading: false,
      isError: false,
      error: null,
      updateBanner: { mutate: mockUpdateBanner },
      resetBanner: mockResetBanner,
      isUpdating: false,
      isResetting: false,
      ...overrides,
    });
  };

  test("renders loading state when banners are being fetched", () => {
    setupMocks({ isLoading: true });
    render(<AM />);
    expect(screen.getByText(/Loading banners.../i)).toBeInTheDocument();
  });

  test("renders error message when fetching banners fails", () => {
    setupMocks({ isError: true, error: { message: "Failed to fetch banners" } });
    render(<AM />);
    expect(screen.getByText(/Error loading banners: Failed to fetch banners/i)).toBeInTheDocument();
  });

  test("renders banners with correct fields and buttons", () => {
    setupMocks();
    render(<AM />);

    expect(screen.getByText('Banner 1')).toBeInTheDocument();
    expect(screen.getByText('Banner 2')).toBeInTheDocument();
    expect(screen.getByText('Banner 3')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Enter discount')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter description')).toBeInTheDocument();
  });

  test("handles input changes for banners", () => {
    setupMocks();
    render(<AM />);

    const discountInput = screen.getAllByPlaceholderText(/Enter discount/i)[0];
    fireEvent.change(discountInput, { target: { value: "15%" } });

    expect(discountInput).toHaveValue("15%");
  });

  test("calls resetBanner when reset button is clicked", () => {
    setupMocks();
    render(<AM />);

    const resetButton = screen.getByText(/Reset All to Default/i);
    fireEvent.click(resetButton);

    expect(mockResetBanner).toHaveBeenCalled();
  });

  test("disables buttons when updating or resetting", () => {
    setupMocks({ isUpdating: true, isResetting: true });
    render(<AM />);

    const saveButton = screen.getAllByText(/Saving.../i)[0];
    const resetButton = screen.getByText(/Resetting.../i);

    expect(saveButton).toBeDisabled();
    expect(resetButton).toBeDisabled();
  });
});
