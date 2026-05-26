import { useAuth } from "@/hooks/auth/useAuth.hooks";
import ProfileSection from "@/components/profile/ProfileSection";
import SecuritySection from "@/components/profile/SecuritySection";
import LanguageSection from "@/components/profile/LanguageSection";
import NotificationSection from "@/components/profile/NotificationSection";
import ThemeSection from "@/components/profile/ThemeSection";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { renderIcon } from "@/utils/icons.utils";

export default function ProfileView() {
  const { me, loadingMe } = useAuth();
  const [activeMenu, setActiveMenu] = useState(() => {
    return localStorage.getItem("pages") || "profile";
  });

  const setPages = (page) => {
    setActiveMenu(page);
    localStorage.setItem("pages", page);
  };
  return (
    <>
      <div className="flex flex-row w-full min-h-screen items-start justify-start">
        <div className="w-2/7 h-screen flex items-center justify-center p-6">
          <div className="w-full h-full p-4 bg-white rounded-2xl shadow-lg flex flex-col space-y-4">
            <NavLink
              to={"/"}
              className="text-orange-500 peer flex items-center justify-start rounded-lg gap-2 hover:bg-orange-500 bg-orange-500/10 hover:text-white! p-2 text-md font-bold"
            >
              {renderIcon("House", {
                className: "w-5 h-5 ",
              })}
              <span>Beranda</span>
            </NavLink>
            <div className="h-0.5 my-3 bg-slate-300 rounded-full"></div>
            <button
              className={`rounded-lg flex items-center justify-between cursor-pointer ${activeMenu === "profile" ? "bg-orange-500 text-white" : "hover:bg-orange-500/10 hover:text-orange-500 text-slate-700"} p-2 grouping`}
              onClick={() => setPages("profile")}
            >
              <div className="flex items-center grouping justify-center text-md gap-2">
                {renderIcon("User", {
                  className: "w-5 h-5 grouping-hover:translate-x-5",
                })}
                <span>Profile</span>
              </div>
              {renderIcon("ChevronRight", { className: "w-5 h-5" })}
            </button>
            <button
              className={`rounded-lg flex items-center justify-between cursor-pointer ${activeMenu === "security" ? "bg-orange-500 text-white" : "hover:bg-orange-500/10 hover:text-orange-500 text-slate-700"} p-2 grouping`}
              onClick={() => setPages("security")}
            >
              <div className="flex items-center justify-center text-md gap-2">
                {renderIcon("ShieldCog", { className: "w-5 h-5" })}
                <span>Keamanan</span>
              </div>
              {renderIcon("ChevronRight", { className: "w-5 h-5" })}
            </button>
            <button
              className={`rounded-lg flex items-center justify-between cursor-pointer ${activeMenu === "language" ? "bg-orange-500 text-white" : "hover:bg-orange-500/10 hover:text-orange-500 text-slate-700"} p-2 grouping`}
              onClick={() => setPages("language")}
            >
              <div className="flex items-center justify-center text-md gap-2">
                {renderIcon("Languages", { className: "w-5 h-5" })}
                <span>Ubah Bahasa</span>
              </div>
              {renderIcon("ChevronRight", { className: "w-5 h-5" })}
            </button>
            <button
              className={`rounded-lg flex items-center justify-between cursor-pointer ${activeMenu === "notifications" ? "bg-orange-500 text-white" : "hover:bg-orange-500/10 hover:text-orange-500 text-slate-700"} p-2 grouping`}
              onClick={() => setPages("notifications")}
            >
              <div className="flex items-center justify-center text-md gap-2">
                {renderIcon("Bell", { className: "w-5 h-5" })}
                <span>Notifikasi</span>
              </div>
              {renderIcon("ChevronRight", { className: "w-5 h-5" })}
            </button>
            <button
              className={`rounded-lg flex items-center justify-between cursor-pointer ${activeMenu === "theme" ? "bg-orange-500 text-white" : "hover:bg-orange-500/10 hover:text-orange-500 text-slate-700"} p-2 grouping`}
              onClick={() => setPages("theme")}
            >
              <div className="flex items-center justify-center text-md gap-2">
                {renderIcon("Moon", { className: "w-5 h-5" })}
                <span>Mode Gelap</span>
              </div>
              {renderIcon("ChevronRight", { className: "w-5 h-5" })}
            </button>
            <button className=" rounded-lg flex items-center justify-between hover:bg-red-500/10 cursor-pointer text-red-500 p-2">
              <div className="flex items-center justify-center text-md gap-2">
                {renderIcon("Trash2", { className: "w-5 h-5" })}
                <span>Delete Account</span>
              </div>
            </button>
          </div>
        </div>
        <div className="w-full h-screen py-6 pr-6">
          <main className="w-full h-full overflow-y-auto">
            {activeMenu === "profile" && <ProfileSection users={me} />}

            {activeMenu === "security" && <SecuritySection />}
            {activeMenu === "notifications" && <NotificationSection />}
            {activeMenu === "language" && <LanguageSection />}
            {activeMenu === "theme" && <ThemeSection />}
          </main>
        </div>
      </div>
    </>
  );
}
