import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import Loader from "./Loader";
import EventCard from "./EventCard";

const GoogleCalendar = () => {
  const [searchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  let code;

  const fetchEvents = async (decodedCode) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/get-events",
        decodedCode
      );
      toast.success(response.data.msg);
      setEvents(response.data.events);
    } catch (error) {
      toast.error("Something went wrong! Please try again later");
    } finally {
      setLoading(false);
    }
  };

  const generateAuthUrl = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/google`);

      window.location.href = response.data;
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
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

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-6xl mx-auto p-10 pb-10">
      <h1 className="text-5xl sm:text-6xl text-emerald-600 bg-emerald-600/10 rounded-xl text-center p-5 font-semibold">
        Upcoming Events
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-10">
        {events.map((event, i) => (
          <EventCard key={i} event={event} />
        ))}
      </div>
    </div>
  );
};

export default GoogleCalendar;
