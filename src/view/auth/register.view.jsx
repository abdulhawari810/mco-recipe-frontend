import { useState } from "react";
import toast from "react-hot-toast";
import { renderIcon } from "@/utils/icons.utils";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useRegister } from "@/hooks/auth/useAuthRegister.hooks";
import ButtonLoading from "@/components/loading/button.loading";

export default function RegisterView() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { registerUsers, loadingRegister } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await registerUsers({ payload: formData });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-orange-600 mb-2">
          Create Account
        </h1>

        <p className="text-gray-600 mb-6">Join us today</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <div>
              {renderIcon("Eye", {
                className: `w-6 h-6 absolute right-3 top-9 text-gray-400 cursor-pointer hover:text-gray-600 transition ${showPassword ? "text-gray-950" : "text-gray-600"}`,
                onClick: () => setShowPassword(!showPassword),
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              onChange={(e) =>
                setFormData({ ...formData, confPassword: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <ButtonLoading
            title="Register"
            type="submit"
            loading={loadingRegister}
          />
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-orange-600 cursor-pointer hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
