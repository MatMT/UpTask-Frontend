import {useMutation} from "@tanstack/react-query";
import {TeamMember} from "@/types/index.ts";
import {toast} from "react-toastify";
import {addUserToProject} from "@/api/TeamApi.ts";
import {useParams} from "react-router-dom";

type SearchResultProps = {
    user: TeamMember
}

export default function SearchResult({user}: SearchResultProps) {
    const params = useParams();
    const projectId = params.projectId as string;

    const {mutate} = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
        }
    });

    const handleAddUserToProject = async () => {
        const data = {projectId, userId: user._id};
        mutate(data);
    }

    return (
        <>
            <div className="mt-10 text-center font-bold">
                <div className="flex justify-between items-center">
                    <p>{user.name}</p>
                    <button
                        className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
                        onClick={handleAddUserToProject}
                    >
                        Add to the Project
                    </button>
                </div>
            </div>
        </>
    );
};