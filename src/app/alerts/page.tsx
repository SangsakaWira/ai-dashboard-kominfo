import AlertSystem from "@/components/dashboard/AlertSystem";
import React from "react";

type Props = {};

export default function AlertsPage({}: Props) {
  return (
    <div>
        <div className="grid grid-cols-1 gap-6">
          <AlertSystem />
        </div>
      {/* <TabsContent value="alerts">
      </TabsContent> */}
    </div>
  );
}
