'use client'
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type AlertFiltersProps = {
  level?: string;
  type?: string;
  title?: string;
  onChange: (filter: { level?: string; type?: string; title?: string }) => void;
};

export function AlertFilters({ level, type, title, onChange }: AlertFiltersProps) {
  const [localTitle, setLocalTitle] = React.useState(title ?? "");

  React.useEffect(() => {
    setLocalTitle(title ?? "");
  }, [title]);

  React.useEffect(() => {
    const delay = setTimeout(() => {
      onChange({
        level,
        type,
        title: localTitle || undefined,
      });
    }, 300);

    return () => clearTimeout(delay);
  }, [localTitle]);
  return (
    <div className="flex items-center gap-4 py-4">
      <Input
        placeholder="Search..."
        className="w-[240px]"
        type="search"
        value={localTitle}
        onChange={(e) => setLocalTitle(e.target.value)}
      />
      {/* Filter Level */}
      <Select
        value={level ?? "all"}
        onValueChange={(value) =>
          onChange({
            level: value === "all" ? undefined : value,
            type,
          })
        }
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Filter Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Level</SelectItem>
          <SelectItem value="danger">Danger</SelectItem>
          <SelectItem value="warning">Warning</SelectItem>
          <SelectItem value="info">Info</SelectItem>
        </SelectContent>
      </Select>

      {/* Filter Type */}
      <Select
        value={type ?? "all"}
        onValueChange={(value) =>
          onChange({
            level,
            type: value === "all" ? undefined : value,
          })
        }
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Filter Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Type</SelectItem>
          <SelectItem value="sensor">Sensor</SelectItem>
          <SelectItem value="manual">Manual</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}