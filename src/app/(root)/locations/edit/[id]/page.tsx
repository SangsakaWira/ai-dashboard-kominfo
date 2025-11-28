import React from "react";
import { EditLocationContent } from "./content";

export default async function EditLocationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <section>
      <EditLocationContent id={id as string} />
    </section>
  );
}
