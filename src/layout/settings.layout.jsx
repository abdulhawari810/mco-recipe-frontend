import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth.hooks";
import { renderIcon } from "@/utils/icons.utils";

export default function SettingsLayout() {
  const { me } = useAuth();

  if (me?.is_active === "banned") {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 md:p-4 py-32 lg:py-25">
          <div className="text-center mt-10">
            <h1 className="text-3xl font-bold text-red-500">
              Akun Anda Diblokir
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Silakan hubungi administrator untuk informasi lebih lanjut.
            </p>
          </div>
        </main>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row w-full min-h-screen items-start justify-start ">
        <div className="w-2/7 h-screen flex items-center justify-center p-6">
          <div className="w-full h-full p-4 bg-white rounded-2xl shadow-lg flex flex-col space-y-2">
            <NavLink
              to={"/"}
              className="text-black flex items-center justify-start rounded-lg gap-4 hover:bg-orange-500 hover:text-white p-2 text-lg font-medium"
            >
              {renderIcon("House", { className: "w-5 h-5" })}
              <span>Beranda</span>
            </NavLink>
            <div className="h-0.5 bg-slate-300 rounded-full"></div>
            <NavLink className="text-slate-700 rounded-lg flex items-center justify-between hover:bg-orange-500 grouping hover:text-white p-2">
              <div className="flex items-center grouping justify-center text-md gap-2">
                {renderIcon("User", {
                  className: "w-5 h-5 grouping-hover:translate-x-5",
                })}
                <span>Profile</span>
              </div>
              {renderIcon("ChevronRight", { className: "w-5 h-5" })}
            </NavLink>
            <NavLink className="text-slate-700 rounded-lg flex items-center justify-between hover:bg-orange-500 hover:text-white p-2">
              <div className="flex items-center justify-center text-md gap-2">
                {renderIcon("ShieldCog", { className: "w-5 h-5" })}
                <span>Keamanan</span>
              </div>
              {renderIcon("ChevronRight", { className: "w-5 h-5" })}
            </NavLink>
            <NavLink className="text-slate-700 rounded-lg flex items-center justify-between hover:bg-orange-500 hover:text-white p-2">
              <div className="flex items-center justify-center text-md gap-2">
                {renderIcon("Languages", { className: "w-5 h-5" })}
                <span>Ubah Bahasa</span>
              </div>
              {renderIcon("ChevronRight", { className: "w-5 h-5" })}
            </NavLink>
            <NavLink className="text-slate-700 rounded-lg flex items-center justify-between hover:bg-orange-500 hover:text-white p-2">
              <div className="flex items-center justify-center text-md gap-2">
                {renderIcon("Bell", { className: "w-5 h-5" })}
                <span>Notifikasi</span>
              </div>
              {renderIcon("ChevronRight", { className: "w-5 h-5" })}
            </NavLink>
            <NavLink className="text-slate-700 rounded-lg flex items-center justify-between hover:bg-orange-500 hover:text-white p-2">
              <div className="flex items-center justify-center text-md gap-2">
                {renderIcon("Moon", { className: "w-5 h-5" })}
                <span>Mode Gelap</span>
              </div>
              {renderIcon("ChevronRight", { className: "w-5 h-5" })}
            </NavLink>
            <NavLink className="text-slate-700 rounded-lg flex items-center justify-between hover:bg-orange-500 hover:text-white p-2">
              <div className="flex items-center justify-center text-md gap-2">
                {renderIcon("Settings", { className: "w-5 h-5" })}
                <span>Settings</span>
              </div>
              {renderIcon("ChevronRight", { className: "w-5 h-5" })}
            </NavLink>
          </div>
        </div>
        <main className="w-full h-screen py-6 pr-6">
          <Outlet />
        </main>
      </div>
    );
  }
}
