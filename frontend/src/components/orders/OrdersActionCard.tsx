import { PlusCircleIcon } from "lucide-react";

import FormDialog from "../common/FormDialog";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProductsToRestock } from "@/hooks/queries/products/useProductsToRestock";
import Spinner from "../common/Spinner";

export default function OrdersActionCard() {
  const { data: products = [], isLoading } = useProductsToRestock();

  if (isLoading) return <Spinner size="large" />;

  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Manage Inventory</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Track and manage your inventory in one place with ease.
        </CardDescription>
      </CardHeader>
      <CardFooter className="space-x-3">
        <FormDialog actionType="createOrder">
          <PlusCircleIcon className="mr-2 h-5 w-5" />
          Order Product
        </FormDialog>

        <FormDialog actionType="createRestockOrder" products={products}>
          <PlusCircleIcon className="mr-2 h-5 w-5" />
          Restock Product
        </FormDialog>
      </CardFooter>
    </Card>
  );
}
