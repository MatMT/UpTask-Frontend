import {Note} from "@/types/index.ts";
import {formatDate} from "@/utils/utils.ts";
import {toast} from "react-toastify";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteNote} from "@/api/NoteAPI.ts";
import {useLocation, useParams} from "react-router-dom";
import {useAuth} from "@/hooks/useAuth.ts";
import {useMemo} from "react";

type NoteDetailProps = {
    note: Note;
}

export default function NoteDetail({note}: NoteDetailProps) {
    const {data} = useAuth();
    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data]);

    const queryClient = useQueryClient();

    const params = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const projectId = params.projectId!;
    const taskId = queryParams.get("viewTask")!;

    const {mutate, isPending} = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({queryKey: ["task", taskId]});
        }
    });

    return (
        <div className="p-3 flex flex-wrap">
            <div className="flex justify-between items-center w-full">
                <p>
                    {note.content}
                </p>

                <div className="space-x-5">
                    <span className="font-bold text-xs">By: {note.createdBy.name}</span>

                    {canDelete && (
                        <>
                            {!isPending ?
                                <button
                                    className="text-white border-gray-50 border-2 hover:border-red-300 hover:bg-red-100 py-2 px-4 rounded font-bold"
                                    onClick={() => mutate({projectId, taskId, noteId: note._id})}
                                >🗑️
                                </button> :
                                <p className=" inline-block text-red-600 text-xs py-2 px-4 rounded font-bold ">Deleting...</p>
                            }
                        </>
                    )}
                </div>
            </div>
            <p className="text-gray-500 font-bold text-xs">{formatDate(note.createdAt)}</p>

        </div>
    );
};