import { useEffect, useState } from "react";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [balance, setBalance] = useState<number | null>();

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
      const response = await axios.get<{ balance: number }>(
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
      console.error(error);
    }
  }

  return (
    <div className="px-12">
      <div className="m-8">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
