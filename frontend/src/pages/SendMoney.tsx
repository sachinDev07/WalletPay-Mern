import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

type ResponseType = {
  message: string;
};

interface ValidationError {
  error: {
    message: string;
  }[];
  message: string;
  errors: Record<string, string[]>;
}

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") as string;
  const name = searchParams.get("name") as string;
  const navigate = useNavigate();

  const [amount, setAmount] = useState<number>(0);

  const handleAmount = async () => {
    try {
      const response = await axios.post<ResponseType>(
        "http://localhost:7001/api/v1/account/transfer",
        { amount, to: id },
        {
          withCredentials: true,
        },
      );
      const data = response.data;
      toast.success(data.message);
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError<ValidationError>(error)) {
        if (error.response) {
          if (error.response.data) {
            toast.info(error.response.data.message);
          }
          if (error.response.data.error) {
            toast.error(error.response.data.error[0].message);
          }
        }
      } else {
        toast.error("An error occurred");
      }
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center h-[calc(100vh-3.5rem)] bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground p-4 space-y-8  min-w-[300px] md:min-w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 px-6 pt-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="px-6 pb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {/* {name?.charAt(0).toUpperCase()} */}
                </span>
              </div>
              <h3 className="text-3xl font-semibold">
                {/* {name.charAt(0).toUpperCase() + name.substring(1)} */}
              </h3>
            </div>
            <div className="space-y-6 mt-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  type="number"
                  defaultValue={0}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                  onChange={(e) => setAmount(+e.target.value)}
                />
              </div>
              <button
                onClick={handleAmount}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white hover:bg-green-700 duration-150 ease-linear"
              >
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
