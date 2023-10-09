import axios from "axios";
import React from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "./Loader";

const SignIn = () => {
  const [searchParams] = useSearchParams();

  const code = searchParams.get("code");

  const generateTokens = async (decodedCode) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/generateTokens",
        decodedCode,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);

      if (response.data.success) {
        window.location.href = "http://localhost:3000/google-calendar";
      }
    } catch (error) {
      console.log(error);
      window.location.href = "http://localhost:3000/google-calendar";
    }
  };

  if (code) {
    const decodedCode = decodeURIComponent(code);
    generateTokens(decodedCode);
  }

  return <Loader />;
};

export default SignIn;
