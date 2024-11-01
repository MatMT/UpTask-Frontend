import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import ProjectForm from "@/components/projects/ProjectForm";
import {ProjectFormData} from "@/types/index";
import {createProject} from "@/api/ProjectAPI";

export default function CreateProjectView() {
    const initialValues : ProjectFormData = {
        projectName: "",
        clientName: "",
        description: ""
    }

    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues});

    const handleForm = (data: ProjectFormData) => {
        createProject(data);
    }

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Create Project</h1>
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

                    <input type="submit" value="Create Project" className="bg-fuchsia-600 w-full p-3 text-white uppercase
                font-bold hover:bg-fuchsia-700 transition-colors"/>
                </form>
            </div>
        </>
    );
};
