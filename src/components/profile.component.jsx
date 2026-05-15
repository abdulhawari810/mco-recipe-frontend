import { useState, useRef, useEffect } from "react";
import { renderIcon } from "@/utils/icons.utils";
import { NavLink, useNavigate } from "react-router-dom";
import ButtonLoading from "@/components/loading/button.loading";

export default function ProfileMenu({
  profile,
  name = "User",
  logoutUser,
  role,
  isLoading,
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const nav = useNavigate();

  // close kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative cursor-pointer" ref={menuRef}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center cursor-pointer gap-2 rounded-full ${open ? "shadow-lg" : "shadow-none"}`}
      >
        {profile && profile !== "default.png" ? (
          <img
            src={profile}
            alt={name}
            className="w-10 h-10  rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 flex items-center justify-center rounded-full group-hover:text-gray-200! group-hover:bg-orange-600 bg-gray-200 transition">
            {renderIcon("User", { className: "w-5 h-5" })}
          </div>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-lg border p-2 z-50">
          <div className="px-3 py-2 border-b">
            <p className="text-sm font-semibold">{name}</p>
            <p className="text-xs text-gray-500">My Profile</p>
          </div>

          <ul className="mt-2 space-y-1 text-sm">
            <NavLink to={"/Profile"}>
              <li className="w-full cursor-pointer text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                Profile
              </li>
            </NavLink>
            {role === "chief" && (
              <NavLink to={"/dashboard/chef"}>
                <li className="w-full cursor-pointer text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                  My Recipes
                </li>
              </NavLink>
            )}
            {role === "admin" && (
              <NavLink to={"/dashboard/admin"}>
                <li className="w-full cursor-pointer text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                  Dashboard
                </li>
              </NavLink>
            )}
            <NavLink to={"/Settings"}>
              <li className="w-full cursor-pointer text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                Settings
              </li>
            </NavLink>
          </ul>

          <div className="border-t mt-2 pt-2">
            <ButtonLoading
              loading={isLoading}
              title={"Logout"}
              onClick={logoutUser}
            />
          </div>
        </div>
      )}
    </div>
  );
}
