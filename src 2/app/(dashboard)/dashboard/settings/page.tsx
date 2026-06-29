import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import ProfilePicture from "@/components/dashboard/settings-page/ProfilePicture";
import ProfileCustomization from "@/components/dashboard/settings-page/ProfileCustomization";
import AcademicInfo from "@/components/dashboard/settings-page/AcademicInfo";
import LanguageAndRegion from "@/components/dashboard/settings-page/LanguageAndRegion";
import AccountSettings from "@/components/dashboard/settings-page/AccountSettings";
import SaveDiscard from "@/components/dashboard/settings-page/SaveDiscard";

export default function Settings() {
  return (
    <div className="flex min-h-screen bg-cream">
      <span className="sticky top-0 h-screen">
        <Sidebar />
      </span>

      <main className="flex-1 p-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <ProfilePicture />
          <ProfileCustomization />
          <AcademicInfo />
          <LanguageAndRegion />
          <AccountSettings />
          <SaveDiscard />
        </div>
      </main>
    </div>
  );
}
