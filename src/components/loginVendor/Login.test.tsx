import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import Login from './Login.module';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

jest.mock('../../utils/encryption', () => ({
    verifyPassword: jest.fn().mockResolvedValue(true)
}));

jest.mock('../../services/vendor.service', () => ({
    verifyVendor: jest.fn().mockImplementation((email, password) => {
        if (email === 'flyer.vi@vi.com' && password === 'FlyerVi@2024') {
            return Promise.resolve([{
                id: '6c6f6537-bf09-4c71-9de3-89fa673ffb5f',
                email: 'flyer.vi@vi.com',
                password: '$2a$10$2B7U4xsk37FuzvMXVDqyIePfOJtK.xbnvxqd84J8G25qjylXdNCem',
                verified: true,
                companyName: "Flyer Vi",
                address: "HSR layout-6, main road, Bengaluru",
                phoneNumber: "7648336747",
                roleId: "2"
            }]);
        }
        return Promise.reject(new Error('Invalid credentials'));
    })
}));

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

describe('LoginPage component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        queryClient.clear();
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

    test('redirects to the Vendor Panel on successful login', async () => {
        const { verifyVendor } = require('../../services/Vendor.service');

        render(<Login />, { wrapper: AllProviders });
    
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'flyer.vi@vi.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'FlyerVi@2024' } });
    
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));
    
        await waitFor(() => {
            expect(verifyVendor).toBeCalledWith('flyer.vi@vi.com', 'FlyerVi@2024')
        });
    });

    test('displays error for invalid email format', async () => {
        render(<Login />, { wrapper: AllProviders });

        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: { value: 'invalid-email' }
        });
        fireEvent.change(screen.getByPlaceholderText('Password'), {
            target: { value: 'StrongPass123!' }
        });

        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        expect(await screen.findByText('Invalid email format')).toBeInTheDocument();
        expect(mockedUseNavigate).not.toHaveBeenCalled();
    });

    test('displays error when password is empty', async () => {
        render(<Login />, { wrapper: AllProviders });

        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: { value: 'john.doe@example.com' }
        });
        fireEvent.change(screen.getByPlaceholderText('Password'), {
            target: { value: '' }
        });

        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        expect(await screen.findByText('Password cannot be empty')).toBeInTheDocument();
        expect(mockedUseNavigate).not.toHaveBeenCalled();
    });

    test('handles failed login attempt', async () => {
        const { verifyVendor } = require('../../services/vendor.service');
        verifyVendor.mockRejectedValueOnce(new Error('Invalid credentials'));

        render(<Login />, { wrapper: AllProviders });

        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: { value: 'wrong@email.com' }
        });
        fireEvent.change(screen.getByPlaceholderText('Password'), {
            target: { value: 'WrongPass123!' }
        });

        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        await waitFor(() => {
            expect(screen.getByText(/Incorrect Credentials/i)).toBeInTheDocument();
        });
        expect(mockedUseNavigate).not.toHaveBeenCalled();
    });
});