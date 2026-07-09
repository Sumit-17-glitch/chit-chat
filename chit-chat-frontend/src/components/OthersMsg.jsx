import React from "react";
import { nanoid } from "nanoid";

function OthersMsg({ message, userName }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[70%] rounded-2xl bg-white shadow-md px-4 py-3">

        <p className="text-xs font-semibold text-orange-600 mb-1">
          {userName}
        </p>

        <p className="text-gray-800 break-words">
          {message}
        </p>

      </div>
    </div>
  );
}

export default OthersMsg;
