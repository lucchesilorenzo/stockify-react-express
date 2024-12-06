import React from "react";

import { LocateIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";

type WarehouseCardProps = {
  card: {
    title: string;
    occupancyRate: number;
    location: string;
    description: string;
    icon: React.ElementType;
  };
};

export default function WarehouseCard({ card }: WarehouseCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-medium">{card.title}</CardTitle>
        <card.icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex items-center space-x-2">
          <LocateIcon className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{card.location}</p>
        </div>
        <div className="text-2xl font-bold">
          {card.occupancyRate.toFixed(1)}%
        </div>
        <p className="text-xs text-muted-foreground">{card.description}</p>
      </CardContent>
      <CardFooter>
        <Progress value={card.occupancyRate} />
      </CardFooter>
    </Card>
  );
}
