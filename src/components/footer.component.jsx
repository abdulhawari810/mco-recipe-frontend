import { useAuth } from "@/hooks/auth/useAuth.hooks";
import { useAllFavourite } from "@/hooks/favourites/useAllFavourite.hooks";
import { useState, useEffect } from "react";
import { getImagePath } from "@/utils/image.utils";

export default function Footer() {
  const { me, logout } = useAuth();
  const { favourites } = useAllFavourite();
  const navigationLinks = [
    { label: "Home", href: "/" },
    { label: "Recipes", href: "/recipes" },
    { label: "Categories", href: "/categories" },
  ];

  const roleLinks = {
    admin: { label: "Dashboard", href: "/dashboard/admin" },
    chief: { label: "My Recipes", href: "/dashboard/chef" },
  };

  return (
    <footer className="bg-slate-950 text-slate-200 mt-5 border-t pb-20 md:pb-0 lg:pb-0 border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:flex lg:flex gap-10">
        {/* Brand Section */}
        <div className="space-y-4">
          <div>
            <img
              src={getImagePath("resource/branding1.png")}
              className="lg:w-50 lg:h-30 object-cover"
            />
          </div>

          <p className="text-sm leading-relaxed text-slate-400">
            MCO ( Morphy Cook Official ) adalah platform resep makanan modern
            untuk menemukan inspirasi masakan, berbagi resep favorit, dan
            mengeksplor berbagai kategori makanan dari berbagai daerah maupun
            internasional.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:flex lg:justify-between items-start gap-6 w-full">
          {/* Navigation */}
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Navigation
            </h3>

            <ul className="space-y-3 w-full">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-orange-400 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {me && (
                <li>
                  <a
                    href={"/favourite"}
                    className="text-slate-400 hover:text-orange-400 transition-colors duration-200 text-sm"
                  >
                    Favourite ({favourites?.length || 0})
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Account */}
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-4 text-white">Account</h3>

            <div className="flex flex-col gap-4">
              {me && (
                <a
                  href={"/profile"}
                  className="text-slate-400 hover:text-orange-400 transition-colors duration-200 text-sm"
                >
                  My Profile
                </a>
              )}
              {me?.role && roleLinks[me?.role] && (
                <a
                  href={roleLinks[me?.role].href}
                  className="text-slate-400 hover:text-orange-400 transition-colors duration-200 text-sm mb-4"
                >
                  {roleLinks[me?.role].label}
                </a>
              )}
              {me ? (
                <button
                  onClick={logout}
                  className="w-fit px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 transition-colors duration-200 text-sm font-medium text-white"
                >
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-3">
                  <a
                    href="/login"
                    className="w-fit px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 transition-colors duration-200 text-sm font-medium text-white"
                  >
                    Login
                  </a>

                  <a
                    href="/register"
                    className="w-fit px-5 py-2 rounded-xl border border-slate-700 hover:border-orange-500 hover:text-orange-400 transition-all duration-200 text-sm font-medium px-5 py-2 rounded-xl"
                  >
                    Register
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Extra Info */}
          <div className="w-full col-span-2 lg:col-span-0 md:col-span-0">
            <h3 className="text-lg font-semibold mb-4 text-white">Explore</h3>

            <ul className="space-y-3 text-sm text-slate-400">
              <li>Trending Recipes</li>
              <li>Healthy Foods</li>
              <li>Dessert Collection</li>
              <li>Popular Categories</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} MCO ( Morphy Cook Official ). All
            rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="hover:text-orange-400 transition-colors duration-200"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="hover:text-orange-400 transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
