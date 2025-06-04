'use client';
import React, { useState } from 'react';
import { Mail, Lock, UserPlus } from 'lucide-react'; // Importing icons from lucide-react
import InputLabel from './InputLabel';

// Main App component (exported as default)
const App = () => {
  // State variables for form inputs
  const [state, setState] = useState({
   step: 'NE', // Name, Email
   fullName: '',
   email: '',
   password: '',
   languages: ['']

  })

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent Default from refrshing
  };

  return (
    // Main container for the entire page, centering its content
    <main className='w-screen h-screen flex justify-center items-center p-4 bg-[#121212] font-inter'>
      {/* Form container with dark background, rounded corners, and shadow */}
      <div className='bg-[#1e1e1e] p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700'>
        {/* Signup form title */}
        <h2 className='text-3xl font-bold text-white mb-8 text-center'>
         به <span className='text-red-500 '>کدیار</span> خوش آمدید
        </h2>

        {/* Signup form */}
        <form onSubmit={handleSubmit} className='space-y-6'>

         <InputLabel value={state.fullName} id={fullNameG}/>
          {/* Submit button */}
          <button
            type='submit'
            className='w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2'
          >
            <UserPlus size={20} />
            ادامه
          </button>
        </form>
      </div>
    </main>
  );
};

export default App;
