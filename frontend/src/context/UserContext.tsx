import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  id: number;
  email: string;
}

interface UserContexType {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  isLoggedIn: boolean;
}

const defaultUser = JSON.parse(localStorage.getItem("user"));
const defaultToken = localStorage.getItem("token");

export const UserContext = createContext<UserContexType>({
  user: defaultUser,
  setUser: () => {},
  token: defaultToken,
  setToken: () => {},
  setIsLoggedIn: () => {},
  isLoggedIn: false,
});

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(defaultUser);
  const [token, setToken] = useState(defaultToken);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <UserContext.Provider
      value={{ user, setUser, token, setToken, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  );
};

///custom hook
export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};
