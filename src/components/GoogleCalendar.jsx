import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";
import EventCard from "./EventCard";
import Cookies from "js-cookie";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const GoogleCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const checkUserSignInStatus = async () => {
    try {
      console.log("checking sign in status...");
      // const response = await axios.get(`${BACKEND_URL}/check-signin`, {
      //   withCredentials: true,
      // });
      // console.log(response.data);
      // if (response.data.signedIn) {
      //   fetchEvents();
      //   setSignedIn(true);
      // }
      const a = Cookies.get("access_token");
      const b = Cookies.get("refresh_token");
      const c = Cookies.get("expiry_date");

      if (a && b && c) {
        setSignedIn(true);
        fetchEvents();
      }
    } catch (error) {
      console.log({ checkSigninstatus: error });
    }
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const tokens = {
        access_token: Cookies.get("access_token"),
        refresh_token: Cookies.get("refresh_token"),
        expiry_date: Cookies.get("expiry_date"),
      };
      const response = await axios.post(`${BACKEND_URL}/get-events`, tokens, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setEvents(response.data.events);
    } catch (error) {
      toast.error("Something went wrong! Please try again later");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      setRedirecting(true);
      const response = await axios.get(`${BACKEND_URL}/generateAuthUrl`);
      window.location.href = response.data;
    } catch (error) {
      toast.error("Something Went Wrong!");
      console.log({ handleSignin: error });
    } finally {
      setRedirecting(false);
    }
  };

  useEffect(() => {
    checkUserSignInStatus();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-10 pb-10">
      <h1 className="text-5xl sm:text-6xl text-emerald-600 bg-emerald-600/10 rounded-xl text-center p-5 font-semibold">
        Upcoming Events
      </h1>

      {signedIn ? (
        <div className="mt-10 grid grid-cols-1 gap-10">
          {events.length > 0 ? (
            events.map((event, i) => <EventCard key={i} event={event} />)
          ) : loading ? (
            <div className="flex items-center justify-center gap-5">
              <h1 className="text-center font-bold text-xl">
                Fetching Your Upcoming Events!
              </h1>
              <Loader />
            </div>
          ) : (
            <h1 className="text-center font-bold text-xl">
              No Upcoming Events!
            </h1>
          )}
        </div>
      ) : (
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
          <p className="font-bold text-xl">Please Signin to Continue</p>
          <button
            onClick={handleSignIn}
            disabled={redirecting}
            className="bg-black text-white px-4 py-2 rounded-lg font-bold hover:text-blue-200 transition-colors duration-150 ease-out"
          >
            {redirecting ? "redirecting..." : "Sign In"}
          </button>
        </div>
      )}
    </div>
  );
};

export default GoogleCalendar;
