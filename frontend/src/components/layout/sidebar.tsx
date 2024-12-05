import Logo from "../common/logo";
import Navigation from "./navigation";

export default function Sidebar() {
  return (
    <aside className="hidden border-r bg-muted/40 lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Logo device="desktop" />
        </div>
        <Navigation />
      </div>
    </aside>
  );
}
