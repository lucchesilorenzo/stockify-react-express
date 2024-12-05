import H1 from "@/components/common/h1";
import Spinner from "@/components/common/spinner";
import DashboardSummary from "@/components/dashboard/dashboard-summary";
import ActivitiesTable from "@/components/tables/dashboard/activities-table";
import { columns } from "@/components/tables/dashboard/columns";
import { useActivities } from "@/hooks/queries/useActivities";

export default function DashboardPage() {
  const { data: activities, isLoading } = useActivities();

  return (
    <main>
      <H1>Dashboard</H1>

      <div className="my-6 space-y-6">
        <DashboardSummary />

        <div className="my-6 grid grid-cols-1">
          {isLoading ? (
            <Spinner size="large" />
          ) : (
            <ActivitiesTable columns={columns} data={activities} />
          )}
        </div>
      </div>
    </main>
  );
}
