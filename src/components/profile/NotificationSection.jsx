import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function NotificationSection() {
  const { t, i18n } = useTranslation();
  const notif = [
    {
      id: 1,
      title: t("notification.security_alert.title"),
      desc: t("notification.security_alert.text"),
      is_active: true,
    },
    {
      id: 2,
      title: t("notification.email_update.title"),
      desc: t("notification.email_update.text"),
      is_active: true,
    },
    {
      id: 3,
      title: t("notification.recipe_update.title"),
      desc: t("notification.recipe_update.text"),
      is_active: true,
    },
    {
      id: 4,
      title: t("notification.activity_summary.title"),
      desc: t("notification.activity_summary.text"),
      is_active: true,
    },
  ];
  const [buttonStep, setButtonStep] = useState(() => {
    const saved = localStorage.getItem("notification_settings");

    if (saved) {
      return JSON.parse(saved);
    }

    return notif.reduce((acc, item) => {
      acc[item.id] = item.is_active;
      return acc;
    }, {});
  });

  const handleToggle = (id) => {
    setButtonStep((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    localStorage.setItem("notification_settings", JSON.stringify(buttonStep));
  }, [buttonStep]);
  return (
    <main className="w-full h-full">
      <div className="flex flex-col w-full bg-white dark:bg-neutral-900 dark:text-white p-6 rounded-2xl">
        {notif.map((item, i) => {
          const isToggle = buttonStep[item.id];
          const lastIndex = notif.slice(3)[0];
          return (
            <div
              className={`grid grid-cols-2 border-b py-5 ${lastIndex.id === item.id ? "border-b-transparent" : "border-b-slate-300"}`}
              key={i}
            >
              <div className="flex flex-col gap-1 w-full">
                <h1 className="text-md md:text-lg font-semibold">
                  {item.title}
                </h1>
                <span className="text-sm md:text-lg text-slate-500 dark:text-orange-200/70">
                  {item.desc}
                </span>
              </div>
              <div className="flex items-center justify-end w-full">
                <button
                  className={`p-2 w-15 rounded-full outline ${isToggle ? "outline-orange-500" : "outline-slate-500"} flex items-center justify-center text-md cursor-pointer text-slate-600`}
                  onClick={() => handleToggle(item.id)}
                >
                  <div
                    className={`w-5 h-5 rounded-full transform ${isToggle ? "bg-orange-500 translate-x-3" : "-translate-x-3 bg-slate-500"} transition-transform! duration-300`}
                  ></div>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
