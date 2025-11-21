import React from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  InfoIcon,
  XIcon,
} from "lucide-react";
import { Alert, MetaPage } from '@/types';
import { format } from 'date-fns';

type Props = {
    data: Alert[]
    meta: MetaPage
    onPageChange: (page: number) => void;
}

export function AllAlertsContent({data,meta,onPageChange}: Props) {
    const getAlertIcon = (type: string) => {
    switch (type) {
      case "danger":
        return <AlertTriangleIcon className="h-5 w-5 text-destructive" />;
      case "warning":
        return <AlertTriangleIcon className="h-5 w-5 text-amber-500" />;
      case "info":
        return <InfoIcon className="h-5 w-5 text-blue-500" />;
      default:
        return <InfoIcon className="h-5 w-5" />;
    }
  };

  const getAlertBadge = (type: string) => {
    switch (type) {
      case "danger":
        return <Badge variant="destructive">Danger</Badge>;
      case "warning":
        return <Badge className="bg-amber-500">Warning</Badge>;
      case "info":
        return <Badge variant="secondary">Info</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  return (
    <Card className="w-full h-full bg-background border shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            Alert System
          </CardTitle>
          {/* <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {notificationsEnabled ? "Notifications On" : "Notifications Off"}
            </span>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div> */}
        </div>
      </CardHeader>
      <div className="grid grid-cols-1 gap-6">
        <CardContent className="p-4">
          {data && data.length > 0 ? (
            <div className="space-y-3">
              {data.slice(0, 10).map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-md border ${alert.is_read ? "bg-background" : "bg-muted/30"} ${alert.type === "critical" ? "border-destructive/50" : "border-border"}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3 items-start">
                      {getAlertIcon(alert.level)}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {getAlertBadge(alert.level)}
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(alert.created_at), "hh:mm a")}
                          </span>
                        </div>
                        <p className="text-sm">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {alert.type}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      // onClick={() => onDismiss(alert.id)}
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>

                  {alert.type === "critical" && (
                    <div className="mt-2 flex justify-end">
                      <Button
                        size="sm"
                        variant="destructive"
                        className="text-xs"
                        // onClick={() => onEscalate(alert.id)}
                      >
                        Escalate
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[280px] flex flex-col items-center justify-center text-center p-4">
              <CheckCircleIcon className="h-12 w-12 text-primary/50 mb-2" />
              <h3 className="font-medium">No Active Alerts</h3>
              <p className="text-sm text-muted-foreground mt-1">
                All systems operating normally
              </p>
            </div>
          )}
        </CardContent>
      </div>

      <div className="flex justify-center items-center gap-x-4 pt-4">
        <Button
          variant="outline"
          disabled={meta.currentPage <= 1}
          onClick={() => onPageChange(meta.currentPage - 1)}
        >
          Previous
        </Button>

        <p className="text-sm text-muted-foreground">
          Page {meta.currentPage} of {meta.totalPages}
        </p>

        <Button
          variant="outline"
          disabled={meta.currentPage >= meta.totalPages}
          onClick={() => onPageChange(meta.currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </Card>
  )
}