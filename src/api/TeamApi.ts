import {isAxiosError} from "axios";
import api from "@/lib/axios.ts";
import {Project, TeamMember, TeamMemberForm} from "@/types/index.ts";

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
        const {data} = await api.post(url, {id: userId});
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}