import { useState } from "react";
import toast from "react-hot-toast";
import { renderIcon } from "@/utils/icons.utils";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@/hooks/auth/useAuthLogin.hooks";
import ButtonLoading from "@/components/loading/button.loading";

export default function LoginView() {
  const { loginUsers, loading } = useLogin();
  const [formData, setFormData] = useState({
    UsersOrEmail: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUsers({ payload: formData });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100 dark:from-neutral-900 dark:to-neutral-950 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-orange-600 cursor-pointer mb-2 text-center">
          Welcome
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Sign in to your account
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email or Username
            </label>
            <input
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, UsersOrEmail: e.target.value })
              }
              placeholder="Enter your email or username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 cursor-pointer focus:border-transparent outline-none transition"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 cursor-pointer focus:border-transparent outline-none transition"
            />
            <div>
              {renderIcon("Eye", {
                className: `w-6 h-6 absolute right-3 top-9 text-gray-400 cursor-pointer hover:text-gray-600 transition ${showPassword ? "text-gray-950" : "text-gray-600"}`,
                onClick: () => setShowPassword(!showPassword),
              })}
            </div>
          </div>

          <ButtonLoading loading={loading} title={"Login"} type="submit" />
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-3">
            <button className="w-full flex justify-center items-center py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            </button>
            <button className="w-full flex justify-center items-center py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button className="w-full flex justify-center items-center py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1DA1F2">
                <path d="M23.953 4.57a10 10 0 002.856-3.515 9.953 9.953 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </button>
            <button className="w-full flex justify-center items-center py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#E1306C">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 2.297c2.66 0 2.974.012 4.028.058 2.212.1 3.407 1.309 3.507 3.507.046 1.054.058 1.368.058 4.028s-.012 2.974-.058 4.028c-.1 2.198-1.295 3.407-3.507 3.507-1.054.046-1.368.058-4.028.058s-2.974-.012-4.028-.058c-2.212-.1-3.407-1.309-3.507-3.507-.046-1.054-.058-1.368-.058-4.028s.012-2.974.058-4.028c.1-2.198 1.295-3.407 3.507-3.507 1.054-.046 1.368-.058 4.028-.058m0 1.269c-2.603 0-2.889.011-3.898.057-1.294.059-1.996.79-2.055 2.055-.046 1.009-.057 1.295-.057 3.898s.011 2.889.057 3.898c.059 1.265.76 1.996 2.055 2.055 1.009.046 1.295.057 3.898.057s2.889-.011 3.898-.057c1.294-.059 1.996-.79 2.055-2.055.046-1.009.057-1.295.057-3.898s-.011-2.889-.057-3.898c-.059-1.294-.761-1.996-2.055-2.055-1.009-.046-1.295-.057-3.898-.057m0 2.162c1.667 0 3.019 1.352 3.019 3.019s-1.352 3.019-3.019 3.019-3.019-1.352-3.019-3.019 1.352-3.019 3.019-3.019m0 7.906c2.162 0 3.913-1.751 3.913-3.913s-1.751-3.913-3.913-3.913-3.913 1.751-3.913 3.913 1.751 3.913 3.913 3.913m3.019-7.97c0 .389-.315.704-.704.704s-.704-.315-.704-.704.315-.704.704-.704.704.315.704.704" />
              </svg>
            </button>
          </div>
        </div>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-orange-600 cursor-pointer hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
