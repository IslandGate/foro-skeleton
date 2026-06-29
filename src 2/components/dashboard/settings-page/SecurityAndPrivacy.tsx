"use client";
import React from "react";

export interface SecurityAndPrivacyProps {
  messaging?: string;
  notifications?: string;
  onMessagingChange?: (value: string) => void;
  onNotificationsChange?: (value: string) => void;
}

export default function SecurityAndPrivacy({
  messaging = "",
  notifications = "",
  onMessagingChange,
  onNotificationsChange,
}: SecurityAndPrivacyProps) {
  const selectClass =
    "w-full rounded-lg border border-gray-800 bg-cream px-4 py-3 font-space-grotesk text-base text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-400";

  return (
    <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-xl border border-gray-800 bg-cream p-8">
      <h2 className="mb-8 font-garamond text-3xl font-bold text-black sm:text-4xl">
        Security and Privacy
      </h2>

      <label className="flex flex-col gap-1.5">
        <span className="font-space-grotesk text-sm font-medium text-gray-900">Who can message me?</span>
        <select value={messaging} onChange={(e) => onMessagingChange?.(e.target.value)} className={selectClass}>
          <option value="everyone">Everyone</option>
          <option value="no_one">No one</option>
          <option value="following">People I follow</option>
          <option value="teamed">People I teamed up with before</option>
        </select>
      </label>

      <label className="mt-6 flex flex-col gap-1.5">
        <span className="font-space-grotesk text-sm font-medium text-gray-900">Notifications</span>
        <select value={notifications} onChange={(e) => onNotificationsChange?.(e.target.value)} className={selectClass}>
          <option value="mentions">Mentions only</option>
          <option value="mentions_calls">Mentions and Calls</option>
          <option value="all">All messages</option>
        </select>
      </label>
    </div>
  );
}
