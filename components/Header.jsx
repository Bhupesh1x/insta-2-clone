import Image from "next/image";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const serachIcon =
    "https://img.icons8.com/ios-glyphs/30/6A7280/search--v1.png";
  const homeIcon = "https://img.icons8.com/material-rounded/24/null/home.png";
  const menuIcon =
    "https://img.icons8.com/material-rounded/24/null/menu--v1.png";
  const planeIcon =
    "https://img.icons8.com/material-outlined/24/null/paper-plane.png";
  const plusIcon =
    "https://img.icons8.com/material-outlined/24/null/plus--v1.png";
  const userIcon =
    "https://img.icons8.com/material-outlined/24/null/user-group-man-woman.png";
  const heartIcon =
    "https://img.icons8.com/material-outlined/24/null/hearts.png";
  return (
    <header className=" shadow-sm sticky top-0 bg-white z-50 ">
      <div className="flex justify-between items-center xl:max-w-6xl mx-auto px-5 md:max-w-3xl">
        <div className="relative w-24 h-24 hidden lg:inline-grid cursor-pointer">
          <Image
            src="https://links.papareact.com/ocw"
            alt="Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="relative w-10 h-24 lg:hidden cursor-pointer">
          <Image
            src="https://links.papareact.com/jjm"
            alt="Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* Search Bar */}
        <div className="flex items-center border border-gray-300 rounded-md p-1 focus-within:border-black max-w-xl">
          <div className="relative w-5 h-5 ml-2">
            <Image
              src={serachIcon}
              alt="Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <input
            className="outline-none flex-1 bg-transparent ml-2 sm:text-sm"
            placeholder="Search"
          />
        </div>

        <div className="flex items-center justify-end space-x-4">
          <Icons src={homeIcon} />
          <div className="relative w-6 h-6 md:hidden">
            {session ? (
              <div className="plusIconButtons" onClick={() => setOpen(true)}>
                <Image
                  src={plusIcon}
                  alt="Logo"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            ) : (
              <Image
                src={menuIcon}
                alt="Logo"
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>
          {session ? (
            <>
              <div className="relative  navButtons">
                <Icons src={planeIcon} />
                <div className="absolute -top-2 -right-1 h-5 w-5 bg-red-400 flex items-center justify-center rounded-full text-white text-xs animate-pulse">
                  3
                </div>
              </div>

              <div
                className="relative navButtons"
                onClick={() => setOpen(true)}
              >
                <Image
                  src={plusIcon}
                  alt="Logo"
                  layout="fill"
                  objectFit="contain"
                />
              </div>

              <Icons src={userIcon} />
              <Icons src={heartIcon} />
              <div
                className="relative h-10 w-10 cursor-pointer"
                onClick={signOut}
              >
                <Image
                  src={session?.user?.image}
                  alt="Profile pic"
                  layout="fill"
                  className="rounded-full"
                />
              </div>
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

function Icons({ src }) {
  return (
    <>
      <div className="relative navButtons">
        <Image src={src} alt="Logo" layout="fill" objectFit="contain" />
      </div>
    </>
  );
}
