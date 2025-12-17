import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getApiErrorMessage(error: unknown): string {
  if (error && typeof error === "object") {
    const err = error as any;

    const statusCode =
      err?.response?.statusCode ||
      err?.response?.data?.statusCode ||
      err?.response?.status;

    const errors = err?.response?.errors || err?.response?.data?.errors;
    const message =
      err?.response?.message ||
      err?.response?.data?.message ||
      err.message;

    if (statusCode === 409) {
      if (Array.isArray(errors) && errors[0]?.toLowerCase().includes("unique")) {
        const field = errors[0].split(" ")[1];
        return `${field.toUpperCase()} yang Anda masukkan sudah dipakai. Silakan ubah dan coba lagi`;
      }
      return message || "Terjadi konflik data.";
    }

    if (Array.isArray(errors) && errors.length > 0) {
      return errors[0];
    }

    if (message) return message;
  }

  return "Terjadi kesalahan. Coba lagi.";
}

export function formatDateTime(date: string | Date) {
  return format(new Date(date), "d MMM yyyy HH.mm", { locale: id });
}

export function isValidLatLng(
  lat?: string | number | null,
  lng?: string | number | null
) {
  const latitude = typeof lat === "string" ? parseFloat(lat) : lat;
  const longitude = typeof lng === "string" ? parseFloat(lng) : lng;

  if (
    typeof latitude !== "number" ||
    typeof longitude !== "number" ||
    Number.isNaN(latitude) ||
    Number.isNaN(longitude)
  ) {
    return false;
  }

  return (
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}
