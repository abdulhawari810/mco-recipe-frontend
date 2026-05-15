import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar.component";
import Footer from "@/components/footer.component";
import { useAuth } from "@/hooks/auth/useAuth.hooks";

export default function AppLayout() {
  const { me } = useAuth();

  if (me?.is_active === "banned") {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
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
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 md:p-4 pt-20 md:pt-24 lg:pt-28">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }
}
