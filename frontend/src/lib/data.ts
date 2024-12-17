import { FontSizeIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Circle,
  CircleCheckBig,
  CircleHelp,
  CircleOff,
  ClipboardList,
  Euro,
  Home,
  LineChart,
  Monitor,
  Package,
  ShoppingCart,
  Star,
  Timer,
  Truck,
  UsersRound,
} from "lucide-react";

import {
  OrderStatus,
  CategoryVATRates,
  OrderType,
  ProductStatus,
  TaskLabel,
  TaskPriority,
  TaskStatus,
} from "./types";

export const routes = [
  { name: "Dashboard", href: "/app/dashboard", icon: Home },
  { name: "Tasks", href: "/app/tasks", icon: ClipboardList },
  { name: "Orders", href: "/app/orders", icon: ShoppingCart },
  { name: "Products", href: "/app/products", icon: Package },
  { name: "Suppliers", href: "/app/suppliers", icon: Truck },
  { name: "Customers", href: "/app/customers", icon: UsersRound },
  { name: "Analytics", href: "/app/analytics", icon: LineChart },
];

export const dashboardData = [
  {
    title: "Inventory Value",
    description: "Value of your inventory",
    icon: Euro,
  },
  {
    title: "Low Stock Products",
    description: "Products to restock",
    icon: AlertTriangle,
  },
  {
    title: "Shipped Orders",
    description: "Orders to be delivered",
    icon: Truck,
  },
  {
    title: "Total Units",
    description: "In stock",
    icon: Package,
  },
];

export const suppliersData = [
  {
    title: "Total Suppliers",
    description: "Number of suppliers",
    icon: Truck,
  },
  {
    title: "Average Rating",
    description: "Average rating of suppliers",
    icon: Star,
  },
];

export const themeData = [
  { name: "Light", value: "light", icon: SunIcon },
  { name: "Dark", value: "dark", icon: MoonIcon },
  { name: "System", value: "system", icon: Monitor },
];

export const fontSizeData = [
  { name: "Medium", value: "text-md", icon: FontSizeIcon },
  { name: "Large", value: "text-lg", icon: FontSizeIcon },
  { name: "Extra Large", value: "text-xl", icon: FontSizeIcon },
];

export const categoryVATRates: CategoryVATRates[] = [
  { value: "4", label: "4%" },
  { value: "10", label: "10%" },
  { value: "22", label: "22%" },
];

export const productStatuses: ProductStatus[] = [
  { value: "IN_STOCK", label: "In Stock" },
  { value: "OUT_OF_STOCK", label: "Out of Stock" },
  { value: "ARCHIVED", label: "Archived" },
];

export const orderTypes: OrderType[] = [
  { value: "NEW", label: "New Orders" },
  { value: "RESTOCK", label: "Restock Orders" },
];

export const orderStatuses: OrderStatus[] = [
  { value: "SHIPPED", label: "Shipped" },
  { value: "DELIVERED", label: "Delivered" },
];

export const taskStatuses: TaskStatus[] = [
  { value: "BACKLOG", label: "Backlog", icon: CircleHelp },
  { value: "TO_DO", label: "To-Do", icon: Circle },
  { value: "IN_PROGRESS", label: "In Progress", icon: Timer },
  { value: "DONE", label: "Done", icon: CircleCheckBig },
  { value: "CANCELED", label: "Canceled", icon: CircleOff },
];

export const taskPriorities: TaskPriority[] = [
  { value: "LOW", label: "Low", icon: ArrowDown },
  { value: "MEDIUM", label: "Medium", icon: ArrowRight },
  { value: "HIGH", label: "High", icon: ArrowUp },
];

export const taskLabels: TaskLabel[] = [
  { value: "INVENTORY", label: "Inventory" },
  { value: "ORDER", label: "Order" },
  { value: "SHIPPING", label: "Shipping" },
  { value: "QUALITY", label: "Quality" },
  { value: "CUSTOMER", label: "Customer" },
  { value: "MAINTENANCE", label: "Maintenance" },
];
