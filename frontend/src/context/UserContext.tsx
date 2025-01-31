import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  _id: number;
  email: string;
  firstname: string;
  lastname: string;
}

interface UserContexType {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  isLoggedIn: boolean;
}

const defaultToken = localStorage.getItem("token");
const defaultUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")!)
  : null;

export const UserContext = createContext<UserContexType>({
  user: defaultUser,
  setUser: () => {},
  token: defaultToken,
  setToken: () => {},
  setIsLoggedIn: () => {},
  isLoggedIn: false,
});

export const UserProvider = ({ children }: { children: JSX.Element }) => {
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
