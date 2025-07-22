"use client";
import InputLabel from "@/components/auth/InputLabel";
import { useSnippet } from "@/context/snippet/SnippetContext";
import { editSnippetSubmit, newSnippetSubmit } from "@/lib/auth/mainFunctions";
import { SquareCode } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const initialSnippetState = {
  title: "",
  description: "",
  code: "",
  language: "",
  error: "",
};

const EditSnippet = () => {
  const [state, setState] = useState(initialSnippetState);

  const router = useRouter();
  const { id: snippetId } = useParams();
  const { setSnippets } = useSnippet();

  const handleChangeInput = (e) => {
    setState((prevalue) => {
      return {
        ...prevalue,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    getSnippetValues();
  }, []);

  const getSnippetValues = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/snippet/${snippetId}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setState((prev) => {
        return { ...prev, ...data.snippet };
      });
    } catch (err) {
      alert(err.message);
      setState((prev) => {
        return { ...prev, error: err.message };
      });
    }
  };

  return (
    <main className="w-screen h-screen flex justify-center overflow-x-hidden items-center p-4 bg-[#121212] font-inter">
      {/* Form container with dark background, rounded corners, and shadow */}
      <div className="bg-[#1e1e1e] p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <h2 className="text-center text-3xl font-bold">قطعه کد جدید</h2>

        <form className="space-y-4">
          <InputLabel
            value={state.title}
            type={"text"}
            setValue={handleChangeInput}
            id={"title"}
            label={"نام قطعه کد"}
            placeholder={"عنوان"}
          />
          <InputLabel
            value={state.description}
            type={"text"}
            setValue={handleChangeInput}
            id={"description"}
            label={"توضیحات قطعه کد"}
            placeholder={"توضیحات کوتاه"}
          />
          <textarea
            name="code"
            className="w-full pr-5 pl-4 h-96 py-3 bg-gray-800 text-gray-600 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-50 text-left"
            dir="ltr"
            placeholder="کد مورد نظر..."
            value={state.code}
            onChange={handleChangeInput}
          />
          <InputLabel
            value={state.language}
            type={"text"}
            setValue={handleChangeInput}
            id={"language"}
            label={"زبان برنامه نویسی"}
            placeholder={"زبان برنامه نویسی مورد نظر"}
          />

          {state.error && (
            <p className="text-red-500 text-sm text-center">{state.error}</p>
          )}
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              editSnippetSubmit(state, setState, router, setSnippets, snippetId);
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-full transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <SquareCode size={20} />
            ثبت
          </button>
        </form>
      </div>
    </main>
  );
};

export default EditSnippet;
