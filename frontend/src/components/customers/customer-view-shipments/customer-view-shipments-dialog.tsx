"use client";

import { useState } from "react";

import CustomerViewShipments from "./customer-view-shipments";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CustomerShipmentWithItems } from "@/lib/types";

type CustomerViewShipmentsDialogProps = {
  children: React.ReactNode;
  customerShipment: CustomerShipmentWithItems[];
};

export default function CustomerViewShipmentsDialog({
  children,
  customerShipment,
}: CustomerViewShipmentsDialogProps) {
  const [closeDialog, setCloseDialog] = useState(false);

  return (
    <Dialog open={closeDialog} onOpenChange={setCloseDialog}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Shipment Details</DialogTitle>
          <DialogDescription>
            View all shipments and their products.
          </DialogDescription>
        </DialogHeader>
        <CustomerViewShipments customerShipment={customerShipment} />
      </DialogContent>
    </Dialog>
  );
}
