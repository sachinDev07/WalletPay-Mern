import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export interface AuthContextType {
  auth: {
    id: string;
    role: string;
    firstname: string;
    lastname: string;
    accessToken: string;
    message: string;
  };
  setAuth: Dispatch<SetStateAction<AuthContextType["auth"]>>;
  persist: boolean;
  setPersist: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
  auth: {
    id: "",
    role: "",
    firstname: "",
    lastname: "",
    accessToken: "",
    message: "",
  },
  setAuth: () => {},
  persist: false,
  setPersist: () => {},
});

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [auth, setAuth] = useState<AuthContextType["auth"]>({
    id: "",
    role: "",
    firstname: "",
    lastname: "",
    accessToken: "",
    message: "",
  });

  const persistValue: string | null = localStorage.getItem("persist");
  const [persist, setPersist] = useState<boolean>(
    persistValue ? JSON.parse(persistValue) : false,
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
