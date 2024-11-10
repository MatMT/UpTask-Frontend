import {Link, useNavigate} from "react-router-dom";
import ProjectForm from "@/components/projects/ProjectForm";
import {Project, ProjectFormData} from "@/types/index";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateProject} from "@/api/ProjectAPI";
import {toast} from "react-toastify";

type EditProjectFormProps = {
    data: ProjectFormData;
    projectId: Project["_id"];
}

export default function EditProjectForm({data, projectId}: EditProjectFormProps) {
    const navigate = useNavigate();
    const initialValues: ProjectFormData = {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description
    }

    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['projects']})
            queryClient.invalidateQueries({queryKey: ['editProject', projectId]})

            toast.success(data)
            navigate("/");
        }
    })

    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues});

    const handleForm = (formData: ProjectFormData) => {
        const data = {
            formData,
            projectId
        }
        mutate(data);
    };

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Edit Project</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Complete the fields to create a project</p>

                <nav className="my-5">
                    <Link to='/' className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl
                font-bold cursor-pointer transition-colors
            ">Back to Projects</Link>
                </nav>

                <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >

                    <ProjectForm
                        register={register}
                        errors={errors}
                    />

                    <input type="submit" value="Save Changes" className="bg-fuchsia-600 w-full p-3 text-white uppercase
                font-bold hover:bg-fuchsia-700 transition-colors"/>
                </form>
            </div>
        </>
    );
};
