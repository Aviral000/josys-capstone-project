import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import Signup from './Signup.module';

const mockedUseNavigate = jest.fn();
const mockedMutate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

jest.mock('../../services/vendor.service', () => ({
    createVendor: jest.fn().mockResolvedValue({
      id: '123',
      companyName: 'Pink Po',
      phoneNumber: '9528541456',
      email: 'pink@po.com',
      companyAddress: 'Gafar Market, New Delhi'
    })
}));

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('Signup Page component Vendor Side', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedMutate.mockImplementation((data, { onSuccess }) => {
      onSuccess();
    });
  });

  test('renders Signup page with form', () => {
    render(<Signup />, { wrapper: AllProviders });
    expect(screen.getByRole('heading', { name: 'Create Account' })).toBeInTheDocument();
  });

  test('renders email and password input fields', () => {
    render(<Signup />, { wrapper: AllProviders });
    const input1 = screen.getByPlaceholderText('Company Name');
    const input2 = screen.getByPlaceholderText('Phone Number');
    const input3 = screen.getByPlaceholderText('Email');
    const input4 = screen.getByPlaceholderText('Company Address');
    const input5 = screen.getByPlaceholderText('Password');
    const input6 = screen.getByPlaceholderText('Confirm Password');

    expect(input1).toBeInTheDocument();
    expect(input2).toBeInTheDocument();
    expect(input3).toBeInTheDocument();
    expect(input4).toBeInTheDocument();
    expect(input5).toBeInTheDocument();
    expect(input6).toBeInTheDocument();
  });

  test('redirects to the home page on successful login', async () => {
    mockedMutate.mockImplementation(() => Promise.resolve());
    
    render(<Signup />, { wrapper: AllProviders });

    fireEvent.change(screen.getByPlaceholderText('Company Name'), { target: { value: 'Pink Po' } });
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), { target: { value: '9528541456' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'pink@po.com' } });
    fireEvent.change(screen.getByPlaceholderText('Company Address'), { target: { value: 'Gafar Market, New Delhi' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Pink@2024' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'Pink@2024' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
        expect(mockedUseNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('displays error for invalid email format', async () => {
    render(<Signup />, { wrapper: AllProviders });

    fireEvent.change(screen.getByPlaceholderText('Company Name'), { target: { value: 'Pink Po' } });
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), { target: { value: '9528541456' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'pink.com' } });
    fireEvent.change(screen.getByPlaceholderText('Company Address'), { target: { value: 'Gafar Market, New Delhi' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Pink@2024' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'Pink@2024' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(mockedUseNavigate).not.toHaveBeenCalled();
    });

    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });

  test('displays error when password is empty', async () => {
    render(<Signup />, { wrapper: AllProviders });

    fireEvent.change(screen.getByPlaceholderText('Company Name'), { target: { value: 'Pink Po' } });
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), { target: { value: '9528541456' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'pink@po.com' } });
    fireEvent.change(screen.getByPlaceholderText('Company Address'), { target: { value: 'Gafar Market, New Delhi' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Pink' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'Pink@2024' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(mockedUseNavigate).not.toHaveBeenCalled();
    });

    expect(screen.getByText(/Password must be at least 8 characters/i)).toBeInTheDocument();
  });
});
