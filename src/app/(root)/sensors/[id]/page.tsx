import React from "react";
import { DetailSensorContent } from "./content";

export default async function DetailFloodReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <section>
        <DetailSensorContent id={id as string} />
    </section>
  );
}