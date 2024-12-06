import H1 from "@/components/common/H1";
import CustomerTabs from "@/components/customers/CustomerTabs";

export default function CustomersPage() {
  return (
    <main>
      <H1>Customers</H1>

      <div className="my-6 grid grid-cols-1">
        <CustomerTabs />
      </div>
    </main>
  );
}
