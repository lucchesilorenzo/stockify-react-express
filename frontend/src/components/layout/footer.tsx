import { Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-2 text-xs">
          <p className="flex items-center">
            <span className="mr-1">
              &copy; {new Date().getFullYear()} Stockify.
            </span>
            <span className="flex items-center">
              Warehouse Management System
            </span>
          </p>
          <p className="flex items-center">
            <span className="mr-1">Developed with</span>
            <Lightbulb className="h-4 w-4 text-yellow-500" aria-hidden="true" />
            <span className="sr-only">passion</span>
            <span className="ml-1">by</span>
            <Link
              to="https://github.com/lucchesilorenzo"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 font-medium hover:underline"
            >
              Lorenzo Lucchesi
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
