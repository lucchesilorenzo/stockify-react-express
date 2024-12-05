import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="lg:grid lg:grid-cols-2">
      <Outlet />
    </main>
  );
}
