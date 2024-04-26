import React, { createContext, useContext, useState } from "react";

interface User {
  id: number;
  email: string;
}

interface UserContexType {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
}

const defaultUser = JSON.parse(localStorage.getItem("user"));
const defaultToken = localStorage.getItem("token");

export const UserContext = createContext<UserContexType>({
  user: defaultUser,
  setUser: () => {},
  token: defaultToken,
  setToken: () => {},
});

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(defaultUser);
  const [token, setToken] = useState(defaultToken);
  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

///custom hook
export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};
