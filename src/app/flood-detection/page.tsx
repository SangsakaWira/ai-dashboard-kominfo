import AlertSystem from "@/components/dashboard/AlertSystem";
import LiveFeedPanel from "@/components/dashboard/LiveFeedPanel";
import MapView from "@/components/dashboard/MapView";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import React from "react";

type Props = {};

export default function FloodDetectionPage({}: Props) {
  return (
    <div>
      {/* <TabsContent value="flood-detection">
      </TabsContent> */}
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Flood Detection System</h1>
          <p className="text-muted-foreground">
            Monitor water levels and receive alerts in real-time
          </p>
        </div>

        {/* Dashboard Content */}
        <div className="space-y-6">
          {/* Top Row - Live Feeds and Alerts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Live CCTV Feeds</CardTitle>
              </CardHeader>
              <CardContent>
                <LiveFeedPanel />
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardContent className="p-0">
                <AlertSystem />
              </CardContent>
            </Card>
          </div>

          {/* Middle Row - Map and Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="col-span-1 md:col-span-2">
              <CardContent className="p-0">
                <MapView />
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-[100px] flex items-center justify-center bg-muted rounded-md">
                    <div className="flex flex-col items-center gap-2">
                      <BarChart3 className="h-6 w-6 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">
                        Water Level Chart
                      </p>
                    </div>
                  </div>
                  <div className="h-[100px] flex items-center justify-center bg-muted rounded-md">
                    <div className="flex flex-col items-center gap-2">
                      <BarChart3 className="h-6 w-6 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">
                        Prediction Models
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row - Control Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Control Panel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Alert Thresholds</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure water level thresholds for alerts
                  </p>
                </div>
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Notification Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage notification preferences
                  </p>
                </div>
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Camera Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure CCTV camera parameters
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
