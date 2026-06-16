import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/auth/useAuth.hooks";
import { useAllFavourite } from "@/hooks/favourites/useAllFavourite.hooks";
import { renderIcon } from "@/utils/icons.utils";
import ProfileMenu from "@/components/profile.component";
import { NavLink, useNavigate } from "react-router-dom";
import { getImagePath } from "@/utils/image.utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { me, logout, loading } = useAuth();
  const { favourites } = useAllFavourite();
  const [showNav, setShowNav] = useState(true);

  const nav = useNavigate();

  const lastScrollY = useRef(0);

  useEffect(() => {
    if (isOpen) {
      setShowNav(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 10) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`bg-white dark:bg-neutral-900 shadow-lg fixed top-0 transition-transform duration-300 left-0 z-50 min-w-full h-16 lg:h-20 ${showNav ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="md:max-w-7xl mx-auto px-4 items-center sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex shrink-0">
              <div className="flex items-center justify-center">
                <img
                  src={getImagePath("resource/logo.png")}
                  alt="Morphy Cook Official"
                  className="w-20 h-20 object-cover"
                />
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition"
                      : "text-gray-900 dark:text-orange-700 px-3 py-2 rounded-md text-sm font-medium transition"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/recipes"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition"
                      : "text-gray-900 dark:text-orange-700 px-3 py-2 rounded-md text-sm font-medium transition"
                  }
                >
                  Recipes
                </NavLink>
                <NavLink
                  to="/category"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition"
                      : "text-gray-900 dark:text-orange-700 px-3 py-2 rounded-md text-sm font-medium transition"
                  }
                >
                  Category
                </NavLink>

                {me && (
                  <>
                    <NavLink
                      to="/favourite"
                      className={({ isActive }) =>
                        isActive
                          ? "text-orange-500 relative px-3 py-2 rounded-md text-sm font-medium transition"
                          : "text-gray-900 dark:text-orange-700 relative px-3 py-2 rounded-md text-sm font-medium transition"
                      }
                    >
                      Favourite
                      <div className="bg-red-500 text-white absolute -top-2.5 right-0 rounded-full p-1 flex items-center justify-center text-xs">
                        {favourites?.data?.length >= 100
                          ? 99
                          : favourites?.length || 0}
                      </div>
                    </NavLink>
                    <NavLink
                      to="/category"
                      className="text-gray-700 dark:text-orange-500 dark:hover:text-orange-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition"
                    >
                      {renderIcon("Bell", { className: "w-5 h-5" })}
                    </NavLink>
                  </>
                )}

                <div className="cursor-pointer">
                  {me ? (
                    <ProfileMenu
                      profile={me?.profile}
                      name={me?.username}
                      role={me?.role}
                      logoutUser={logout}
                      isLoading={loading}
                    />
                  ) : (
                    <>
                      <NavLink
                        to="/login"
                        className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition"
                      >
                        Login
                      </NavLink>
                      <NavLink
                        to="/register"
                        className="bg-orange-600 text-white hover:bg-orange-700 px-4 py-2 rounded-md text-sm font-medium transition"
                      >
                        Register
                      </NavLink>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2.5">
              <button className="text-gray-700 dark:text-orange-200/50 hover:text-orange-600 focus:outline-none relative p-2.5">
                {renderIcon("Bell", { className: "w-6 h-6" })}
                <span className="absolute font-black top-0 right-0">0</span>
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${isOpen ? "text-orange-500" : "text-gray-700 dark:text-orange-200/50"}`}
              >
                {renderIcon("Menu", { className: "w-6 h-6" })}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden navbar w-10/12 gap-2 right-0 h-screen bg-white dark:bg-neutral-900 fixed top-15 ${isOpen ? "show flex flex-col" : "hide hidden"} transition-transform duration-200 p-4 z-50`}
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 bg-orange-500/10 px-3 py-2 rounded-md text-lg font-medium transition"
                  : "text-gray-900 dark:text-orange-200/50 px-3 py-2 rounded-md text-lg font-medium transition"
              }
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/recipes"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 bg-orange-500/10 px-3 py-2 rounded-md text-lg font-medium transition"
                  : "text-gray-900 dark:text-orange-200/50 px-3 py-2 rounded-md text-lg font-medium transition"
              }
              onClick={() => setIsOpen(false)}
            >
              Recipes
            </NavLink>
            <NavLink
              to="/category"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 bg-orange-500/10 px-3 py-2 rounded-md text-lg font-medium transition"
                  : "text-gray-900 dark:text-orange-200/50 px-3 py-2 rounded-md text-lg font-medium transition"
              }
              onClick={() => setIsOpen(false)}
            >
              All Category
            </NavLink>
            {me?.role === "chief" && (
              <NavLink
                to="/dashboard/chef"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 bg-orange-500/10 px-3 py-2 rounded-md text-lg font-medium transition"
                    : "text-gray-900 dark:text-orange-200/50 px-3 py-2 rounded-md text-lg font-medium transition"
                }
                onClick={() => setIsOpen(false)}
              >
                My Recipes
              </NavLink>
            )}
            {me?.role === "admin" && (
              <NavLink
                to="/dasboard/admin"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 bg-orange-500/10 px-3 py-2 rounded-md text-lg font-medium transition"
                    : "text-gray-900 dark:text-orange-200/50 px-3 py-2 rounded-md text-lg font-medium transition"
                }
              >
                Dashboard
              </NavLink>
            )}
            {me && (
              <>
                <NavLink
                  to="/favourite"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-500 bg-orange-500/10 px-3 py-2 rounded-md text-lg font-medium transition"
                      : "text-gray-900 dark:text-orange-200/50 px-3 py-2 rounded-md text-lg font-medium transition"
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Favourite ({favourites?.length || 0})
                </NavLink>
                <NavLink
                  to="/My"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-500 bg-orange-500/10 px-3 py-2 rounded-md text-lg font-medium transition"
                      : "text-gray-900 dark:text-orange-200/50 px-3 py-2 rounded-md text-lg font-medium transition"
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </NavLink>
                <NavLink
                  onClick={() => {
                    logout.mutate();
                    setIsOpen(false);
                  }}
                  className="text-red-500 px-3 bg-red-500/5 py-2 rounded-md text-lg font-medium transition mt-10"
                >
                  Logout
                </NavLink>
              </>
            )}
            {!me && (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-600 px-3 py-2 rounded-md text-lg font-medium transition"
                      : "text-gray-900 px-3 py-2 rounded-md text-lg font-medium transition"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-600 px-3 py-2 rounded-md text-lg font-medium transition"
                      : "text-gray-900 px-3 py-2 rounded-md text-lg font-medium transition"
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
