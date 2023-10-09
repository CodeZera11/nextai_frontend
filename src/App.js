import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import GoogleCalendar from "./components/GoogleCalendar";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/google-calendar" element={<GoogleCalendar />} />
      </Routes>
  );
}

export default App;
