import React from "react";
import { Card, CardContent } from "../ui/card";

type Props = {};

export function LocationNotValid({}: Props) {
  return (
    <Card className="border-dashed">
      <CardContent className="py-6 text-center text-sm text-muted-foreground">
        Lokasi belum memiliki koordinat yang valid
      </CardContent>
    </Card>
  );
}
