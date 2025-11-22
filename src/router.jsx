import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import CodeStats from "@/pages/CodeStats";
import NotFound from "@/components/notfound";

const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "/:value", element: <Dashboard /> },
  { path: "/code/:code", element: <CodeStats /> },
  { path: "*", element: <NotFound /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
