import { ReactNode, createContext, useState } from "react";

interface LoaderContextValue {
  loading: boolean;
  loadingToggle: () => void;
}

interface LoaderContextProviderProps {
  children: ReactNode;
}

export const LoaderContext = createContext<LoaderContextValue>({
  loading: false,
  loadingToggle: () => {},
});

const LoaderProvider = ({ children }: LoaderContextProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const loadingToggle = () => setLoading((prev) => !prev);

  return (
    <LoaderContext.Provider value={{ loading, loadingToggle }}>
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
