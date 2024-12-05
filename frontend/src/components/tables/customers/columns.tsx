"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, Mail, Phone } from "lucide-react";
import { formatPhoneNumberIntl } from "react-phone-number-input";

import FormDialog from "@/components/common/form-dialog";
import CustomerViewShipmentsDialog from "@/components/customers/customer-view-shipments/customer-view-shipments-dialog";
import { Button } from "@/components/ui/button";
import { CustomerWithCustomerShipment } from "@/lib/types";

export const columns: ColumnDef<CustomerWithCustomerShipment>[] = [
  {
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    id: "fullName",
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
      const firstName = row.original.firstName;
      const lastName = row.original.lastName;

      return (
        <div className="min-w-[200px] font-medium">{`${firstName} ${lastName}`}</div>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const fullName = `${row.original.firstName} ${row.original.lastName}`;

      return fullName.toLowerCase().includes(filterValue.toLowerCase());
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
      const email: CustomerWithCustomerShipment["email"] =
        row.getValue("email");

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
    id: "phone",
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
      const phone: CustomerWithCustomerShipment["phone"] =
        row.getValue("phone");

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
    id: "customerShipments",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Shipments
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const customerShipments = row.original.customerShipments;

      return <div>{customerShipments.length || 0}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;
      const customerShipment = customer.customerShipments;

      return (
        <div className="flex items-center gap-2">
          <CustomerViewShipmentsDialog customerShipment={customerShipment}>
            📋
          </CustomerViewShipmentsDialog>

          <FormDialog actionType="editCustomer" customer={customer}>
            ✏️
          </FormDialog>
        </div>
      );
    },
  },
];
