import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  href: string;
};

export function ButtonCancel({ href }: Props) {
  return (
    <Button type="button" variant={"secondary"}>
      <Link href={href}>Cancel</Link>
    </Button>
  );
}
