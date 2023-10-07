import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="max-w-2xl mx-auto p-20 flex gap-5 items-center justify-center">
      <h1 className="font-bold">Want to integrate with google calendar?</h1>
      <Link
        to={"/google-calendar"}
        className="bg-black text-white px-4 py-2 rounded-lg font-bold hover:text-green-400 transition-colors duration-150 ease-out"
      >
        Click here
      </Link>
    </div>
  );
}

export default App;
