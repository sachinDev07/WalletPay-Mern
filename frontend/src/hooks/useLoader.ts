import { useState } from "react";

const useLoader = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  }

  return { isLoading, startLoading, stopLoading };
};

export default useLoader;
