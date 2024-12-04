import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import Login from './login.module';

const mockedUseNavigate = jest.fn();
const mockedMutate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

jest.mock('../../services/User.service', () => ({
  verifyAdmin: jest.fn().mockImplementation((userObj) => {
    if (userObj.email === 'admin@example.com' && userObj.password === 'Admin1') {
      return Promise.resolve([{
        id: '1',
        email: 'admin@example.com',
        password: 'Admin1',
        roleId: '1',
        name: "Admin-1",
      }]);
    }
    return Promise.reject(new Error('Wrong Admin Credentials'));
  })
}));

jest.mock('axios', () => ({
  get: jest.fn().mockImplementation((url) => {
    if (url.includes('email=admin@example.com')) {
      return Promise.resolve({
        data: [{
          id: '1',
          email: 'admin@example.com',
          password: 'Admin1',
          roleId: 'admin',
        }]
      });
    }
    return Promise.reject(new Error('User not found'));
  })
}));

// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;

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

  test('redirects to the Admin Panel on successful login', async () => {
    const { verifyAdmin } = require('../../services/User.service');

    render(<Login />, { wrapper: AllProviders });

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'admin@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Admin1' } });

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

      await waitFor(() => {
        expect(verifyAdmin).toHaveBeenCalledWith({
          email: 'admin@example.com',
          password: 'Admin1'
        });
      });
  });

  test('Show error on wrong credentials', async () => {
    const { verifyAdmin } = require('../../services/User.service');

    render(<Login />, { wrapper: AllProviders });

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'ad@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Admin1' } });

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(verifyAdmin).toHaveBeenCalledWith({
        email: 'ad@example.com',
        password: 'Admin1'
      });
    });

    await waitFor(() => {
      expect(mockedUseNavigate).not.toHaveBeenCalledWith('/company/admin');
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