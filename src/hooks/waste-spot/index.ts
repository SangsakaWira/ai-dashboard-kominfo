import { WasteSpot } from "@/types";
import { useApi } from "../useApi";
import { wasteSpotService } from "@/services/api.service";
import { useApiMutation } from "../useApiMutation";
import { mutate } from "swr";
import { WasteSpotSchemaPayload } from "@/schemas";

export const useWasteSpot = (params?: {
    page?: number;
    limit?: number;
    sort?: string;
    severity?: string;
    waste_type?: string;
    status?: string;
}) => useApi<WasteSpot[]>(wasteSpotService.list, params);

export const useWasteSpotDetail = (id?: number) => {
    return useApi<WasteSpot>(id ? wasteSpotService.detail(id) : null);
};

export const useCreateWasteSpot = () => {
    const { trigger, data, error, isMutating } =
        useApiMutation<WasteSpot>(wasteSpotService.create);

    const createWasteSpot = async (payload: WasteSpotSchemaPayload) => {
        const result = await trigger({
            method: "POST",
            data: payload,
        });

        mutate(wasteSpotService.list);

        return result;
    };

    return { createWasteSpot, data, error, isMutating };
};

export const useUpdateWasteSpot = (id: number) => {
    const { trigger, data, error, isMutating } =
        useApiMutation<WasteSpot>(wasteSpotService.update(id));

    const updateWasteSpot = async (payload: WasteSpotSchemaPayload) => {
        const result = await trigger({
            method: "PATCH",
            data: payload,
        });

        mutate(wasteSpotService.list);
        mutate(wasteSpotService.detail(id));

        return result;
    };

    return { updateWasteSpot, data, error, isMutating };
};

export const useDeleteWasteSpot = () => {
    const deleteWasteSpot = async (id: number) => {
        const { trigger } = useApiMutation<WasteSpot>(wasteSpotService.delete(id));

        const result = await trigger({
            method: "DELETE",
        });

        mutate(wasteSpotService.list);

        return result;
    };

    return { deleteWasteSpot };
};
