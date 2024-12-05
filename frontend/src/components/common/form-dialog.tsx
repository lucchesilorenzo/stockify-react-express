import { useState } from "react";

import { Product, Task } from "@prisma/client";

import CustomerEditForm from "../customers/customer-edit-form";
import OrderForm from "../orders/order-form";
import RestockOrderForm from "../orders/restock-order-form";
import SupplierForm from "../suppliers/supplier-form";
import TaskEditForm from "../tasks/task-edit-form/task-edit-form";
import TaskForm from "../tasks/task-form/task-form";
import TaskGenerationForm from "../tasks/task-generation-form";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DIALOG_BTN_VARIANTS } from "@/lib/constants";
import {
  CustomerWithCustomerShipment,
  FormDialogActionType,
} from "@/lib/types";

type FormDialogProps = {
  children?: React.ReactNode;
  actionType: FormDialogActionType;
  products?: Product[];
  customer?: CustomerWithCustomerShipment;
  task?: Task;
  open?: boolean;
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function FormDialog({
  children,
  actionType,
  products,
  customer,
  task,
  open,
  onOpenChange,
}: FormDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  function handleFormSubmit() {
    setOpen(false);
  }

  if (actionType === "editTask" || actionType === "generateTask") {
    return (
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "editTask" && "Edit task"}
              {actionType === "generateTask" && "Generate task"}
            </DialogTitle>
            <DialogDescription>
              Fill in the details below. Ensure that all required fields are
              completed correctly before submitting.
            </DialogDescription>
          </DialogHeader>
          {actionType === "editTask" && (
            <TaskEditForm onFormSubmit={handleFormSubmit} task={task!} />
          )}
          {actionType === "generateTask" && (
            <TaskGenerationForm onFormSubmit={handleFormSubmit} />
          )}
        </DialogContent>
      </Dialog>
    );
  }

  if (actionType === "editCustomer") {
    return (
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={DIALOG_BTN_VARIANTS[actionType].variant}
            size={DIALOG_BTN_VARIANTS[actionType].size}
          >
            {children}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit customer</DialogTitle>
            <DialogDescription>
              Fill in the details below. Ensure that all required fields are
              completed correctly before submitting.
            </DialogDescription>
          </DialogHeader>
          {actionType === "editCustomer" && (
            <CustomerEditForm
              onFormSubmit={handleFormSubmit}
              customer={customer!}
            />
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={DIALOG_BTN_VARIANTS[actionType].variant}
          size={DIALOG_BTN_VARIANTS[actionType].size}
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === "createOrder" && "Create a new order"}
            {actionType === "createRestockOrder" &&
              "Create a new restock order"}
            {actionType === "addSupplier" && "Add a new supplier"}
            {actionType === "addTask" && "Add a new task"}
          </DialogTitle>
          <DialogDescription>
            Fill in the details below. Ensure that all required fields are
            completed correctly before submitting.
          </DialogDescription>
        </DialogHeader>
        {actionType === "createOrder" && (
          <OrderForm onFormSubmit={handleFormSubmit} />
        )}
        {actionType === "createRestockOrder" && (
          <RestockOrderForm
            onFormSubmit={handleFormSubmit}
            products={products!}
          />
        )}
        {actionType === "addSupplier" && (
          <SupplierForm onFormSubmit={handleFormSubmit} />
        )}
        {actionType === "addTask" && (
          <TaskForm onFormSubmit={handleFormSubmit} />
        )}
      </DialogContent>
    </Dialog>
  );
}
