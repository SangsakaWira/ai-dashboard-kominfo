import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

