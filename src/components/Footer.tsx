import React from "react";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="border-t py-3 bg-card/50">
      <div className="px-6 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-sm text-muted-foreground">
          © 2025 People Analytics Dashboard. KOMDIGI Kominfo Kota Palembang
        </p>
        <p className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </footer>
  );
}
