import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar.component";
import Footer from "@/components/footer.component";
import Menu from "@/components/menu.component";
import { useAuth } from "@/hooks/auth/useAuth.hooks";
import { useTheme } from "@/utils/theme.utils";

export default function DasboardLayout() {
  const { theme, setTheme } = useTheme();
  const { me } = useAuth();
  if (me?.is_active === "banned") {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 p-4 pt-25">
          <div className="text-center mt-10">
            <h1 className="text-3xl font-bold text-red-500">
              Akun Anda Diblokir
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Silakan hubungi administrator untuk informasi lebih lanjut.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 w-full min-w-0 px-4 pt-20 pb-24 md:p-4 md:pt-25 lg:pt-22.5 md:flex md:gap-4">
          <div className="md:shrink-0">
            <Menu />
          </div>

          <div className="w-full min-w-0 md:flex-1 lg:h-112.5 lg:overflow-y-auto">
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>
      // <div className="flex flex-col h-screen">
      //   <Navbar />
      //   <main className="md:p-4 lg:p-4 flex gap-4 pt-20 md:pt-25 lg:pt-22.5 min-w-0 overflow-hidden">
      //     <Menu />

      //     <div className="w-full min-w-0 h-112.5 lg:overflow-y-scroll">
      //       <Outlet />
      //     </div>
      //   </main>
      //   <Footer />
      // </div>
    );
  }
}
