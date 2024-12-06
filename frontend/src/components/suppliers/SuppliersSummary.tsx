import SupplierCard from "./SupplierCard";

import { suppliersData } from "@/lib/data";
import { SupplierWithOrderCount } from "@/lib/types";

type SuppliersSummaryProps = {
  suppliers: SupplierWithOrderCount[];
};

export default function SuppliersSummary({ suppliers }: SuppliersSummaryProps) {
  const suppliersLength = suppliers.filter(({ rating }) => rating > 0).length;
  const avgRating =
    suppliersLength > 0
      ? suppliers
          .filter(({ rating }) => rating > 0)
          .reduce((total, { rating }) => total + rating, 0) / suppliersLength
      : 0;

  const updatedSuppliersData = [
    { ...suppliersData[0], amount: suppliers.length.toLocaleString() },
    { ...suppliersData[1], amount: avgRating.toFixed(2) },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {updatedSuppliersData.map((card) => (
        <SupplierCard key={card.title} card={card} />
      ))}
    </div>
  );
}
