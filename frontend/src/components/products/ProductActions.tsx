import { useState } from "react";

import { MoreHorizontal } from "lucide-react";

import MainAlertDialog from "../common/MainAlertDialog";
import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductWithCategoryAndWarehouse } from "@/lib/types";
import { Link } from "react-router-dom";
import { useUpdateProductStatus } from "@/hooks/mutations/products/useUpdateProductStatus";

type ProductActionsProps = {
  product: ProductWithCategoryAndWarehouse;
};

export default function ProductActions({ product }: ProductActionsProps) {
  const { mutate: onUpdateProductStatus } = useUpdateProductStatus();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  async function onUpdateProductStatusAndCloseAlert() {
    onUpdateProductStatus({ productId: product.id, status: product.status });
    setIsAlertOpen(false);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to={`/app/products/${product.slug}/edit`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsAlertOpen(true)}>
            {product.status === "ARCHIVED" ? "Restore" : "Archive"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <MainAlertDialog
        open={isAlertOpen}
        setOpen={setIsAlertOpen}
        onUpdateItemStatus={onUpdateProductStatusAndCloseAlert}
        status={product.status}
        type="product"
      />
    </>
  );
}
