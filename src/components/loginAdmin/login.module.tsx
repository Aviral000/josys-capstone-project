import React, { useContext, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import adback1 from '../../assets/main/a-bg-1.webp';
import { isValidEmail } from './Login.validation';
import { verifyAdmin } from '../../services/User.service';
import { adminContext } from '../../contextAPI/admins/CreateContextAdmin';

type UserForm = {
  email: string,
  password: string
}

const Login: React.FC = () => {
    const [formData, setFormData] = useState<UserForm>({ email: '', password: '' });
    const navigate = useNavigate();
    const { setAdminId, setIsLoggedIn, setRole } = useContext(adminContext);

    console.log(formData.password);

    const mutation = useMutation({
        mutationFn: () => verifyAdmin(formData),
        onSuccess: (data) => {
            const admin = Array.isArray(data) ? data[0] : data;

            if (!admin) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'No user data found',
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                });
                return;
            }

            setAdminId(admin.id);
            setIsLoggedIn(true);
            setRole('Admin');

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Login Successful',
                showConfirmButton: false,
                timer: 1500,
                toast: true
            });
            navigate(`/company/admin`);
        },
        onError: (error: any) => {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: `${error}`,
                showConfirmButton: false,
                timer: 1500,
                toast: true
            });
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isValidEmail(formData.email)) {
            Swal.fire({
                position: 'top-right',
                icon: 'error',
                title: 'Invalid email format',
                showConfirmButton: false,
                timer: 5000,
                toast: true
            });
            return;
        }

        if (formData.password.trim() === '') {
            Swal.fire({
                position: 'top-right',
                icon: 'error',
                title: 'Password cannot be empty',
                showConfirmButton: false,
                timer: 5000,
                toast: true
            });
            return;
        }

        mutation.mutate();
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div
                className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat blur-sm"
                style={{ backgroundImage: `url(${adback1})` }}
            />
            <div className="relative z-10 w-full max-w-md p-8 bg-white bg-opacity-60 backdrop-blur-lg rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                            placeholder='Email'
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                            placeholder='Password'
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                    >
                        {mutation.isPending ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
