import {dashboardProjectSchema, Project, ProjectFormData, projectSchema} from "@/types/index";
import api from "@/lib/axios";
import {isAxiosError} from "axios";

export async function createProject(formData: ProjectFormData) {
    try {
        const {data} = await api.post("/projects", formData);
        return data;
    } catch (error) {
        // Check if the error is an Axios error
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getProjects() {
    try {
        const {data} = await api("/projects");
        const response = dashboardProjectSchema.safeParse(data);
        if (response.success)
            return response.data
    } catch (error) {
        // Check if the error is an Axios error
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getProjectById(id: Project["_id"]) {
    try {
        const {data} = await api(`/projects/${id}`);
        const response = projectSchema.safeParse(data);

        if (response.success)
            return response.data
    } catch (error) {
        // Check if the error is an Axios error
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

type ProjectAPIType = {
    projectId: Project["_id"];
    formData: ProjectFormData;
}

export async function updateProject({formData, projectId}: ProjectAPIType) {
    try {
        const {data} = await api.put(`/projects/${projectId}`, formData);
        const response = projectSchema.safeParse(data);
        if (response.success)
            return response.data
    } catch (error) {
        // Check if the error is an Axios error
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteProject(id: Project["_id"]) {
    try {
        const {data} = await api.delete<string>(`/projects/${id}`);
        return data
    } catch (error) {
        // Check if the error is an Axios error
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
