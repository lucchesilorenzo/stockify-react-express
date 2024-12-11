import { routes } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();

  return (
    <nav>
      <ul className="flex flex-col px-2 font-medium lg:px-4">
        {routes.map((route) => (
          <li key={route.name}>
            <Link
              to={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                route.href === location.pathname
                  ? "bg-muted text-primary"
                  : "text-muted-foreground",
              )}
            >
              <route.icon className="h-5 w-5" />
              {route.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
