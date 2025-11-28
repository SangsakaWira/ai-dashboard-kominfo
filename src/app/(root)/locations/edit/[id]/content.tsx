"use client";
import {
  useLocationDetail,
  useUpdateLocation,
} from "@/hooks/locations";
import { useRouter } from "next/navigation";
import { LocationPayload } from "@/schemas";
import { LocationForm } from "../../LocationForm";

type Props = {
  id: string;
};

export function EditLocationContent({ id }: Props) {
  const { data: loc } = useLocationDetail(Number(id));
  const { updateLocation, isMutating } = useUpdateLocation(Number(id));
  const router = useRouter();

  const handleUpdate = async (payload: LocationPayload) => {
    await updateLocation(payload);
    router.push("/locations");
  };

  if (!loc) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl">
      <h1 className="text-xl font-semibold mb-4">Edit Location</h1>

      <LocationForm
        onSubmit={handleUpdate}
        isMutating={isMutating}
        defaultValues={{
          name: loc.name,
          latitude: loc.latitude,
          longitude: loc.longitude,
          description: loc.description,
          capacity_building: loc.capacity_building,
          zone_type: loc.zone_type,
        }}
        mode="edit"
      />
    </div>
  );
}
