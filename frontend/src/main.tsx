import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/globals.css";

import AppLayout from "./components/layout/page-layouts/AppLayout";
import SettingsPage from "./pages/app/SettingsPage";
import AnalyticsPage from "./pages/app/AnalyticsPage";
import CustomersPage from "./pages/app/CustomersPage";
import DashboardPage from "./pages/app/DashboardPage";
import ProductsPage from "./pages/app/products/ProductsPage";
import ProductPage from "./pages/app/products/ProductPage";
import SuppliersPage from "./pages/app/SuppliersPage";
import TasksPage from "./pages/app/TasksPage";
import AuthLayout from "./components/layout/page-layouts/AuthLayout";
import LogInPage from "./pages/auth/LogInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import OrdersPage from "./pages/app/OrdersPage";
import NotFoundPage from "./pages/NotFoundPage";
import RootLayout from "./components/layout/page-layouts/RootLayout";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route element={<AuthLayout />}>
              <Route path="login" element={<LogInPage />} />
              <Route path="signup" element={<SignUpPage />} />
            </Route>

            <Route element={<AppLayout />}>
              <Route path="app">
                <Route path="account">
                  <Route path="settings" element={<SettingsPage />} />
                </Route>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="tasks" element={<TasksPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="products">
                  <Route index element={<ProductsPage />} />
                  <Route path=":productSlug/edit" element={<ProductPage />} />
                </Route>
                <Route path="suppliers" element={<SuppliersPage />} />
                <Route path="customers" element={<CustomersPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
