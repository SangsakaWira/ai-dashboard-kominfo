import React from "react";
import { EditSensorContent } from "./content";

export default async function EditSensorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <section>
      <div className="container">
        <EditSensorContent id={id as string} />
      </div>
    </section>
  );
}