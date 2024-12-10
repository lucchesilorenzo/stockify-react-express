import H1 from "@/components/common/H1";
import SuppliersSummary from "@/components/suppliers/SuppliersSummary";
import { columns } from "@/components/tables/suppliers/columns";
import SuppliersTable from "@/components/tables/suppliers/SuppliersTable";
import { useOrder } from "@/hooks/useOrder";
import { useEffect } from "react";

export default function SuppliersPage() {
  const { suppliers } = useOrder();

  useEffect(() => {
    document.title = "Suppliers | Stockify";
  }, []);

  return (
    <main>
      <H1>Suppliers</H1>

      <div className="my-6 space-y-6">
        <SuppliersSummary suppliers={suppliers} />

        <div className="my-6 grid grid-cols-1">
          <SuppliersTable columns={columns} data={suppliers} />
        </div>
      </div>
    </main>
  );
}
