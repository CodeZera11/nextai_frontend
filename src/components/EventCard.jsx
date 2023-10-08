import React from "react";
import { Link } from "react-router-dom";
import { MoveUpRight } from "lucide-react";

const EventCard = () => {
  return (
    <Link
      to={"/"}
      className="shadow-xl rounded-xl flex border hover:scale-105 transition-transform duration-300 ease-linear"
    >
      <div className="h-full bg-red-500 w-3 rounded-tl-xl rounded-bl-xl" />
      <div className="flex flex-col gap-2 p-10 flex-1">
        <p className="text-gray-400 text-start">14:30 - 15:30</p>
        <h2 className="font-semibold text-lg">Lunch with Mom</h2>
        <p className="text-gray-400 text-start">Home</p>
      </div>
      <div className="p-2">
        <MoveUpRight size={20} />
      </div>
    </Link>
  );
};

export default EventCard;
