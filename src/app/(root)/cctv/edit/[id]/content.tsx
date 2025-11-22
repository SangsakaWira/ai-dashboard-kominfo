"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useCctvDetail, useCreateCctv, useUpdateCctv } from "@/hooks/cctv"
import { CctvPayload, cctvSchema } from "@/schemas"
import { useRouter } from "next/navigation"
import React from "react"


export function EditCctvContent({id}: {id: string}) {
  const { data: cctv, isLoading } = useCctvDetail(Number(id))
  const { updateCctv,isMutating } = useUpdateCctv(Number(id))
  const router = useRouter()

  const form = useForm<CctvPayload>({
    // resolver: zodResolver(cctvSchema),
    defaultValues: {
      name: "",
      latitude: "",
      longitude: "",
      status: "online",
      category: "",
      stream_url: "",
      location_name: "",
    },
  })

  React.useEffect(() => {
      if (cctv) {
        form.reset({
          name: cctv.name,
          category: cctv.category ?? "",
          latitude: cctv.latitude,
          longitude: cctv.longitude,
          location_name: cctv.location_name,
          status: cctv.status,
          stream_url: cctv.stream_url,
          
        });
      }
    }, [cctv, form]);

  const onSubmit = async (values: CctvPayload) => {
    await updateCctv(values)
    router.push("/cctv")
    // redirect or toast success
  }

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-xl font-semibold">Edit CCTV</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="CCTV Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Stream URL */}
          <FormField
            control={form.control}
            name="stream_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stream URL</FormLabel>
                <FormControl>
                  <Input placeholder="Stream URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Latitude */}
          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input placeholder="Latitude" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Longitude */}
          <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input placeholder="Longitude" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => {
              return (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  key={field.value}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="public-area">Public Area</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}}
          />

          {/* Location Name */}
          <FormField
            control={form.control}
            name="location_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location Name</FormLabel>
                <FormControl>
                  <Input placeholder="Location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isMutating}>
            {isMutating ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
