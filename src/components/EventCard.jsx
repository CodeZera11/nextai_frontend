import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import { colorCodes } from "../constants/color-codes";
import { marked } from "marked";

function formatDate(datetimeString) {
  const date = new Date(datetimeString);
  const formattedDate = format(date, "dd MMM, HH:mm");
  return formattedDate;
}

const EventCard = ({ event }) => {
  console.log(event);
  const { colorId, summary, description, start, end, htmlLink } = event;

  const formattedStartDate = formatDate(start.dateTime);
  const formattedEndDate = formatDate(end.dateTime);

  const color = colorCodes[colorId]?.background || "#e1e1e1";

  let plainDesc;

  if (description) {
    const html = marked(description);
    const parser = new DOMParser();
    plainDesc = parser.parseFromString(html, "text/html").body.textContent;
  }

  return (
    <div className="hover:shadow-xl transition-all duration-500 rounded-xl flex flex-col sm:flex-row border">
      <div
        style={{ backgroundColor: color }}
        className={`h-full w-3 rounded-tl-xl rounded-bl-xl`}
      />
      <div className="flex flex-col gap-2 p-10 flex-1">
        <p className="text-gray-400 text-start">
          {formattedStartDate} - {formattedEndDate}
        </p>
        <h2 className="font-semibold text-lg">{summary}</h2>
        <p className="text-gray-400 text-start line-clamp-2">{plainDesc}</p>
      </div>
      <div className="p-2 flex flex-col justify-between h-full">
        <div className="flex gap-2 sm:gap-4 items-center justify-end sm:justify-start">
          {event.location && (
            <Link
              to={`https://google.com/maps?q=${event.location}`}
              target="_blank"
              className="bg-emerald-600/20 p-1 rounded-lg"
            >
              <img
                src="/maps.png"
                alt="google maps"
                className="w-[30px] h-[30px]"
              />
            </Link>
          )}
          {event.hangoutLink && (
            <Link
              to={event.hangoutLink}
              target="_blank"
              className="bg-blue-600/20 p-[0.15rem] rounded-lg"
            >
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
            className="bg-pink-600/10 transition-all duration-300 ease-out p-1 sm:p-2 rounded-lg flex justify-center items-center font-bold"
          >
            Check Event
            <ArrowRight size={20} />
          </Link>
        </div>
        <div className="flex gap-1 ml-auto">
          {event.attendees && event.attendees.length > 0 ? (
            <p className="font-semibold text-gray-400 xsm:ml-auto p-2">
              {event.attendees?.length} Attendees
            </p>
          ) : (
            <p className="font-semibold text-gray-400 ml-auto text-center p-2">
              No Attendees
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
