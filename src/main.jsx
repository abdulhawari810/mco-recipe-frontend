import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/css/global.css";
import "@/css/global.output.css";
import "@/css/custom.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// feature
import ProtectedRoute from "@/features/protectedRoute";

import AppLayout from "@/layout/app.layout";

import HomeView from "@/view/home/home.view";
import DetailView from "@/view/home/detail.view";
import CategoryView from "@/view/home/category.view";
import RecipesView from "@/view/home/recipes.view";
import FavouriteView from "@/view/home/favourite.view";
import RegisterView from "@/view/auth/register.view";
import LoginView from "@/view/auth/login.view";
import DashboardView from "@/view/dashboard/components/dashboard.view";
import DashboardLayout from "@/layout/dashboard.layout";

// chef dashboard
import DashboardChefView from "@/view/dashboard/chef/dashboard.chief.view";
import RecipeChefView from "@/view/dashboard/chef/recipe.chef.view";
import RecentChefView from "@/view/dashboard/chef/recent.chef.view";

// admin dashboard
import DashboardAdminView from "@/view/dashboard/admin/dashboard.admin.chief";
import UsersAdminView from "./view/dashboard/admin/users.admin.view";
import RecipeAdminView from "./view/dashboard/admin/recipe.admin,view";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomeView /> },
      { path: "/category", element: <CategoryView /> },
      { path: "/recipes", element: <RecipesView /> },
      { path: "/favourite", element: <FavouriteView /> },
      { path: "/recipes/detail/:id", element: <DetailView /> },
    ],
  },
  {
    path: "/register",
    element: <RegisterView />,
  },
  {
    path: "/login",
    element: <LoginView />,
  },
  {
    path: "/dashboard/chef",
    element: <ProtectedRoute allowedRoles={["chief"]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardChefView />,
          },
          {
            path: "recipe",
            element: <RecipeChefView />,
          },
          {
            path: "activity",
            element: <RecentChefView />,
          },
        ],
      },
    ],
  },
  {
    path: "/dashboard/admin",
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardAdminView />,
          },
          {
            path: "users",
            element: <UsersAdminView />,
          },
          {
            path: "recipe",
            element: <RecipeAdminView />,
          },
          {
            path: "activity",
            element: <UsersAdminView />,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
