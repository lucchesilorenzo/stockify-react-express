import H1 from "@/components/common/H1";
import Spinner from "@/components/common/Spinner";
import { columns } from "@/components/tables/tasks/columns";
import TasksTable from "@/components/tables/tasks/TasksTable";
import { useTasks } from "@/hooks/queries/useTasks";
import { useEffect } from "react";

export default function TasksPage() {
  const { data: tasks = [], isLoading } = useTasks();

  useEffect(() => {
    document.title = "Tasks | Stockify";
  }, []);

  if (isLoading) return <Spinner size="large" />;

  return (
    <main>
      <H1>Tasks</H1>
      <p className="mt-1 text-muted-foreground">
        Manage and track tasks related to your warehouse.
      </p>

      <div className="my-6 grid grid-cols-1">
        <TasksTable columns={columns} data={tasks} />
      </div>
    </main>
  );
}
