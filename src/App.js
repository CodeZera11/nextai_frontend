import axios from "axios";
import "./App.css";

function App() {
  const generateAuthUrl = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/google`);

      window.location.href = response.data;
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-20 flex gap-5 items-center justify-center">
      <h1 className="font-bold">Want to integrate with google calendar?</h1>
      <button
        onClick={generateAuthUrl}
        className="bg-black text-white px-4 py-2 rounded-lg font-bold hover:text-blue-200 transition-colors duration-150 ease-out"
      >
        Click here
      </button>
    </div>
  );
}

export default App;
