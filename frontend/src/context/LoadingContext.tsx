import { ReactNode, createContext, useState } from "react";

interface LoaderContextValue {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

interface LoaderContextProviderProps {
  children: ReactNode;
}

export const LoaderContext = createContext<LoaderContextValue>({
  loading: false,
  setLoading: () => {},
});

const LoaderProvider = ({ children }: LoaderContextProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
