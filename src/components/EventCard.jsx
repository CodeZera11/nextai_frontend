import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import { colorCodes } from "../constants/color-codes";

function formatDate(datetimeString) {
  const date = new Date(datetimeString);
  const formattedDate = format(date, "dd MMM, HH:mm");
  return formattedDate;
}

const EventCard = ({ event }) => {
  const { colorId, summary, description, start, end, htmlLink } = event;

  const formattedStartDate = formatDate(start.dateTime);
  const formattedEndDate = formatDate(end.dateTime);

  console.log(event);

  const color = colorCodes[colorId]?.background || "#e1e1e1";

  return (
    <div className="hover:shadow-xl transition-all duration-500 rounded-xl flex border">
      <div
        style={{ backgroundColor: color }}
        className={`h-full w-3 rounded-tl-xl rounded-bl-xl`}
      />
      <div className="flex flex-col gap-2 p-10 flex-1">
        <p className="text-gray-400 text-start">
          {formattedStartDate} - {formattedEndDate}
        </p>
        <h2 className="font-semibold text-lg">{summary}</h2>
        <p className="text-gray-400 text-start">{description}</p>
      </div>
      <div className="p-2 flex flex-col justify-between h-full">
        <div className="flex gap-4 items-center">
          {event.location && (
            <Link
              to={`https://google.com/maps?q=${event.location}`}
              target="_blank"
            >
              <img
                src="/maps.png"
                alt="google maps"
                className="w-[30px] h-[30px]"
              />
            </Link>
          )}
          {event.hangoutLink && (
            <Link to={event.hangoutLink} target="_blank">
              <img
                src="/gmeet.png"
                alt="google meet"
                className="w-[30px] h-[30px]"
              />
            </Link>
          )}
          <Link
            to={htmlLink}
            target="_blank"
            className="hover:text-blue-600 hover:underline underline-offset-4 flex justify-center "
          >
            Check Event
            <ArrowUpRight className="" />
          </Link>
        </div>
        <div className="flex gap-1">
          {event.attendees &&
            event.attendees.length > 0 &&
            event.attendees.map((attendee) => (
              <img
                key={attendee.email}
                src="/profile.jpeg"
                alt="profile"
                className="w-[30px] h-[30px] rounded-full"
                srcset=""
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
