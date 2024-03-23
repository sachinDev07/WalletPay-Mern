import { ReactNode, createContext, useState } from "react";

interface ShowProfileContextType {
  showProfileMenu: boolean;
  setShowProfileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ShowProfileProviderProps {
  children: ReactNode;
}
export const ShowProfileContext = createContext<ShowProfileContextType>({
  showProfileMenu: false,
  setShowProfileMenu: () => {},
});

const ShowProfileProvider = ({ children }: ShowProfileProviderProps) => {
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);

  return (
    <ShowProfileContext.Provider
      value={{ showProfileMenu, setShowProfileMenu }}
    >
      {children}
    </ShowProfileContext.Provider>
  );
};

export default ShowProfileProvider;
