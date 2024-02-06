import Balance from "../components/Balance";
import Users from "../components/Users";

const Dashboard = () => {
  return (
    <div className="px-12">
      <div className="m-8">
        <Balance value={10000} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
