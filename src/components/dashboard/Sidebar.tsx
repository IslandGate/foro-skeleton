"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface SideBarItem {
    label: string;
    href: string;
    iconSrc: string;
}

const mainLinks: SideBarItem[] = [
    {
        label: "Popular Competitions",
        href: "/popular-competitions",
        iconSrc: "/dashboard-assets/sidebar-assets/PopularCompetitionsIcon.svg",
    },
    {
        label: "Your Saved Competitions",
        href: "/your-saved-competitions",
        iconSrc: "/dashboard-assets/sidebar-assets/YourSavedCompetitionsIcon.svg"
    },
];

const bottomLinks: SideBarItem[] = [
    {
        label: "Settings",
        href: "/settings",
        iconSrc: "/dashboard-assets/sidebar-assets/SettingsIcon.svg",
    },
    {
        label: "Back",
        href: "/back",
        iconSrc: "/dashboard-assets/sidebar-assets/back-arrow.svg",
    }
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()
    return (
      <aside
        className={`relative flex flex-col h-screen bg-dark-cream transition-all duration-300 ${
          isOpen ? "w-64 px-5" : "w-16 px-3"
        } py-8 font-sans text-black`}
      >
        {/* Toggle expand button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-0 translate-x-1/2 top-1/2 transform -translate-y-1/2 bg-dark-cream brightness-85 hover:bg-dark-cream hover:brightness-80 transition-all duration-300 ease-in-out hover:scale-105 rounded-r-md rounded-l-md py-6 px-1 flex items-center justify-center cursor-pointer shadow-sm z-10"
          aria-label="Toggle Sidebar"
        >
          <span className="text-xl font-bold">{isOpen ? "‹" : "›"}</span>
        </button>

        {/* Top section logo */}
        <div
          className={`mb-12 flex ${isOpen ? "justify-start pl-1" : "justify-center"} w-full transition-all duration-300`}
        >
          <button
            onClick={() => router.refresh()}
            className="focus:outline-none cursor-pointer"
            aria-label="Refresh page"
          >
            {isOpen ? (
              <Image
                src="/marketing-page-assets/il-foro-logo.png"
                alt="Il Foro Logo"
                width={120}
                height={65}
                className="object-contain transition-all ease-in-out hover:scale-105 duration-300"
                priority
              />
            ) : (
              <Image
                src="/dashboard-assets/sidebar-assets/il-foro-logo-small.svg"
                alt="Il Foro Face Icon"
                width={36}
                height={36}
                className="object-contain transition-all duration-300 ease-in-out hover:scale-105"
                priority
              />
            )}
          </button>
        </div>

        {/* Middle Section */}
        <nav className="flex flex-col gap-6 w-full">
          {mainLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center hover:opacity-70 transition-all duration-300 ease-in-out hover:scale-105 ${
                isOpen ? "justify-start" : "justify-center"
              }`}
            >
              <div className="w-6 h-6 relative shrink-0">
                <Image
                  src={link.iconSrc}
                  alt={`${link.label} icon`}
                  fill
                  className="object-contain transition-all duration-300 ease-in-out hover:scale-105"
                />
              </div>

              <div
                className={`flex items-center overflow-hidden transition-all duration-300 ${
                  isOpen ? "w-48 ml-4 opacity-100" : "w-0 ml-0 opacity-0"
                }`}
              >
                <span className="font-medium text-sm tracking-wide whitespace-nowrap">
                  {link.label}
                </span>
              </div>
            </Link>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="mt-auto flex flex-col gap-6 w-full">
          <div className="flex justify-center w-full mb-1">
            <hr
              className={`border-black/30 transition-all duration-300 ${isOpen ? "w-full" : "w-8"}`}
            />
          </div>

          {bottomLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center hover:opacity-70 transition-all duration-300 ease-in-out hover:scale-105 ${
                isOpen ? "justify-start" : "justify-center"
              }`}
            >
              <div className="w-6 h-6 relative shrink-0">
                <Image
                  src={link.iconSrc}
                  alt={`${link.label} icon`}
                  fill
                  className="object-contain transition-all duration-300 ease-in-out hover:scale-105"
                />
              </div>

              <div
                className={`flex items-center overflow-hidden transition-all duration-300 ${
                  isOpen ? "w-48 ml-4 opacity-100" : "w-0 ml-0 opacity-0"
                }`}
              >
                <span className="font-medium text-sm tracking-wide whitespace-nowrap">
                  {link.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    );
}