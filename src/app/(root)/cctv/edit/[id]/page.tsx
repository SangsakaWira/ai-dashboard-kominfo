import React from "react";
import { EditCctvContent } from "./content";

export default async function EditCctvPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <section>
        <EditCctvContent id={id as string} />
    </section>
  );
}