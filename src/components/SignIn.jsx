import axios from "axios";
import React from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "./Loader";
import toast from "react-hot-toast";

const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const SignIn = () => {
  const [searchParams] = useSearchParams();

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
    } catch (error) {
      console.log(error);
      window.location.href = `${FRONTEND_URL}/google-calendar`;
    }
  };

  if (code) {
    const decodedCode = decodeURIComponent(code);
    generateTokens(decodedCode);
  }

  return <Loader />;
};

export default SignIn;
