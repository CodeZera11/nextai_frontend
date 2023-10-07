import axios from "axios";

const GoogleCalendar = () => {
  // const [searchParams] = useSearchParams();
  // const code = searchParams.get("code");
  // console.log(code.replace("/", "%"));

  const searchParams = window.location.search;
  const code = searchParams.split("code=")[1].split("&")[0];

  console.log(code);

  async function fetchEvents(code) {
    try {
      const response = await axios.post(
        "http://localhost:8000/get-events",
        code.replace("/", "%")
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (code) {
    fetchEvents(code);
  }

  return <div className="p-20 shadow-2xl">Events data here</div>;
};

export default GoogleCalendar;
