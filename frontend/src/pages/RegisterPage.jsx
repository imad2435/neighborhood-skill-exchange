// frontend/src/pages/RegisterPage.jsx
 import React from 'react';
 import { useAuth } from '../context/AuthContext';
 import { Formik, Form, Field, ErrorMessage } from 'formik';
 import * as Yup from 'yup';
 import { useNavigate, Link } from 'react-router-dom';
 
 // --- 1. UPDATE VALIDATION SCHEMA ---
 const RegisterSchema = Yup.object().shape({
   name: Yup.string().required('Name is required'),
   email: Yup.string().email('Invalid email address').required('Email is required'),
   password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
   role: Yup.string().oneOf(['seeker', 'provider']).required('Please select a role'),
 });
 
 const RegisterPage = () => {
   const { register } = useAuth();
   const navigate = useNavigate();
 
   const handleRegister = async (values, { setSubmitting, setErrors }) => {
     try {
       await register(values);
       // If a provider signs up, send them to edit their profile. Seekers go to find providers.
       if (values.role === 'provider') {
         navigate('/edit-profile');
       } else {
         navigate('/providers');
       }
     } catch (error) {
       const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
       setErrors({ submit: errorMessage });
     } finally {
       setSubmitting(false);
     }
   };
 
   return (
     <div className="flex items-center justify-center min-h-screen bg-gray-100">
       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
         <h2 className="text-2xl font-bold text-center text-gray-900">Create your account</h2>
         <Formik
           // --- 2. UPDATE INITIAL VALUES ---
           initialValues={{ name: '', email: '', password: '', role: 'seeker' }}
           validationSchema={RegisterSchema}
           onSubmit={handleRegister}
         >
           {({ isSubmitting, errors, values }) => (
             <Form className="space-y-6">
               
               {/* --- 3. ADD THE ROLE SELECTOR UI --- */}
               <div>
                 <label className="text-sm font-medium text-gray-700">I am a...</label>
                 <div role="group" aria-labelledby="role-group" className="flex items-center space-x-4 mt-2">
                   <label className={`flex items-center px-4 py-2 border rounded-md cursor-pointer ${values.role === 'seeker' ? 'bg-purple-100 border-purple-500' : 'border-gray-300'}`}>
                     <Field type="radio" name="role" value="seeker" className="h-4 w-4 text-purple-600 focus:ring-purple-500" />
                     <span className="ml-3 text-sm font-medium text-gray-900">Service Seeker</span>
                   </label>
                   <label className={`flex items-center px-4 py-2 border rounded-md cursor-pointer ${values.role === 'provider' ? 'bg-purple-100 border-purple-500' : 'border-gray-300'}`}>
                     <Field type="radio" name="role" value="provider" className="h-4 w-4 text-purple-600 focus:ring-purple-500" />
                     <span className="ml-3 text-sm font-medium text-gray-900">Service Provider</span>
                   </label>
                 </div>
                 <ErrorMessage name="role" component="div" className="mt-1 text-sm text-red-600" />
               </div>

               {/* ... (Name, Email, Password fields remain the same) ... */}
               <div>
                 <label htmlFor="name">Name</label>
                 <Field type="text" name="name" className="w-full ..."/>
                 <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
               </div>
               <div>
                 <label htmlFor="email">Email</label>
                 <Field type="email" name="email" className="w-full ..."/>
                 <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
               </div>
               <div>
                 <label htmlFor="password">Password</label>
                 <Field type="password" name="password" className="w-full ..."/>
                 <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />
               </div>
 
               {errors.submit && (
                 <div className="p-3 text-sm text-red-800 bg-red-100 rounded-md">
                   {errors.submit}
                 </div>
               )}
 
               <div>
                 <button type="submit" disabled={isSubmitting} className="w-full ...">
                   {isSubmitting ? 'Registering...' : 'Register'}
                 </button>
               </div>
             </Form>
           )}
         </Formik>
         <p className="text-sm text-center text-gray-600">
           Already have an account?{' '}
           <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
             Sign in
           </Link>
         </p>
       </div>
     </div>
   );
 };
 
 export default RegisterPage;