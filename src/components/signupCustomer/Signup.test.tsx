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

jest.mock('../../customs/hooks/generic/useCustomer', () => ({
  useCustomer: () => ({
    create: {
      mutate: mockedMutate,
      isPending: false
    }
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
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('SignupPage component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedMutate.mockImplementation((data, { onSuccess }) => {
      onSuccess();
    });
  });

  test('renders signup page with form', async () => {
    render(<Signup />, { wrapper: AllProviders });
    expect(await screen.findByText('Create Account')).toBeInTheDocument();
  });

  test('render all the 5 forms', () => {
    render(<Signup />, { wrapper: AllProviders });
    const input1 = screen.getByPlaceholderText('First Name');
    const input2 = screen.getByPlaceholderText('Last Name');
    const input3 = screen.getByPlaceholderText('Email');
    const input4 = screen.getByPlaceholderText('Phone Number');
    const input5 = screen.getByPlaceholderText('Password');

    expect(input1).toBeInTheDocument();
    expect(input2).toBeInTheDocument();
    expect(input3).toBeInTheDocument();
    expect(input4).toBeInTheDocument();
    expect(input5).toBeInTheDocument();
  });

  test('redirects to /user-login on successful signup', async () => {
    render(<Signup />, { wrapper: AllProviders });

    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'StrongPass123!' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'StrongPass123!' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalledWith('/user-login');
    }, { timeout: 2000 });
  });

  test('Shows error if email pattern is invalid', async () => {
    render(<Signup />, { wrapper: AllProviders });
  
    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe' } });
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'StrongPass123!' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'StrongPass123!' } });
  
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
  
    await waitFor(() => {
      expect(mockedUseNavigate).not.toHaveBeenCalled();
    });

    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });

  test('Shows error if phone initials are not between 6 to 9', async () => {
    render(<Signup />, { wrapper: AllProviders });
  
    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe@email.com' } });
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), { target: { value: '98765432' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'StrongPass123!' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'StrongPass123!' } });
  
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
  
    await waitFor(() => {
      expect(mockedUseNavigate).not.toHaveBeenCalled();
    });

    expect(screen.getByText(/Invalid phone number/i)).toBeInTheDocument();
  });
});