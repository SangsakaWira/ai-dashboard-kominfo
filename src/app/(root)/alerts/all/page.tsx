"use client";
import { useAlerts } from "@/hooks/alerts";
import React from "react";
// import { AllAlertsContent } from "./content";
import { DataTable } from "@/components/ui/data-table";
import { alertColumns } from "../columns";
import { AlertFilters } from "../AlerFilters";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { SortFilter } from "@/components/parts/SortFilter";

type Props = {};

export default function AllAlertsPage({}: Props) {
  const { page, setPage, limit, setLimit } = usePaginationParams(1, 10);
  const [filter, setFilter] = React.useState<{
    level?: string;
    type?: string;
    title?: string;
    created?: string;
  }>({});
  const {
    data = [],
    meta,
    links,
    isLoading,
  } = useAlerts({
    page,
    limit: 10,
    sort: filter.created,
    level: filter.level,
    type: filter.type,
    title: filter.title,
  });

  return (
    <div className="grid grid-cols-1 gap-6 p-0 md:p-6">
      <div>
        <h1 className="text-xl font-semibold mb-4">Alerts</h1>
        <div className="flex flex-wrap gap-4 mb-4">
          <AlertFilters
            level={filter.level}
            type={filter.type}
            title={filter.title}
            onChange={(f) => {
              setFilter(f);
              setPage(1);
            }}
          />
          <SortFilter
            value={filter.created}
            onChange={(sortObj) =>
              setFilter((prev) => ({
                ...prev,
                created: sortObj.created,
              }))
            }
          />
        </div>

        <DataTable
          columns={alertColumns}
          data={data}
          currentPage={meta?.currentPage ?? 1}
          totalPages={meta?.totalPages ?? 1}
          hasNext={!!links?.next}
          hasPrev={!!links?.prev}
          onPageChange={setPage}
          loading={isLoading}
        />
      </div>
    </div>
    // <AllAlertsContent
    //   data={data || []}
    //   meta={{
    //     currentPage: meta?.page.currentPage ?? 1,
    //     totalPages: meta?.page.totalPages ?? 1,
    //   }}
    //   onPageChange={setPage}
    // />
  );
}
