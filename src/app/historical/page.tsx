import TimeSeriesGraph from "@/components/dashboard/TimeSeriesGraph";
import React from "react";

type Props = {};

export default function HistoricalPage({}: Props) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6">
        <TimeSeriesGraph />
      </div>
      {/* <TabsContent value="historical">
      </TabsContent> */}
    </div>
  );
}
