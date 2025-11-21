'use client'
import { useAlerts } from "@/hooks/alerts";
import React from "react";
import { AllAlertsContent } from "./content";

type Props = {};

export default function AllAlertsPage({}: Props) {
  const [page, setPage] = React.useState(1);
  const { data, meta } = useAlerts({
    page,
    limit: 10,
  });

  return (
    <AllAlertsContent
      data={data || []}
      meta={{
        currentPage: meta?.page.currentPage ?? 1,
        totalPages: meta?.page.totalPages ?? 1,
      }}
      onPageChange={setPage}
    />
  );
}
