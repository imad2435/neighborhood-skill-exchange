// frontend/src/pages/LoginPage.jsx

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';

// 1. Define the validation schema for login
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // 2. Define the submission handler
  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      await login(values);
      // On successful login, redirect to the user's profile
      navigate('/profile');
    } catch (error) {
      // Handle login errors from the backend (e.g., "Invalid credentials")
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      setErrors({ submit: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };

  // 3. Render the component with the Formik form
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Sign in to your account</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting, errors }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
                <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              <div>
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
                <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              {/* Display server errors */}
              {errors.submit && (
                <div className="p-3 text-sm text-red-800 bg-red-100 rounded-md">
                  {errors.submit}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-gray-400"
                >
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-purple-600 hover:text-purple-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;