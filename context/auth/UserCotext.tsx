"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface User {
  fullName: string;
  email: string;
  languages: string[];
}

interface UserContextType {
  user: User | null;
  // setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(!user) fetchUser();
  }, []);

  async function fetchUser() {
    setLoading(true);
    const res = await fetch("http://127.0.0.1:5000/user/me", {
      credentials: "include"
    });
    const data = await res.json();
    console.log(data)
    setUser(data.user);
    setLoading(false);
  }

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserContextProvider;
