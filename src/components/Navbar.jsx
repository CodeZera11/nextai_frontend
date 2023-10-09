import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="max-w-6xl sm:px-10 pt-10 flex flex-col sm:flex-row items-center justify-start mx-auto gap-5 sm:gap-10">
      <Link
        to={"/"}
        className="font-bold p-2 sm:p-4 text-lg bg-emerald-500/10 rounded-lg"
      >
        Home
      </Link>
      <Link
        to={"/google-calendar"}
        className="font-bold p-2 sm:p-4 text-lg bg-pink-500/10 rounded-lg"
      >
        Calendar
      </Link>
    </div>
  );
};

export default Navbar;
