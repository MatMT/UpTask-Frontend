import {isAxiosError} from "axios";
import api from "@/lib/axios.ts";
import {Project, TeamMember, TeamMemberForm, teamMembersSchema} from "@/types/index.ts";

export async function findUserByEmail({projectId, formData}: { projectId: Project['_id'], formData: TeamMemberForm }) {
    try {
        const url = `/projects/${projectId}/team/find`;
        const {data} = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

export async function addUserToProject({projectId, userId}: { projectId: Project['_id'], userId: TeamMember['_id'] }) {
    try {
        const url = `/projects/${projectId}/team`;
        const {data} = await api.post<string>(url, {id: userId});
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

export async function removeUserFromProject({projectId, userId}: { projectId: Project['_id'], userId: TeamMember['_id'] }) {
    try {
        const url = `/projects/${projectId}/team/${userId}`;
        const {data} = await api.delete<string>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}


export async function getProjectTeam(projectId: Project['_id']) {
    try {
        const url = `/projects/${projectId}/team`;
        const {data} = await api(url);
        const response = teamMembersSchema.safeParse(data);

        console.log(response.error)
        if (response.success)
            return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}