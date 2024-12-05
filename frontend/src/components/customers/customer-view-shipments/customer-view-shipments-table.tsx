"use client";

import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCustomer } from "@/hooks/useCustomer";
import { orderStatuses } from "@/lib/data";
import { CustomerShipmentWithItems } from "@/lib/types";
import { formatCurrency, formatShipmentId } from "@/lib/utils";

type CustomerViewShipmentsTableProps = {
  customerShipment: CustomerShipmentWithItems[];
};

export default function CustomerViewShipmentsTable({
  customerShipment,
}: CustomerViewShipmentsTableProps) {
  const { selectedShipmentId } = useCustomer();

  const shipment = customerShipment.find(
    (shipment) => shipment.id === selectedShipmentId,
  );
  if (!shipment) return null;

  const statusInfo =
    orderStatuses.find((s) => s.value === shipment.status)?.label ||
    shipment.status;

  const totalPrice = shipment.shipmentItems.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          Shipment # {formatShipmentId(shipment)}
        </CardTitle>
        <CardDescription>
          Date: {format(shipment.createdAt, "dd/MM/yyyy")}
          <span className="ml-4">Status: {statusInfo}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shipment.shipmentItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{formatCurrency(item.product.price)}</TableCell>
                <TableCell>
                  {formatCurrency(item.quantity * item.product.price)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} className="text-right font-medium">
                Total
              </TableCell>
              <TableCell className="font-medium">
                {formatCurrency(totalPrice)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
