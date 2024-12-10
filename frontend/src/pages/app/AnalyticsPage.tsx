import AnalyticsTabs from "@/components/analytics/AnalyticsTabs";
import H1 from "@/components/common/H1";
import { useEffect } from "react";

export default function AnalyticsPage() {
  useEffect(() => {
    document.title = "Analytics | Stockify";
  }, []);

  return (
    <main>
      <H1>Analytics</H1>

      <div className="my-6">
        <AnalyticsTabs />
      </div>
    </main>
  );
}
