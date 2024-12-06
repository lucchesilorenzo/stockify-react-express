import H1 from "@/components/common/H1";
import SettingsForm from "@/components/settings/SettingsForm";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  // TODO: fetch user settings
  // const session = await checkAuth();
  // const userSettings = await getSettingsByUserId(session.user.id);

  return (
    <main>
      <div className="space-y-1">
        <H1>Settings</H1>
        <p className="text-sm text-muted-foreground">
          Manage your account settings.
        </p>
      </div>

      <Separator className="my-6" />

      {/* <SettingsForm userSettings={userSettings} /> */}
    </main>
  );
}
