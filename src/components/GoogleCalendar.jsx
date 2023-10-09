import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import Loader from "./Loader";
import EventCard from "./EventCard";
import Cookies from "js-cookie";

const GoogleCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  const checkUserSignInStatus = async () => {
    try {
      const response = await axios.get("http://localhost:8000/check-signin", {
        withCredentials: true,
      });

      if (response.data.signedIn) {
        setSignedIn(true);
      }

      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUserSignInStatus();
  }, []);

  const fetchEvents = async (decodedCode) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/get-events",
        decodedCode
      );
      setEvents(response.data.events);
    } catch (error) {
      toast.error("Something went wrong! Please try again later");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/generateAuthUrl`);

      window.location.href = response.data;
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-6xl mx-auto p-10 pb-10">
      <h1 className="text-5xl sm:text-6xl text-emerald-600 bg-emerald-600/10 rounded-xl text-center p-5 font-semibold">
        Upcoming Events
      </h1>

      {!signedIn ? (
        <div className="mt-10 flex items-center justify-center gap-5">
          <p className="font-bold text-xl">Please Signin to Continue</p>
          <button
            onClick={handleSignIn}
            className="bg-black text-white px-4 py-2 rounded-lg font-bold hover:text-blue-200 transition-colors duration-150 ease-out"
          >
            Sign In
          </button>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-10">
          {events.map((event, i) => (
            <EventCard key={i} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GoogleCalendar;
