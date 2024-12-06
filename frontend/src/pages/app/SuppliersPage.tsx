import H1 from "@/components/common/H1";
import SuppliersSummary from "@/components/suppliers/SuppliersSummary";
import { columns } from "@/components/tables/suppliers/columns";
import SuppliersTable from "@/components/tables/suppliers/SuppliersTable";

export default function SuppliersPage() {
  // const suppliers = await getSuppliers();

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
