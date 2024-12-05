import { columns } from "../tables/customers/columns";
import CustomersTable from "../tables/customers/customers-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CustomerShipmentForm from "./customer-shipment-form/customer-shipment-form";

export default function CustomerTabs() {
  // TODO: get data
  // const [availableProducts, customers] = await Promise.all([
  //   getAvailableProducts(),
  //   getCustomers(),
  // ]);

  return (
    <Tabs defaultValue="prepare-shipment" className="space-y-4">
      <TabsList>
        <TabsTrigger value="prepare-shipment">Prepare Shipment</TabsTrigger>
        <TabsTrigger value="registered-customers">
          Registered Customers
        </TabsTrigger>
      </TabsList>

      <TabsContent value="prepare-shipment">
        {/* <CustomerShipmentForm
          products={availableProducts}
          customers={customers}
        /> */}
      </TabsContent>

      <TabsContent value="registered-customers">
        <div className="my-6">
          <h2 className="text-xl font-semibold">Registered Customers</h2>
          <p className="text-sm text-muted-foreground">
            View and manage registered customers
          </p>
        </div>

        {/* <CustomersTable columns={columns} data={customers} /> */}
      </TabsContent>
    </Tabs>
  );
}
