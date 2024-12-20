import api from "@/lib/axios";
import {isAxiosError} from "axios";
import {
    ConfirmToken,
    ForgotPasswordForm,
    RequestConfirmationCodeForm,
    UserLoginForm,
    UserRegistrationForm
} from "@/types/index.ts";

export async function createAccount(formData: UserRegistrationForm) {
    try {
        const url = '/auth/create-account';
        const {data} = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && isAxiosError(error)) {
            throw new Error(error.response!.data.error);
        }
    }
}

export async function confirmAccount(formData: ConfirmToken) {
    try {
        const url = '/auth/confirm-account';
        const {data} = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && isAxiosError(error)) {
            throw new Error(error.response!.data.error);
        }
    }
}

export async function requestConfirmationToken(formData: RequestConfirmationCodeForm) {
    try {
        const url = '/auth/resend-confirmation-token';
        const {data} = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && isAxiosError(error)) {
            throw new Error(error.response!.data.error);
        }
    }
}

export async function authenticateUser(formData: UserLoginForm) {
    try {
        const url = '/auth/login';
        const {data} = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && isAxiosError(error)) {
            throw new Error(error.response!.data.error);
        }
    }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
    try {
        const url = '/auth/forgot-password';
        const {data} = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && isAxiosError(error)) {
            throw new Error(error.response!.data.error);
        }
    }
}