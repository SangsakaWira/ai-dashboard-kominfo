"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useCreateCctv } from "@/hooks/cctv";
import { CctvPayload, cctvSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import { ButtonCancel } from "@/components/parts/ButtonCancel";
import { MapPicker } from "@/components/parts/MapPicker";
import { CctvForm } from "../CctvForm";

export default function CreateCctvPage() {
  const { createCctv, isMutating } = useCreateCctv();
  const router = useRouter();

  const handleCreate = async (values: CctvPayload) => {
    await createCctv(values);
    router.push("/cctv");
  };

  return (
    <div className="max-w-5xl">
      <h1 className="text-xl font-semibold mb-4">Create CCTV</h1>

      <CctvForm
        onSubmit={handleCreate}
        isMutating={isMutating}
        defaultValues={{
          name: "",
          latitude: undefined,
          longitude: undefined,
          status: "online",
          category: "",
          stream_url: "",
          location_name: "",
        }}
        mode="create"
      />
    </div>
  );
}
