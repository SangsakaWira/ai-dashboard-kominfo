import React from "react";
import { EditReportContent } from "./content";

export default async function EditFloodReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <section>
        <EditReportContent id={id as string} />
    </section>
  );
}