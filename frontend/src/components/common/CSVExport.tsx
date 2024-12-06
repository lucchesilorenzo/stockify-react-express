import React from "react";

import { Button } from "@/components/ui/button";

import { CSVLink } from "react-csv";

type CSVExportProps = {
  children: React.ReactNode;
  data: Record<string, string | number>[];
  fileName: string;
};

export default function CSVExport({
  children,
  data,
  fileName,
}: CSVExportProps) {
  return (
    <Button variant="outline" asChild>
      <CSVLink data={data} filename={fileName}>
        {children}
      </CSVLink>
    </Button>
  );
}
