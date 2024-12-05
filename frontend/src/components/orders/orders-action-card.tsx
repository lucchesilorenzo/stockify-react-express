import { PlusCircleIcon } from "lucide-react";

import FormDialog from "../common/form-dialog";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProductsToRestock } from "@/lib/queries/product-queries";

export default function OrdersActionCard() {
  // const products = await getProductsToRestock();

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
