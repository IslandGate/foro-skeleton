import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

]

const bottomLinks: SideBarItem[] = [
    
    {
        label: "Settings", 
        href: "/settings",
        iconSrc: "/dashboard-assets/sidebar-assets/SettingsIcon.svg",
    },
]

export default function Sidebar() {
     {
        const [isOpen, setIsOpen] = useState(false)
        return (
            <aside>
                
            {/* Toggle expand button */}
            <button>
              <span> </span>
            </button>

            {/* Top section logo */}
            <div>
                <Link>
                </Link>
            </div>

            {/* Middle Section */}
            <nav>
              {mainLinks.map((link) => (
                  <Link key={link.label} href={link.href}>
                      <Image>
                      </Image>
                  <span>
                    {link.label}
                  </span>
                </Link>
              ))}
                </nav>
                
                { /* Bottom section */}
                <div>
                    {bottomLinks.map(link) => {
                        <Link key={link.label} href={link.href}>
                            <Image>
                            </Image>

                            <span>
                                {link.label}
                            </span>
                        </Link>
                }}
                </div>
                
          </aside>
        ); 

    }
}