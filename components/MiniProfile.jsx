import { signOut, useSession } from "next-auth/react";
import React from "react";

function MiniProfile() {
  const { data: session } = useSession();
  return (
    <div className="mt-14 ml-12 flex items-center justify-between">
      <img
        src={session?.user?.image}
        alt=""
        className="h-14 w-14 rounded-full border border-gray-300 p-[3px]"
      />

      <div className="flex-1 mx-4">
        <p className="text-sm font-bold">{session?.user?.username}</p>
        <p className="text-xs text-gray-400">Welcome to instagram</p>
      </div>

      <button className="text-sm text-blue-400 font-semibold" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
}

export default MiniProfile;
