import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type MainAlertDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onDeleteItem?: () => void;
  onUpdateItemStatus?: () => void;
  status?: string;
  type: "product" | "order" | "task";
};

export default function MainAlertDialog({
  open,
  setOpen,
  onDeleteItem,
  onUpdateItemStatus,
  status,
  type,
}: MainAlertDialogProps) {
  const statusTitleInfo = status === "ARCHIVED" ? "restore" : "archive";
  const statusDescriptionInfo = status === "ARCHIVED" ? "restored" : "archived";

  if (type === "task") {
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this task?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This task will be deleted. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={onDeleteItem}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {type === "product" &&
              `Are you sure you want to ${statusTitleInfo} this product?`}
            {type === "order" && "Confirm product delivery"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {type === "product" &&
              `This product will be ${statusDescriptionInfo}.`}
            {type === "order" && "This will mark the order as delivered."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={onUpdateItemStatus}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
