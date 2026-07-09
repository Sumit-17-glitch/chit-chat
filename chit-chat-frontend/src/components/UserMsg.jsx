import React from "react";
import { nanoid } from "nanoid";

function UserMsg({message, userName}) {
  return (
    <div className="flex justify-end">
    <div className="max-w-[70%] rounded-2xl bg-orange-500 text-white shadow-md px-4 py-3">

      <p className="text-xs text-orange-100 mb-1">
        You
      </p>

      <p className="break-words whitespace-pre-wrap">
        {message}
      </p>

    </div>
  </div>
  );
}

export default UserMsg;
