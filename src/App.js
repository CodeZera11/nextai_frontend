import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import GoogleCalendar from "./components/GoogleCalendar";

function App() {
  return (
    <div className="bg-blue-200/10">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/google-calendar" element={<GoogleCalendar />} />
      </Routes>
    </div>
  );
}

export default App;
