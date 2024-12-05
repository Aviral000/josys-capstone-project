import { render, screen, fireEvent } from "@testing-library/react";
import Swal from "sweetalert2";
import AdminVerify from "./AdminVerify.module";
import { useVendor } from "../../../customs/hooks/useVendor";

// Define types for vendor data
interface Vendor {
  id: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  verified: boolean;
}

// Define types for mutation callback params
interface MutationCallbacks {
  onSuccess?: () => void;
  onError?: (error: { message: string }) => void;
}

interface VendorMutationData {
  id: string;
  updates: Vendor;
}

jest.mock("../../../customs/hooks/useVendor", () => ({
  useVendor: jest.fn(() => ({
    vendors: [],
    isFetchingVendors: false,
    isFetchError: false,
    fetchError: null,
    updateVendor: {
      mutate: jest.fn(),
    },
  })),
}));
jest.mock("sweetalert2");

const mockUseVendor = useVendor as jest.Mock;

describe("AdminVerify Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockVendors: Vendor[] = [
    {
      id: "1",
      companyName: "Vendor A",
      email: "vendorA@example.com",
      phoneNumber: "1234567890",
      verified: false,
    },
    {
      id: "2",
      companyName: "Vendor B",
      email: "vendorB@example.com",
      phoneNumber: "9876543210",
      verified: true,
    },
  ];

  const mockUpdateVendor = {
    mutate: jest.fn(),
  };

  test("renders loading state when fetching vendors", () => {
    mockUseVendor.mockReturnValue({
      vendors: null,
      isFetchingVendors: true,
      isFetchError: false,
      fetchError: null,
      updateVendor: mockUpdateVendor,
    });

    render(<AdminVerify />);
    expect(screen.getByText(/Loading vendors.../i)).toBeInTheDocument();
  });

  test("renders error state when fetching vendors fails", () => {
    mockUseVendor.mockReturnValue({
      vendors: null,
      isFetchingVendors: false,
      isFetchError: true,
      fetchError: { message: "Failed to fetch vendors" },
      updateVendor: mockUpdateVendor,
    });

    render(<AdminVerify />);
    expect(screen.getByText(/Error fetching vendors: Failed to fetch vendors/i)).toBeInTheDocument();
  });

  test("renders vendor list correctly", () => {
    mockUseVendor.mockReturnValue({
      vendors: mockVendors,
      isFetchingVendors: false,
      isFetchError: false,
      fetchError: null,
      updateVendor: mockUpdateVendor,
    });

    render(<AdminVerify />);

    expect(screen.getByText(/Company Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByText(/Verified/i)).toBeInTheDocument();
    expect(screen.getByText(/Action/i)).toBeInTheDocument();

    expect(screen.getByText(/Vendor A/i)).toBeInTheDocument();
    expect(screen.getByText(/Vendor B/i)).toBeInTheDocument();
    expect(screen.getByText(/vendorA@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/vendorB@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/1234567890/i)).toBeInTheDocument();
    expect(screen.getByText(/9876543210/i)).toBeInTheDocument();
    expect(screen.getByText(/No/i)).toBeInTheDocument();
    expect(screen.getByText(/Yes/i)).toBeInTheDocument();
  });

  test("updates vendor verification when checkbox is clicked", () => {
    mockUseVendor.mockReturnValue({
      vendors: mockVendors,
      isFetchingVendors: false,
      isFetchError: false,
      fetchError: null,
      updateVendor: mockUpdateVendor,
    });

    render(<AdminVerify />);

    const vendorCheckbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(vendorCheckbox);

    expect(mockUpdateVendor.mutate).toHaveBeenCalledWith(
      {
        id: "1",
        updates: { ...mockVendors[0], verified: true },
      },
      expect.anything()
    );
  });

  test("displays success toast when verification is updated successfully", async () => {
    mockUseVendor.mockReturnValue({
      vendors: mockVendors,
      isFetchingVendors: false,
      isFetchError: false,
      fetchError: null,
      updateVendor: {
        mutate: (data: VendorMutationData, { onSuccess }: MutationCallbacks) => onSuccess?.(),
      },
    });

    render(<AdminVerify />);

    const vendorCheckbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(vendorCheckbox);

    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: "success",
        title: "Vendor A has been verified",
      })
    );
  });

  test("displays error toast when verification update fails", async () => {
    mockUseVendor.mockReturnValue({
      vendors: mockVendors,
      isFetchingVendors: false,
      isFetchError: false,
      fetchError: null,
      updateVendor: {
        mutate: (data: VendorMutationData, { onError }: MutationCallbacks) => 
          onError?.({ message: "Update failed" }),
      },
    });

    render(<AdminVerify />);

    const vendorCheckbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(vendorCheckbox);

    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: "error",
        title: "Failed to update vendor verification",
        text: "Update failed",
      })
    );
  });

  test("renders all table headers correctly", () => {
    mockUseVendor.mockReturnValue({
      vendors: mockVendors,
      isFetchingVendors: false,
      isFetchError: false,
      fetchError: null,
      updateVendor: mockUpdateVendor,
    });
  
    render(<AdminVerify />);
  
    const headers = ["Company Name", "Email", "Phone Number", "Verified", "Action"];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });
});