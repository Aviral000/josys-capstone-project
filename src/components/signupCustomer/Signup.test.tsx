import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import Signup from './Signup.module';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
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
        mockedAxios.post.mockResolvedValue({ 
            data: { 
                id: '1'
            } 
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

//   test('redirects to /user-login on successful signup', async () => {
//     render(<Signup />, { wrapper: AllProviders });

//     fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
//     fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
//     fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
//     fireEvent.change(screen.getByPlaceholderText('Phone Number'), { target: { value: '9876543210' } });
//     fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'StrongPass123!' } });
//     fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'StrongPass123!' } });

//     fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

//     await waitFor(() => {
//       expect(mockedAxios.post).toHaveBeenCalledWith(
//         'http://localhost:3001/customers',
//         expect.objectContaining({
//           firstName: 'John',
//           lastName: 'Doe',
//           email: 'john.doe@example.com',
//           phoneNumber: '9876543210',
//           password: 'StrongPass123!',
//           name: 'John Doe',
//           roleId: '3',
//           addressIds: '',
//           cartId: '',
//         })
//       );
//     });

//     await waitFor(() => {
//       expect(mockedUseNavigate).toHaveBeenCalledWith('/user-login');
//     });
//   });
});
