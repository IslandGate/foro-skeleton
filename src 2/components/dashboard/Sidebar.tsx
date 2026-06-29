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
    label: "Dashboard",
    href: "/dashboard",
    iconSrc: "/dashboard-assets/sidebar-assets/dashboard-icon.svg",
  },
  {
    label: "Popular Competitions",
    href: "/dashboard/popular",
    iconSrc: "/dashboard-assets/sidebar-assets/PopularCompetitionsIcon.svg",
  },
  {
    label: "Your Saved Competitions",
    href: "/dashboard/saved",
    iconSrc: "/dashboard-assets/sidebar-assets/YourSavedCompetitionsIcon.svg",
  },
];

const bottomLinks: SideBarItem[] = [
    {
        label: "Settings",
        href: "/dashboard/settings",
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
    const router = useRouter();

    return (
      <aside
        className={`sticky flex flex-col h-screen top-0 bg-dark-cream transition-all duration-300 ${
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
        <div className="mb-10 relative h-12 w-full flex items-center">
          <button
            onClick={() => router.refresh()}
            className="focus:outline-none cursor-pointer w-full h-full relative"
            aria-label="Refresh page"
          >
            {/* Large Logo */}
            <div 
              className={`absolute inset-0 pt-2 pl-3 flex items-center justify-start transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <Image
                src="/marketing-page-assets/il-foro-logo.png"
                alt="Il Foro Logo"
                width={120}
                height={65}
                className="object-contain transition-transform duration-300"
                priority
              />
            </div>

            {/* Small Logo */}
            <div 
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <Image
                src="/dashboard-assets/sidebar-assets/il-foro-logo-small.svg"
                alt="Il Foro Face Icon"
                width={36}
                height={36}
                className="object-contain transition-transform duration-300"
                priority
              />
            </div>
          </button>
        </div>

        {/* Middle Section */}
        <nav className="flex flex-col gap-6 w-full">
          {mainLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center hover:opacity-70 transition-all duration-300 ease-in-out ${
                isOpen ? "justify-start" : "justify-center"
              }`}
            >
              <div className="w-6 h-6 relative shrink-0">
                <Image
                  src={link.iconSrc}
                  alt={`${link.label} icon`}
                  fill
                  className="object-contain"
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
              className={`flex items-center hover:opacity-70 transition-all duration-300 ease-in-out ${
                isOpen ? "justify-start" : "justify-center"
              }`}
            >
              <div className="w-6 h-6 relative shrink-0">
                <Image
                  src={link.iconSrc}
                  alt={`${link.label} icon`}
                  fill
                  className="object-contain transition-all duration-300 ease-in-out"
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