import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./styles/globals.css";

import AppLayout from "./components/layout/page-layouts/AppLayout";
import AuthLayout from "./components/layout/page-layouts/AuthLayout";
import RootLayout from "./components/layout/page-layouts/RootLayout";
import AnalyticsPage from "./pages/app/AnalyticsPage";
import CustomersPage from "./pages/app/CustomersPage";
import DashboardPage from "./pages/app/DashboardPage";
import OrdersPage from "./pages/app/OrdersPage";
import ProductPage from "./pages/app/products/ProductPage";
import ProductsPage from "./pages/app/products/ProductsPage";
import SettingsPage from "./pages/app/SettingsPage";
import SuppliersPage from "./pages/app/SuppliersPage";
import TasksPage from "./pages/app/TasksPage";
import LogInPage from "./pages/auth/LogInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route element={<AuthLayout />}>
              <Route index element={<Navigate to="login" replace />} />
              <Route path="login" element={<LogInPage />} />
              <Route path="signup" element={<SignUpPage />} />
            </Route>

            <Route element={<AppLayout />}>
              <Route path="app">
                <Route index element={<Navigate to="dashboard" replace />} />
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
                <Route path="account">
                  <Route index element={<Navigate to="settings" replace />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>
              </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
