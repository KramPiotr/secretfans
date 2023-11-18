import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import SearchBar from "./SearchBar";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

interface HeaderMenuLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Debug Contracts",
    href: "/debug",
  },
  {
    label: "Publisher dashboard",
    href: "/publisher",
  },
  {
    label: "Subscriber dashboard",
    href: "/subscriber",
  },
];

export const HeaderMenuLinks = () => {
  const router = useRouter();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = router.pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={`${
                isActive ? "bg-secondary shadow-md" : ""
              } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary px-0 sm:px-2">
      <div className="navbar-start w-auto">
        <Link href="/" passHref className="items-center gap-2 ml-4 mr-6 shrink-0">
          <div className="flex relative w-10 h-10">
            <Image alt="SF logo" className="cursor-pointer" fill src="/favicon.png" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">SecretFans</span>
            <span className="text-xs">Privacy first content sharing</span>
          </div>
        </Link>
      </div>
      <div className="navbar-center flex-grow justify-center">
        <SearchBar />
      </div>
      <div className="navbar-end mr-4" style={{width: "unset"}}>
        <RainbowKitCustomConnectButton />
        <div className="dropdown dropdown-end" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              <HeaderMenuLinks />
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
