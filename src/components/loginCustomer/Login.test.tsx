import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import Login from './Login.module';

const mockedUseNavigate = jest.fn();
const mockedMutate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

jest.mock('../../services/Customer.service', () => ({
    verifyCustomer: jest.fn().mockImplementation(() => Promise.resolve([{
      id: '1',
      email: 'avim@gmail.com',
      password: 'Avi@2024'
    }]))
}));

jest.mock('../../services/Customer.service.ts', () => ({
    verifyCustomer: () => ({

    })
}))

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

describe('LoginPage component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedMutate.mockImplementation((data, { onSuccess }) => {
      onSuccess();
    });
  });

  test('renders login page with form', () => {
    render(<Login />, { wrapper: AllProviders });
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  });

  test('renders email and password input fields', () => {
    render(<Login />, { wrapper: AllProviders });
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('redirects to the home page on successful login', async () => {
    render(<Login />, { wrapper: AllProviders });

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'avim@gmail.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Avi@2024' } });

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('displays error for invalid email format', async () => {
    render(<Login />, { wrapper: AllProviders });

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'StrongPass123!' } });

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(mockedUseNavigate).not.toHaveBeenCalled();
    });

    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });

  test('displays error when password is empty', async () => {
    render(<Login />, { wrapper: AllProviders });

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '' } });

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(mockedUseNavigate).not.toHaveBeenCalled();
    });

    expect(screen.getByText('Password cannot be empty')).toBeInTheDocument();
  });
});
