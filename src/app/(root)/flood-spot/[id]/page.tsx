import React from "react";
import { DetailFloodSpotContent } from "./content";

export default async function DetailFloodSpotPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <section>
        <DetailFloodSpotContent id={id as string} />
    </section>
  );
}