import { ReactNode, createContext, useState } from "react";

interface UserProfileContextType {
  userProfileToggle: boolean;
  setUserProfileToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UserProfileModalProviderProps {
    children: ReactNode;
}
export const UserProfileModalContext = createContext<UserProfileContextType>({
  userProfileToggle: false,
  setUserProfileToggle: () => {},
});

const UserProfileModalProvider = ({ children }: UserProfileModalProviderProps) => {
    const [userProfileToggle, setUserProfileToggle] = useState<boolean>(false);

    return (
        <UserProfileModalContext.Provider value={{ userProfileToggle, setUserProfileToggle }}>
            {children}
        </UserProfileModalContext.Provider>
    )
}

export default UserProfileModalProvider;