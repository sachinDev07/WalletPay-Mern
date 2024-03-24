import { useState } from "react";

const useLoader = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const setError = (error: string | null) => {
    setIsError(error);
  };

  const clearError = () => {
    setIsError(null);
  };

  return { isLoading, startLoading, stopLoading, isError, setError, clearError };
};

export default useLoader;
