import AnalyticsTabs from "@/components/analytics/AnalyticsTabs";
import H1 from "@/components/common/H1";

export default function AnalyticsPage() {
  return (
    <main>
      <H1>Analytics</H1>

      <div className="my-6">
        <AnalyticsTabs />
      </div>
    </main>
  );
}
