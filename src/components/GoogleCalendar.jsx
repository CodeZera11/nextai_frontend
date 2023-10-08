import axios from "axios";
import { useEffect } from "react";
import { redirect, useSearchParams } from "react-router-dom";

const GoogleCalendar = () => {
  const [searchParams] = useSearchParams();

  let code;

  async function fetchEvents(decodedCode) {
    try {
      const response = await axios.post(
        "http://localhost:8000/get-events",
        decodedCode
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const generateAuthUrl = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/google`);

      window.location.href = response.data;
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (searchParams.get("code")) {
      code = searchParams.get("code");

      const decodedCode = decodeURIComponent(code);
      fetchEvents(decodedCode);
      window.history.replaceState(null, "", window.location.pathname);
    } else {
      generateAuthUrl();
    }
  }, []);

  return <div className="p-20 shadow-2xl">Fetching Data...</div>;
};

export default GoogleCalendar;
