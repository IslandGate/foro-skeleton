"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface CopyToClipboardPopupProps {
  onClose: () => void;
}

export default function CopyToClipboardPopup({ onClose }: CopyToClipboardPopupProps) {
  const [isExiting, setIsExiting] = useState(false);

  // Auto‑close after 3 seconds (with exit animation)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      // Wait for exit animation to finish before calling onClose
      setTimeout(onClose, 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`
        fixed bottom-4 right-4 z-50
        transform transition-all duration-300 ease-out
        ${isExiting ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"}
      `}
    >
      <div className="flex flex-row rounded-lg bg-dark-cream px-5 py-3 shadow-lg gap-2">
        <span className="font-space-grotesk text-m text-black font-medium">
          Copied to clipboard!
        </span>
        <Image
          height={20}
          width={20}
          src="/dashboard-assets/copy-to-clipboard.svg"
          alt="copy-to-clipboard icon"
        ></Image>
      </div>
    </div>
  );
}
