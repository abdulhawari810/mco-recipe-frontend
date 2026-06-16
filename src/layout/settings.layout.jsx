import { Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth.hooks";
import { useTheme } from "@/utils/theme.utils";

export default function SettingsLayout() {
  const { theme, setTheme } = useTheme();
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
    return <Outlet />;
  }
}
