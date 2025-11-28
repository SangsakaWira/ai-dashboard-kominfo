'use client'
import React from 'react'
import { LocationForm } from '../LocationForm';
import { useRouter } from 'next/navigation';
import { useCreateLocation } from '@/hooks/locations';
import { LocationPayload } from '@/schemas';

type Props = {}

export default function AddLocationPage() {
  const { createLocation, isMutating } = useCreateLocation()
  const router = useRouter()

  const handleCreate = async (payload: LocationPayload) => {
    await createLocation(payload)
    router.push("/locations")
  };

  return (
    <div className="max-w-5xl">
      <h1 className="text-xl font-semibold mb-4">Create Location</h1>

      <LocationForm
        onSubmit={handleCreate}
        isMutating={isMutating}
        defaultValues={{
            name: "",
          latitude: "",
          longitude: "",
          description: "",
          zone_type: "",
          capacity_building: undefined
        }}
        mode="create"
      />
    </div>
  );
}