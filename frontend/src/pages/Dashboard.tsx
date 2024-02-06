import Balance from "../components/Balance";

const Dashboard = () => {
  return (
    <div className="px-12">
      <div className="m-8">
        <Balance value={10000} />
      </div>
    </div>
  );
};

export default Dashboard;
