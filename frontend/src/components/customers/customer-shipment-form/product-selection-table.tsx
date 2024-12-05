import { CircleX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomerSelectedProduct } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

type ProductSelectionTableProps = {
  products: CustomerSelectedProduct[];
  totalPrice: number;
  onProductQuantityChange: (productId: string, quantity: number) => void;
  onRemoveProduct: (productId: string) => void;
};

export default function ProductSelectionTable({
  products,
  totalPrice,
  onProductQuantityChange,
  onRemoveProduct,
}: ProductSelectionTableProps) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "-" || e.key === "e" || e.key === "." || e.key === "Enter") {
      e.preventDefault();
    }
  }

  function handleOnChange(
    e: React.ChangeEvent<HTMLInputElement>,
    product: CustomerSelectedProduct,
  ) {
    const quantity = Number(e.target.value);
    onProductQuantityChange(product.productId, quantity);
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.productId} className="hover:bg-background">
            <TableCell>{product.name}</TableCell>
            <TableCell>
              {formatCurrency(product.price * product.quantity)}
            </TableCell>
            <TableCell>
              <Input
                id={`product-quantity-${product.productId}`}
                type="number"
                min={1}
                max={product.maxQuantity}
                step={1}
                defaultValue={product.quantity}
                onChange={(e) => handleOnChange(e, product)}
                onKeyDown={(e) => handleKeyDown(e)}
                required
              />
            </TableCell>
            <TableCell>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => onRemoveProduct(product.productId)}
              >
                <CircleX className="h-5 w-5" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">
            {formatCurrency(totalPrice)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
