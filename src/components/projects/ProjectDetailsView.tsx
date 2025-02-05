import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getProjectById} from "@/api/ProjectAPI.ts";
import AddTaskModal from "@/components/tasks/AddTaskModal.tsx";
import TaskList from "@/components/tasks/TaskList.tsx";
import EditTaskData from "@/components/tasks/EditTaskData.tsx";
import TaskModalDetails from "@/components/tasks/TaskModalDetail.tsx";
import {useAuth} from "@/hooks/useAuth.ts";
import {isManager} from "@/utils/policies.ts";
import {useMemo} from "react";

export default function ProjectDetailsView() {
    const {data: user, isLoading: authLoading} = useAuth();
    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId as string;

    const {data, isLoading, isError} = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => getProjectById(projectId),
        retry: false,
    })

    const canEdit = useMemo(() => data?.manager === user?._id, [data, user]);

    if (isLoading && authLoading)
        return "Loading...";

    if (isError)
        return <Navigate to="/404"/>


    if (data && user) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

            {isManager(data.manager, user._id) && (
                <nav className="my-5 flex gap-3">
                    <button
                        type="button"
                        className="bg-purple-400 hover:bg-purple-500 py-3 px-10 text-white text-xl font-bold cursor-pointer transition-colors "
                        onClick={() => navigate('?newTask=true')}
                    >
                        Add Task
                    </button>

                    <Link to={'team'}
                          className="bg-fuchsia-600 hover:bg-fuchsia-700 py-3 px-10 text-white text-xl font-bold cursor-pointer transition-colors ">
                        Team
                    </Link>
                </nav>
            )}

            <TaskList
                tasks={data.tasks}
                canEdit={canEdit}
            />

            <AddTaskModal/>
            <EditTaskData/>
            <TaskModalDetails/>
        </>
    )
};
