import axios from "axios";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Loader from "./Loader";
import { useState } from "react";
import Cookies from "js-cookie";

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
        decodedCode
      );
      if (response.data.success) {
        const access_token = response.data?.tokens?.access_token;
        const refresh_token = response.data?.tokens?.refresh_token;
        const expiry_date = response.data?.tokens?.expiry_date;
        Cookies.set("access_token", access_token);
        Cookies.set("refresh_token", refresh_token);
        Cookies.set("expiry_date", expiry_date);

        window.location.href = `${FRONTEND_URL}/google-calendar`;
      }
    } catch (error) {
      setRetry(true);
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
