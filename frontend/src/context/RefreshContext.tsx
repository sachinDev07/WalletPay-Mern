import { ReactNode, createContext, useState } from "react";

interface RefreshContextValue {
  refresh: boolean;
  toggleRefresh: () => void;
}

interface RefreshContextProviderProps {
  children: ReactNode;
}

export const RefreshContext = createContext<RefreshContextValue>({
  refresh: false,
  toggleRefresh: () => {},
});

const RefreshProvider = ({ children }: RefreshContextProviderProps) => {
  const [refresh, setRefresh] = useState<boolean>(false);

  const toggleRefresh = () => setRefresh((prev) => !prev);

  return (
    <RefreshContext.Provider value={{ refresh, toggleRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};

export default RefreshProvider;
