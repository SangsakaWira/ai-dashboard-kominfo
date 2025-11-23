import React from "react";
import { DetailFloodReportContent } from "./content";

export default async function DetailFloodReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <section>
        <DetailFloodReportContent id={id as string} />
    </section>
  );
}