import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, Globe, Mail, Phone, ShoppingCart } from "lucide-react";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { toast } from "sonner";

// import { updateSupplierRatingAction } from "@/app/actions/supplier-actions";
import StarRating from "@/components/common/star-rating";
import { Button } from "@/components/ui/button";
import { SupplierWithOrderCount } from "@/lib/types";
import { TSupplierRatingSchema } from "@/lib/validations/supplier-validations";

export const columns: ColumnDef<SupplierWithOrderCount>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name: string = row.getValue("name");

      return <div className="min-w-[200px] font-medium">{name}</div>;
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rating
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rating: TSupplierRatingSchema = row.getValue("rating");

      // async function handleRatingChange(newRating: TSupplierRatingSchema) {
      //   const result = await updateSupplierRatingAction(
      //     row.original.id,
      //     newRating,
      //   );
      //   if (result?.message) {
      //     toast.error(result?.message);
      //     return;
      //   }

      //   toast.success("Rating updated successfully.");
      // }

      return (
        <div className="flex min-w-[150px] items-center justify-center">
          <StarRating
            initialRating={rating}
            onChange={handleRatingChange}
            size="sm"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    id: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const email: string = row.getValue("email");

      return (
        <div className="flex items-center justify-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span>{email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const phone: SupplierWithOrderCount["phone"] = row.getValue("phone");

      return (
        <div className="flex min-w-[200px] items-center justify-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span>{formatPhoneNumberIntl(phone)}</span>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => `${row.address}, ${row.city}, ${row.zipCode}`,
    id: "fullAddress",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Address
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const address = row.original.address;
      const city = row.original.city;
      const zipCode = row.original.zipCode;

      return (
        <div className="min-w-[400px]">{`${address}, ${city}, ${zipCode}`}</div>
      );
    },
  },
  {
    accessorKey: "website",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Website
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const website: SupplierWithOrderCount["website"] =
        row.getValue("website");

      if (!website) return <div>N/A</div>;

      return (
        <div className="flex items-center justify-center gap-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <span>{website}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "_count.orders",
    id: "_count.orders",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Orders
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const count: number = row.getValue("_count.orders");

      return (
        <div className="flex items-center justify-center gap-2">
          <ShoppingCart className="h-4 w-4 text-orange-500" />{" "}
          <span>{count}</span>
        </div>
      );
    },
  },
];
