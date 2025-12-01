"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  value?: string;
  onChange: (filter: { created?: string }) => void;
};

export function SortFilter({ value, onChange }: Props) {
  return (
    <Select
      value={value}
      onValueChange={(value) =>
        onChange({
          created: value === "all" ? undefined : value,
        })
      }
    >
      <SelectTrigger className="w-[160px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="-created_at">Newest → Oldest</SelectItem>
        <SelectItem value="created_at">Oldest → Newest</SelectItem>
      </SelectContent>
    </Select>
  );
}
