import {Navigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getProjectById} from "@/api/ProjectAPI";
import EditProjectForm from "@/components/projects/EditProjectForm";

export default function EditProjectView() {
    const params = useParams();
    const projectId = params.projectId as string;

    const {data, isLoading, isError} = useQuery({
        queryKey: ["editProject", projectId],
        queryFn: () => getProjectById(projectId),
        retry: false,
    })

    if(isLoading)
        return "Loading...";

    if(isError)
        return <Navigate to="/404" />

    if(data) return <EditProjectForm data={data} projectId={projectId} />;

    return (
        <>
            <h1>EditProjectView component</h1>
        </>
    );
};
