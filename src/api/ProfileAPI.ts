import api from "@/lib/axios.ts";
import {isAxiosError} from "axios";
import {UpdateCurrentUserPassword, UserProfileForm} from "@/types/index.ts";

export async function updateProfile(formData: UserProfileForm) {
    try {
        const {data} = await api.put<string>('/auth/update-profile', formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function changePassword(formData: UpdateCurrentUserPassword) {
    try {
        const {data} = await api.post<string>('/auth/update-password', formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
