import axios from "axios";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Loader from "./Loader";
import toast from "react-hot-toast";
import { useState } from "react";

const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const SignIn = () => {
  const [searchParams] = useSearchParams();
  const [retry, setRetry] = useState(false);

  const code = searchParams.get("code");

  const generateTokens = async (decodedCode) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/generateTokens`,
        decodedCode,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        window.location.href = `${FRONTEND_URL}/google-calendar`;
      }

      toast.error("Something went wrong!");
      setRetry(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (code) {
    const decodedCode = decodeURIComponent(code);
    generateTokens(decodedCode);
  }

  return (
    <div className="">
      {!retry && (
        <div className="flex items justify-center gap-10">
          Redirecting back to calendar page...
          <Loader />
        </div>
      )}

      {retry && (
        <div className="flex gap-2 items-center justify-center">
          Something went wrong!
          <Link to={"/google-calendar"} className="text-blue-500 underline">
            click here
          </Link>
        </div>
      )}
    </div>
  );
};

export default SignIn;
