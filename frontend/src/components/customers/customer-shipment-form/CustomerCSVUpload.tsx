import Papa from "papaparse";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { CSVCustomerEssentials } from "@/lib/validations/customer-validations";
import { useCreateCustomers } from "@/hooks/mutations/customers/useCreateCustomers";

export default function CustomerCSVUpload() {
  const { mutateAsync: createCustomers } = useCreateCustomers();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: async (csv) => {
          // CSV validation
          const validatedCustomersData = CSVCustomerEssentials.safeParse(
            csv.data,
          );
          if (!validatedCustomersData.success) {
            toast.error("Invalid CSV file format.");
            return;
          }

          // Create customers
          await createCustomers(validatedCustomersData.data);
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  }

  return (
    <div className="min-w-[150px]">
      <Input
        type="file"
        id="csv-file"
        accept="text/csv, .csv, application/vnd.ms-excel"
        onChange={handleFileChange}
      />
    </div>
  );
}
