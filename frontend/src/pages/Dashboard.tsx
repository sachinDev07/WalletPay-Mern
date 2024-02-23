import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Balance from "../components/Balance";
import Users from "../components/Users";


interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}


const Dashboard = () => {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    getUserBalanceApi();
  }, []);

  async function getUserBalanceApi() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.info("User is not authorized!");
      return;
    }
    try {
      const response = await axios.get<{ balance: number; message: string }>(
        "http://localhost:7001/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
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
