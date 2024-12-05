import Spinner from "@/components/common/spinner";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import CustomerProvider from "@/contexts/customer-provider";
import OrderProvider from "@/contexts/order-provider";
import ProductProvider from "@/contexts/product-provider";
import TaskProvider from "@/contexts/task-provider";
import { useMainData } from "@/hooks/queries/useMainData";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  const [
    { data: categories, isLoading: categoriesLoading },
    { data: warehouses, isLoading: warehousesLoading },
    { data: suppliers, isLoading: suppliersLoading },
  ] = useMainData();

  const isLoading = categoriesLoading || warehousesLoading || suppliersLoading;

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[220px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex min-h-[1000px] flex-col gap-4 p-4 lg:gap-6 lg:p-8">
          {isLoading ? (
            <Spinner size="large" />
          ) : (
            <CustomerProvider>
              <TaskProvider>
                <OrderProvider suppliers={suppliers}>
                  <ProductProvider
                    categories={categories}
                    warehouses={warehouses}
                  >
                    <Outlet />
                  </ProductProvider>
                </OrderProvider>
              </TaskProvider>
            </CustomerProvider>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}
