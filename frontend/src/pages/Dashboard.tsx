import { useEffect, useState } from "react";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axiosInstance from "../api/axios";

const Dashboard = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);

  async function getUserBalanceApi() {
    try {
      const response = await axiosInstance.get<{
        balance: number;
        message: string;
      }>("/account/balance", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        }
      });
      const data = response.data;
      setBalance(data.balance);
      setRefresh(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUserBalanceApi();
  }, []);

  useEffect(() => {
    if (refresh) {
      const refreshTimeout = setTimeout(() => {
        getUserBalanceApi();
      }, 1000);
      return () => clearTimeout(refreshTimeout);
    }
  }, [refresh]);

  const handleRefreshIcon = () => {
    setRefresh(true);
  };

  return (
    <div className="md:px-44">
      <div className="px-4 md:px-0 mt-4">
        <Balance onclick={handleRefreshIcon} refresh={refresh} value={balance} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
