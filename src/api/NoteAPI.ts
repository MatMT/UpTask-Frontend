import {isAxiosError} from "axios";
import api from "@/lib/axios";
import {NoteFormData, noteSchema, Project, Task} from "@/types/index.ts";

type NoteAPI = {
    formData: NoteFormData;
    projectId: Project["_id"];
    taskId: Task["_id"]
}

export async function createNote({formData, projectId, taskId}: Pick<NoteAPI, 'formData'| 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes`;
        const {data} = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

// export async function getNotes({projectId, taskId}: Pick<NoteAPI, 'projectId' | 'taskId'>) {
//     try {
//         const url = `/projects/${projectId}/tasks/${taskId}`;
//         const {data} = await api.get(url);
//
//         const response = noteSchema.safeParse(data);
//         console.log(response.error);
//
//         if (response.success)
//             return response.data;
//     } catch (error) {
//         if (isAxiosError(error) && error.response) {
//             throw new Error(error.response.data.error);
//         }
//     }
// }
//
// export async function deleteTask({projectId, taskId}: Pick<NoteAPI, 'projectId' | 'taskId'>) {
//     try {
//         const url = `/projects/${projectId}/tasks/${taskId}`;
//         const {data} = await api.delete<string>(url);
//         return data;
//     } catch (error) {
//         if (isAxiosError(error) && error.response) {
//             throw new Error(error.response.data.error);
//         }
//     }
// }

