import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import SettingsNav from "@/components/dashboard/settings-page/SettingsNav";
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
          <section id="profile-picture" className="scroll-mt-8">
            <ProfilePicture />
          </section>
          <section id="profile-customisation" className="scroll-mt-8">
            <ProfileCustomization />
          </section>
          <section id="academic-information" className="scroll-mt-8">
            <AcademicInfo />
          </section>
          <section id="language-and-region" className="scroll-mt-8">
            <LanguageAndRegion />
          </section>
          <section id="account-settings" className="scroll-mt-8">
            <AccountSettings />
          </section>
          <SaveDiscard />
        </div>
      </main>

      <aside className="hidden pr-8 pt-8 xl:block">
        <SettingsNav />
      </aside>
    </div>
  );
}
