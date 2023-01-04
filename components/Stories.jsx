import React from "react";
import Story from "./Story";
import { fakeUsersData } from "../fakeData";
import { useSession } from "next-auth/react";

function Stories() {
  const { data: session } = useSession();
  return (
    <div className="flex items-center space-x-2 my-4 p-6 bg-white overflow-x-scroll border border-gray-200 rounded-sm scrollbar scrollbar-thin scrollbar-thumb-black scrollbar-rounded-md">
      {session && (
        <Story
          key={session?.user?.uid}
          username={session?.user?.name}
          avatar={session?.user.image}
        />
      )}
      {fakeUsersData.map((profile) => (
        <Story
          key={profile.id}
          username={profile.username}
          avatar={profile.avatar}
        />
      ))}
    </div>
  );
}

export default Stories;
