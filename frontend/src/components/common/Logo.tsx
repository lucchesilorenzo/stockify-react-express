import { Warehouse } from "lucide-react";
import { Link } from "react-router-dom";

type LogoProps = {
  device: "desktop" | "mobile";
  onOpenChange?: () => void;
};

export default function Logo({ device, onOpenChange }: LogoProps) {
  return (
    <Link
      to="/app/dashboard"
      className="flex items-center gap-2 font-semibold"
      onClick={onOpenChange}
    >
      <Warehouse className="mr-1 h-6 w-6" />
      {device === "desktop" && <span>Stockify</span>}
    </Link>
  );
}
