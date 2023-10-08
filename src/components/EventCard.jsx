import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const EventCard = () => {
  return (
    <Link
      to={"/"}
      className="hover:shadow-xl transition-all duration-500 rounded-xl flex border"
    >
      <div className="h-full bg-red-500 w-3 rounded-tl-xl rounded-bl-xl" />
      <div className="flex flex-col gap-2 p-10 flex-1">
        <p className="text-gray-400 text-start">14:30 - 15:30</p>
        <h2 className="font-semibold text-lg">Lunch with Mom</h2>
        <p className="text-gray-400 text-start">Home</p>
      </div>
      <div className="p-2 flex flex-col justify-between h-full">
        <div className="hover:text-blue-600 hover:underline underline-offset-4 flex justify-center">
          Check Event
          <ArrowUpRight className="" />
        </div>
        <div className="flex gap-1">
          <img
            src="/profile.jpeg"
            alt="profile"
            className="w-[30px] h-[30px] rounded-full"
            srcset=""
          />
          <img
            src="/profile.jpeg"
            alt="profile"
            className="w-[30px] h-[30px] rounded-full"
            srcset=""
          />
          <img
            src="/profile.jpeg"
            alt="profile"
            className="w-[30px] h-[30px] rounded-full"
            srcset=""
          />
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
