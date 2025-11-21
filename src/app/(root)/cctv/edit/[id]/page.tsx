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
      <div className="container">
        <EditCctvContent id={id as string} />
      </div>
    </section>
  );
}