import {useMutation} from "@tanstack/react-query";
import {createNote} from "@/api/NoteAPI";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {NoteFormData} from "@/types/index.ts";
import ErrorMessage from "@/components/ErrorMessage.tsx";
import {useParams, useLocation} from "react-router-dom";

// type NoteFormProps = {
//     data: NoteFormData;
// }

export default function AddNoteForm() {// export default function AddNoteForm({data}: NoteFormProps) {
    const initialValues: NoteFormData = {
        // content: data.content ?? '',
        content: '',
    }

    /** Get Params Values */
    const params = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const projectId = params.projectId!;
    const taskId = queryParams.get("viewTask")!;

    const {mutate} = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
        }
    });

    const {register, handleSubmit, reset, formState: {errors}} = useForm({defaultValues: initialValues});

    const handleAddNote = (formData: NoteFormData) => {
        mutate({formData, projectId, taskId});
        reset()
    }

    return (
        <form
            onSubmit={handleSubmit(handleAddNote)}
            noValidate={true}
            className="space-y-6"
        >
            <div>
                <label>Create Note</label>
                <input
                    type="text"
                    id="content"
                    placeholder="Enter new note"
                    className="w-full mt-3 p-3 border border-gray-300 rounded-lg"
                    {...register("content", {
                        required: "Content is required",
                    })}
                />
                {errors.content && (
                    <ErrorMessage>{errors.content?.message}</ErrorMessage>
                )}
            </div>

            <input type="submit" value="Add Note"
                   className="w-full py-3 hover:bg-fuchsia-700 cursor-pointer bg-fuchsia-600 font-bold text-white"/>

        </form>
    );
};