import AuthGuard from "@/components/common/AuthGuard";
import Spinner from "@/components/common/Spinner";
import CustomerProvider from "@/contexts/CustomerProvider";
import ProductProvider from "@/contexts/ProductProvider";
import { useMainData } from "@/hooks/queries/useMainData";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../Sidebar";

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
    <AuthGuard>
      <div className="grid min-h-screen w-full lg:grid-cols-[220px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <main className="flex min-h-[1000px] flex-col gap-4 p-4 lg:gap-6 lg:p-8">
            {isLoading ? (
              <Spinner size="large" />
            ) : (
              <ProductProvider
                products={products}
                categories={categories}
                warehouses={warehouses}
                suppliers={suppliers}
              >
                <CustomerProvider>
                  <Outlet />
                </CustomerProvider>
              </ProductProvider>
            )}
          </main>
          <Footer />
        </div>
      </div>
    </AuthGuard>
  );
}
