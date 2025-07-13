"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  BellOff,
  AlertTriangle,
  Info,
  CheckCircle,
  X,
  ChevronRight,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Alert {
  id: string;
  type: "warning" | "info" | "critical";
  message: string;
  timestamp: Date;
  zone: string;
  read: boolean;
}

interface AlertSystemProps {
  alerts?: Alert[];
  onDismiss?: (id: string) => void;
  onEscalate?: (id: string) => void;
  onConfigureThresholds?: () => void;
}

export default function AlertSystem({
  alerts = [
    {
      id: "1",
      type: "critical",
      message: "Occupancy exceeds maximum capacity in Zone A",
      timestamp: new Date(),
      zone: "Zone A",
      read: false,
    },
    {
      id: "2",
      type: "warning",
      message: "Unusual crowd formation detected in Zone B",
      timestamp: new Date(Date.now() - 15 * 60000),
      zone: "Zone B",
      read: false,
    },
    {
      id: "3",
      type: "info",
      message: "Traffic flow normal in all zones",
      timestamp: new Date(Date.now() - 30 * 60000),
      zone: "All Zones",
      read: true,
    },
  ],
  onDismiss = () => {},
  onEscalate = () => {},
  onConfigureThresholds = () => {},
}: AlertSystemProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getAlertBadge = (type: string) => {
    switch (type) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "warning":
        return <Badge className="bg-amber-500">Warning</Badge>;
      case "info":
        return <Badge variant="secondary">Info</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Card className="w-full h-full bg-background border shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            {notificationsEnabled ? (
              <Bell className="h-5 w-5 text-primary" />
            ) : (
              <BellOff className="h-5 w-5 text-muted-foreground" />
            )}
            Alert System
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {notificationsEnabled ? "Notifications On" : "Notifications Off"}
            </span>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        {alerts.length > 0 ? (
          <ScrollArea className="h-[280px] pr-4">
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-md border ${alert.read ? "bg-background" : "bg-muted/30"} ${alert.type === "critical" ? "border-destructive/50" : "border-border"}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3 items-start">
                      {getAlertIcon(alert.type)}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {getAlertBadge(alert.type)}
                          <span className="text-xs text-muted-foreground">
                            {formatTime(alert.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {alert.zone}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => onDismiss(alert.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {alert.type === "critical" && (
                    <div className="mt-2 flex justify-end">
                      <Button
                        size="sm"
                        variant="destructive"
                        className="text-xs"
                        onClick={() => onEscalate(alert.id)}
                      >
                        Escalate
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="h-[280px] flex flex-col items-center justify-center text-center p-4">
            <CheckCircle className="h-12 w-12 text-primary/50 mb-2" />
            <h3 className="font-medium">No Active Alerts</h3>
            <p className="text-sm text-muted-foreground mt-1">
              All systems operating normally
            </p>
          </div>
        )}
      </CardContent>

      <Separator />

      <CardFooter className="pt-4 flex justify-between">
        <Button variant="outline" size="sm" onClick={onConfigureThresholds}>
          Configure Thresholds
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs flex items-center gap-1"
        >
          View All Alerts
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
