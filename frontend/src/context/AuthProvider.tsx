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
    role:string;
    firstname: string;
    lastname: string;
    accessToken: string;
    message: string;
  };
  setAuth: Dispatch<SetStateAction<AuthContextType["auth"]>>;
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

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
