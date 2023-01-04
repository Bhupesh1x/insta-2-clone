import React from "react";

function Story({ username, avatar }) {
  return (
    <div>
      <img
        src={avatar}
        alt=""
        className="w-14 h-14 rounded-full p-[1.5px] border-2 border-red-500 hover:scale-110 transition ease-out duration-200 cursor-pointer"
      />
      <p className="text-xs w-14 truncate text-center">{username}</p>
    </div>
  );
}

export default Story;
