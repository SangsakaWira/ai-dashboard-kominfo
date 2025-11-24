import React from "react";
import { EditSpotContent } from "./content";

export default async function EditFloodSpotPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <section>
      <EditSpotContent id={id as string} />
    </section>
  );
}
