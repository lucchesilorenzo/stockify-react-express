import CustomerProvider from "@/contexts/CustomerProvider";
import OrderProvider from "@/contexts/OrderProvider";
import ProductProvider from "@/contexts/ProductProvider";
import TaskProvider from "@/contexts/TaskProvider";
import { useMainData } from "@/hooks/queries/useMainData";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Spinner from "@/components/common/spinner";
import Footer from "../Footer";

export default function AppLayout() {
  const [
    { data: products = [], isLoading: productsLoading },
    { data: categories = [], isLoading: categoriesLoading },
    { data: warehouses = [], isLoading: warehousesLoading },
    { data: suppliers = [], isLoading: suppliersLoading },
  ] = useMainData();

  const isLoading =
    productsLoading ||
    categoriesLoading ||
    warehousesLoading ||
    suppliersLoading;

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
                    products={products}
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
