"use client";

import React, { useEffect, useRef } from "react";

type MenuItem = {
  label: string;
  onClick: () => void;
};

type DropdownMenuProps = {
  children: React.ReactNode;
  menuItems: MenuItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  menuItems,
  isOpen,
  setIsOpen,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Menutup menu saat klik di luar dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <div className="relative inline-flex" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide transition duration-300 rounded focus-visible:outline-none"
      >
        <span className="cursor-pointer">{children}</span>
      </button>

      {isOpen && (
        <ul className="absolute z-20 flex flex-col py-2 mt-1 list-none bg-white rounded shadow-md w-52 top-full shadow-slate-500/10">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className="w-full text-left flex items-start justify-start gap-2 p-2 px-5 text-slate-500 hover:bg-blue-50 hover:text-blue-500 focus:bg-blue-50 focus:text-blue-600 focus:outline-none"
              >
                <span className="flex flex-col gap-1 overflow-hidden whitespace-nowrap">
                  <span className="leading-5 truncate">{item.label}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
