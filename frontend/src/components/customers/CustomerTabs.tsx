import { useAvailableProducts } from "@/hooks/queries/products/useAvailableProducts";
import { useCustomers } from "@/hooks/queries/useCustomers";
import CustomersTable from "../tables/customers/CustomersTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CustomerShipmentForm from "./customer-shipment-form/CustomerShipmentForm";
import Spinner from "../common/Spinner";
import { columns } from "../tables/customers/columns";

export default function CustomerTabs() {
  const { data: availableProducts = [], isLoading: availableProductsLoading } =
    useAvailableProducts();
  const { data: customers = [], isLoading: customersLoading } = useCustomers();

  const isLoading = availableProductsLoading || customersLoading;

  if (isLoading) return <Spinner size="large" />;

  return (
    <Tabs defaultValue="prepare-shipment" className="space-y-4">
      <TabsList>
        <TabsTrigger value="prepare-shipment">Prepare Shipment</TabsTrigger>
        <TabsTrigger value="registered-customers">
          Registered Customers
        </TabsTrigger>
      </TabsList>

      <TabsContent value="prepare-shipment">
        <CustomerShipmentForm
          products={availableProducts}
          customers={customers}
        />
      </TabsContent>

      <TabsContent value="registered-customers">
        <div className="my-6">
          <h2 className="text-xl font-semibold">Registered Customers</h2>
          <p className="text-sm text-muted-foreground">
            View and manage registered customers
          </p>
        </div>

        <CustomersTable columns={columns} data={customers} />
      </TabsContent>
    </Tabs>
  );
}
