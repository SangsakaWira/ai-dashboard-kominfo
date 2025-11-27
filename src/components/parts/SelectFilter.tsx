import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";

type Option = {
  label: string;
  value: string;
};

type SelectFilterProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  includeAll?: boolean;
  allLabel?: string;
  className?: string;
//   label?: string;
};

export function SelectFilter({
  value,
  onChange,
  options,
  placeholder = "Pilih",
  includeAll = true,
  allLabel = "Semua",
  className,
//   label,
}: SelectFilterProps) {
  return (
    <div className="flex flex-col gap-y-2">
      {/* <Label>{label}</Label> */}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={className ?? "w-[160px]"}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {includeAll && <SelectItem value="all">{allLabel}</SelectItem>}

          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
