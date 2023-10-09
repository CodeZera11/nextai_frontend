import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import GoogleCalendar from "./components/GoogleCalendar";
import SignIn from "./components/SignIn";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/google-calendar" element={<GoogleCalendar />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;
