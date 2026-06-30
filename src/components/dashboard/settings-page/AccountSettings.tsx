"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface AccountSettingsProps {
  onDelete?: () => void | Promise<void>;
  onLogout?: () => void | Promise<void>;
}

export default function AccountSettings({
  onDelete,
  onLogout,
}: AccountSettingsProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isToastExiting, setIsToastExiting] = useState(false);
  const [successIconSrc, setSuccessIconSrc] = useState<string | null>(null);

  React.useEffect(() => {
    if (!successMessage) return;
    setIsToastExiting(false);
    const exitTimer = setTimeout(() => setIsToastExiting(true), 3000);
    const clearTimer = setTimeout(() => setSuccessMessage(null), 3300);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(clearTimer);
    };
  }, [successMessage]);

  const handleConfirmDelete = async () => {
    setIsConfirmOpen(false);
    if (onDelete) {
      await onDelete();
    }
    setSuccessIconSrc("/icons/delete-account.svg");
    setSuccessMessage("Account deleted");
    setTimeout(() => {
      router.push("/");
    }, 1200);
  };

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
    }
    setSuccessIconSrc("/icons/logout.svg");
    setSuccessMessage("Logged out");
    setTimeout(() => {
      router.push("/");
    }, 1200);
  };

  return (
    <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-xl border border-gray-800 bg-cream p-8">
      <h2 className="mb-8 font-garamond text-3xl font-bold text-black sm:text-4xl">
        Account Settings
      </h2>

      {/* Changed to flex-row and aligned items to the bottom so the buttons line up perfectly */}
      <div className="flex flex-row items-end gap-4">
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => setIsConfirmOpen(true)}
            className="w-fit rounded-lg border border-red-300 bg-white px-5 py-2.5 font-space-grotesk text-sm font-medium text-red-600 hover:bg-red-50 hover:shadow-none transition-transform duration-300 ease-in-out hover:scale-102"
          >
            Delete Account
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="w-fit rounded-lg border border-mauve-900 bg-mauve px-5 py-2.5 font-space-grotesk text-sm font-medium text-cream transition-colors transition-transform duration-300 ease-in-out hover:scale-102"
        >
          Logout
        </button>
      </div>

      {/* pop up */}
      <AnimatePresence>
        {isConfirmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: "100vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100vh", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md rounded-xl border border-gray-800 bg-cream p-6 shadow-xl"
            >
              <h3 className="font-garamond text-2xl font-bold text-gray-900">
                Are you sure?
              </h3>
              <p className="mt-2 font-space-grotesk text-sm text-gray-600">
                This action will delete your account. You will NOT be able to
                recover your account once you delete it.
              </p>

              <div className="mt-6 flex justify-baseline gap-3 font-space-grotesk">
                <button
                  onClick={() => setIsConfirmOpen(false)}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-transform duration-300 ease-in-out hover:scale-102"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="rounded-lg bg-mauve px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-transform duration-300 ease-in-out hover:scale-102"
                >
                  Yes, delete my account
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {successMessage && (
          <div
            className={`
              fixed bottom-4 right-4 z-50
              transform transition-all duration-300 ease-out
              ${isToastExiting ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"}
            `}
          >
            <div className="flex flex-row rounded-lg bg-dark-cream px-5 py-3 shadow-lg gap-2 items-center">
              <span className="font-space-grotesk text-m text-black font-medium">
                {successMessage}
              </span>
              {successIconSrc && (
                <Image
                  height={20}
                  width={20}
                  src={successIconSrc}
                  alt="status icon"
                />
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
