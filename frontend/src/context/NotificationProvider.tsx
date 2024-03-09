import { ReactNode, createContext, useState } from "react";

interface NotificationContextType {
  notificationToggle: boolean;
  setNotificationToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationContext = createContext<NotificationContextType>({
  notificationToggle: false,
  setNotificationToggle: () => {}
});


export const NotificationProvider = ({children}: NotificationProviderProps) => {
  const [notificationToggle, setNotificationToggle] = useState<boolean>(false);
  
  return (
    <NotificationContext.Provider
      value={{notificationToggle, setNotificationToggle}}
    >
      {children}
    </NotificationContext.Provider>
  );
};
