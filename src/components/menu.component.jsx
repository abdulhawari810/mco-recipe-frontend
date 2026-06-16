import { NavLink } from "react-router-dom";
import { renderIcon } from "@/utils/icons.utils";
import { useAuth } from "@/hooks/auth/useAuth.hooks";
import { useEffect, useState } from "react";

export default function Menu() {
  const [checkMenu, setCheckMenu] = useState({});
  const { me, loading } = useAuth();

  useEffect(() => {
    if (me?.role === "chief") {
      setCheckMenu([
        {
          name: "Dashboard",
          url: "",
          end: true,
          icons: "LayoutDashboard",
        },
        {
          name: "My Recipes",
          url: "recipe",
          end: false,
          icons: "UtensilsCrossed",
        },
        {
          name: "Recent Activity",
          url: "activity",
          end: false,
          icons: "History",
        },
      ]);
    } else {
      setCheckMenu([
        {
          name: "Dashboard",
          url: "",
          end: true,
          icons: "LayoutDashboard",
        },
        {
          name: "Users",
          url: "users",
          end: false,
          icons: "Users",
        },
        {
          name: "Recipes",
          url: "recipe",
          end: false,
          icons: "UtensilsCrossed",
        },
        {
          name: "Recent Activity",
          url: "activity",
          end: false,
          icons: "History",
        },
      ]);
    }
  }, [me?.role]);

  return (
    <>
      <container className="w-full lg:w-[30%] fixed bottom-0 left-0 lg:relative px-2.5 z-40">
        <main className="bg-white w-full  md:h-[75vh] lg:relative md:relative p-4 rounded-2xl h-20 lg:[100vh] flex lg:flex-col md:flex-col justify-between items-center md:justify-start md:items-start lg:justify-start lg:items-start gap-2">
          {Array.isArray(checkMenu) &&
            checkMenu.map((item, i) => {
              return (
                <NavLink
                  to={item.url}
                  end={item.end}
                  className={({ isActive }) =>
                    isActive
                      ? "lg:w-full md:lg:w-full w-fit h-fit flex p-4 rounded-lg bg-orange-500 text-white items-center gap-2"
                      : "lg:w-full md:lg:w-full w-fit h-fit flex p-4 rounded-lg hover:bg-orange-500/20 text-slate-600 hover:text-black items-center gap-2"
                  }
                  key={i}
                >
                  {renderIcon(item.icons, {
                    className: "lg:w-5 md:w-5 w-[20px] lg:h-5 md:h-5 h-[20px]",
                  })}
                  <span className="hidden lg:flex md:flex">{item.name}</span>
                </NavLink>
              );
            })}
          <div className="hidden absolute lg:flex md:flex w-full px-4 left-0 bottom-4">
            <button
              className={
                "w-full h-10 flex p-4 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer items-center gap-2"
              }
            >
              {renderIcon("LogOut", { className: "w-5 h-5" })}
              <span>Logout</span>
            </button>
          </div>
        </main>
      </container>
    </>
  );
}
