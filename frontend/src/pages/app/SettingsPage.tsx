import H1 from "@/components/common/H1";
import Spinner from "@/components/common/spinner";
import SettingsForm from "@/components/settings/SettingsForm";
import { Separator } from "@/components/ui/separator";
import { useSettings } from "@/hooks/queries/useSettings";

export default function SettingsPage() {
  // TODO: fetch user settings
  // const session = await checkAuth();
  const { data: userSettings, isLoading } = useSettings(); // Hardcoded user ID

  if (isLoading) return <Spinner size="large" />;

  return (
    <main>
      <div className="space-y-1">
        <H1>Settings</H1>
        <p className="text-sm text-muted-foreground">
          Manage your account settings.
        </p>
      </div>

      <Separator className="my-6" />

      {userSettings && <SettingsForm userSettings={userSettings} />}
    </main>
  );
}
