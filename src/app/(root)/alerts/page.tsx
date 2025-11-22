'use client'
import AlertSystem from "@/components/dashboard/AlertSystem";
import { useAlerts } from "@/hooks/alerts";
import React from "react";

type Props = {};

export default function AlertsPage({}: Props) {
  const {data} = useAlerts()
  return (
    <div>
      <div className="grid grid-cols-1 gap-6">
        <AlertSystem alerts={data} />
      </div>
      {/* <TabsContent value="alerts">
      </TabsContent> */}
    </div>
  );
}
