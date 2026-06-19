import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth.hooks";

export default function ProtectedRoute({ allowedRoles }) {
  const { me, loadingMe } = useAuth();

  if (loadingMe)
    return (
      <div className="w-full h-screen flex items-center justify-center bg-orange-500">
        <button
          type="button"
          className=" flex flex-col gap-5 items-center p-5 text-white text-lg xl:text-2xl"
          disabled
        >
          <span className="animate-spin inline-block h-8 w-8 xl:w-10 xl:h-10 border-4 border-white border-t-transparent rounded-full mr-3"></span>
          <span>Loading...</span>
        </button>
      </div>
    );

  if (!allowedRoles.includes(me?.role)) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
}
