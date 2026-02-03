"use client";

import { Badge } from "@/components/ui/badge";

type SummaryProps = {
  totalHours: number;
};

export default function Summary({ totalHours }: SummaryProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Total Hours:</span>
      <Badge variant="secondary" className="text-base font-bold">
        {totalHours.toFixed(1)}
      </Badge>
    </div>
  );
}
