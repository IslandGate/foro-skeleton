"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface AccountSettingsProps {
  onDelete?: () => void;
}

export default function AccountSettings({ onDelete }: AccountSettingsProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleConfirmDelete = () => {
    setIsConfirmOpen(false);
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-xl border border-gray-800 bg-cream p-8">
      <h2 className="mb-8 font-garamond text-3xl font-bold text-black sm:text-4xl">
        Account Settings
      </h2>

      <div className="flex flex-col gap-1.5">
        <button
          onClick={() => setIsConfirmOpen(true)}
          className="w-fit rounded-lg border border-red-300 bg-white px-5 py-2.5 font-space-grotesk text-sm font-medium text-red-600 hover:bg-red-50 hover:shadow-none transition-all duration-100 ease-in-out"
        >
          Delete Account
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
                This action will delete your account. You will NOT be able to recover your account once you delete it.
              </p>
              
              <div className="mt-6 flex justify-end gap-3 font-space-grotesk">
                <button
                  onClick={() => setIsConfirmOpen(false)}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Yes, delete my account
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}