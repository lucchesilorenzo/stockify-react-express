import H1 from "@/components/common/H1";
import { columns } from "@/components/tables/products/columns";
import ProductsTable from "@/components/tables/products/ProductsTable";
import WarehouseSummary from "@/components/warehouses/WarehouseSummary";
import { productStatuses } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default function ProductsPage() {
  // const products = await getProducts();

  // const csvData = products.map((product) => ({
  //   Name: product.name,
  //   SKU: product.sku,
  //   Category: product.category.name,
  //   Price: formatCurrency(product.price),
  //   Status:
  //     productStatuses.find((p) => p.value === product.status)?.label ||
  //     product.status,
  //   Warehouse: product.warehouse.name,
  //   Quantity: product.quantity,
  // }));

  return (
    <main>
      <H1>Products</H1>

      <div className="my-6 space-y-6">
        <WarehouseSummary />

        <div className="my-6 grid grid-cols-1">
          <ProductsTable columns={columns} data={products} csvData={csvData} />
        </div>
      </div>
    </main>
  );
}
