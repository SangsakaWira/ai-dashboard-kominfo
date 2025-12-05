import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  href: string;
  isLoading?: boolean
};

export function ButtonCancel({ href, isLoading = false }: Props) {
  return (
    <Button type="button" variant={"secondary"} disabled={isLoading}>
      <Link href={href}>Cancel</Link>
    </Button>
  );
}
