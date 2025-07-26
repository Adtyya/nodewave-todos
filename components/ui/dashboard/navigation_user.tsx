/* eslint-disable @next/next/no-img-element */
"use client";

import { useAuth } from "@/store/useAuth";
import React, { useState } from "react";
import Link from "next/link";
import { TypographyHeading } from "@/components/ui/typography";
import DropdownMenu from "@/components/ui/dropdown";

const menuItems = [
  {
    label: "Log out",
    onClick: () => {
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    },
  },
];

const NavigationUser: React.FC = () => {
  const auth = useAuth();
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);

  return (
    <>
      <header className="relative z-20 w-full border-b border-slate-200 bg-white/90 shadow-lg shadow-slate-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav
            aria-label="main navigation"
            className="flex h-[5.5rem] items-center justify-between font-medium text-slate-700"
            role="navigation"
          >
            <Link href="#">
              <TypographyHeading as="h3">Dashboard</TypographyHeading>
            </Link>

            {/* Avatar */}
            <div className="ml-auto flex items-center px-6 lg:ml-0 lg:p-0">
              <DropdownMenu
                setIsOpen={setIsToggleOpen}
                isOpen={isToggleOpen}
                menuItems={menuItems}
              >
                <div
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-black"
                  onClick={() => setIsToggleOpen(true)}
                >
                  <img
                    src="https://i.pravatar.cc/40?img=55"
                    alt="user name"
                    title="user name"
                    width={40}
                    height={40}
                    className="max-w-full rounded-full"
                  />
                  <p>{auth.user?.fullName}</p>
                </div>
              </DropdownMenu>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default NavigationUser;
