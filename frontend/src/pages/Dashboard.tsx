import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Balance from "../components/Balance";
import Users from "../components/Users";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

const Dashboard = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const axiosPrivate = useAxiosPrivate();

  async function getUserBalanceApi() {
    try {
      const response = await axiosPrivate.get<{ balance: number; message: string }>(
        "/account/balance",
      );
      const data = response.data;
      setBalance(data.balance);
    } catch (error) {
      if (axios.isAxiosError<ValidationError>(error)) {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      }
      console.error(error);
    }
  }

  useEffect(() => {
    getUserBalanceApi();
  }, []);

  return (
    <div className="md:px-44">
      <div className="px-4 md:px-0 mt-4">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
