import cron from "node-cron";

import { updateCurrentMonthInventoryValueQuery } from "./queries/analytics-queries";

// Update inventory value every first day of the month ("0 0 1 * *")
// Every minute for testing ("* * * * *")
export function inventoryCronJob() {
  cron.schedule("* * * * *", updateCurrentMonthInventoryValueQuery);
}
