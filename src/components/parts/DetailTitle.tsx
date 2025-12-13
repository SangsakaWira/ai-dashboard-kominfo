"use client";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
    backUrl: string
    title: string
};

export function DetailTitle({backUrl, title}: Props) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-x-3 mb-3">
      <ArrowLeftIcon size={16} className="cursor-pointer" onClick={() => router.push(backUrl)} />
      <h2 className="font-semibold">{title}</h2>
    </div>
  );
}
