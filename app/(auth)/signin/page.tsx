"use client";
import React, { useState } from "react";
import { UserPlus } from "lucide-react";
import { Langs, NE, P } from "@/components/auth/steps";
import { handleNext } from "@/lib/auth/nextStep";
import { useRouter } from "next/navigation";
import InputLabel from "@/components/auth/InputLabel";
import { signInUser } from "@/lib/auth/mainFunctions";

export interface State {
  step: number;
  fullName: string;
  email: string;
  password: string;
  languages: string[];
  error: string;
  loading: boolean;
}

// Main App component (exported as default)
const App = () => {
  // State variables for form inputs
  const [state, setState] = useState<State>({
    step: 1, // 1. Name, Email 2. password 3. langs
    fullName: "",
    email: "",
    password: "",
    languages: [""],
    error: "",
    loading: false,
  });

  const router = useRouter();

  const handleChangeInput = (e) => {
    setState((prevalue) => {
      return {
        ...prevalue,
        [e.target.name]: e.target.value,
      };
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent Default from refrshing
  };

  return (
    // Main container for the entire page, centering its content
    <main className="w-screen h-screen flex overflow-hidden justify-center items-center p-4 bg-[#121212] font-inter">
      {/* Form container with dark background, rounded corners, and shadow */}
      <div className="bg-[#1e1e1e] p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        {/* Signup form title */}
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          ورود به <span className="text-red-500">کدیار</span>
        </h2>

        {/* Signup form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputLabel
            value={state.email}
            id={"email"}
            setValue={handleChangeInput}
            label={"ایمیل"}
            type={"email"}
            placeholder={"ایمیل خود را وارد کنید"}
          />
          <InputLabel
            value={state.password}
            id={"password"}
            setValue={handleChangeInput}
            label={"رمز عبور"}
            type={"password"}
            placeholder={"پسورد مورد نظر خود را وارد کنید"}
          />

          {state.error ? (
            <span className="text-red-500 block mt-4">{state.error}</span> // Added 'block' and 'mt-4'
          ) : null}

          {/* Submit button */}
          <button
            type="submit"
            onClick={(e) => signInUser(state, setState, router)}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-full transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <UserPlus size={20} />
            ورود
          </button>
        </form>
      </div>
    </main>
  );
};

export default App;
