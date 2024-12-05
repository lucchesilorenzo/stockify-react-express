import { Separator } from "../ui/separator";

import { cn, formatCurrency } from "@/lib/utils";

type OrderInvoiceItemProps = {
  item: {
    id: number;
    label: string;
    amount: number;
  };
};

export default function OrderInvoiceItem({ item }: OrderInvoiceItemProps) {
  return (
    <>
      <li
        className={cn(
          "flex items-center justify-between",
          item.label === "Total" && "font-semibold",
        )}
      >
        <span className="text-sm text-muted-foreground">{item.label}</span>
        <span className="text-sm">{formatCurrency(item.amount)}</span>
      </li>

      {item.id === 1 && <Separator className="my-2" />}
    </>
  );
}
