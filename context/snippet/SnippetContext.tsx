"use client";
import { getCookieValue } from "@/lib/auth/jwt";
import React, { createContext, useContext, useEffect, useState } from "react";

const snippetContext = createContext<Object | null>(null);

const SnippetProvider = ({ children }) => {
  const [snippets, setSnippets] = useState([]);
  useEffect(() => {
    fetchSnippets();
  }, []);

  async function fetchSnippets() {
    // const session = getCookieValue("session");

    try {
      const res = await fetch("http://127.0.0.1:5000/snippet", {
        credentials: 'include'
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "خطایی رخ داده!");

      setSnippets(data.userSnippets);
    } catch (err) {
      console.error("🔥 Snippet fetch error:", err.message);
    }
  }

  return (
    <snippetContext.Provider
      value={{
        snippets,
      }}
    >
      {children}
    </snippetContext.Provider>
  );
};
export const useSnippet = () => useContext(snippetContext);

export default SnippetProvider;
