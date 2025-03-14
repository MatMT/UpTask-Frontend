import {Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import TaskForm from "@/components/tasks/TaskForm.tsx";
import {TaskFormData} from "@/types/index.ts";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createTask} from "@/api/TaskApi.ts";
import {toast} from "react-toastify";

export default function AddTaskModal() {
    const navigate = useNavigate();

    /** If modal exist */
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const modalTask = queryParams.get('newTask');
    const show = modalTask ? true : false;

    /** Get ProjectId */
    const params = useParams();
    const projectId = params.projectId!;

    const initialValues: TaskFormData = {
        name: '',
        description: ''
    }

    const {register, handleSubmit, reset, formState: {errors}} = useForm({defaultValues: initialValues});

    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: createTask,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["project", projectId]});
            reset();
            toast.success(data);
            navigate(location.pathname, {replace: true});
        }
    })

    const handleCreateTask = (formData: TaskFormData) => {
        const data = {
            formData,
            projectId
        }

        mutate(data);
    }

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => {
                    navigate(location.pathname, {replace: true});
                }}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        New Task
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Fill out the form and create {''}
                                        <span className="text-fuchsia-600">a task</span>
                                    </p>

                                    <form onSubmit={handleSubmit(handleCreateTask)} className="mt-10 space-y-3"
                                          noValidate={true}>

                                        <TaskForm errors={errors} register={register}/>

                                        <input type="submit" value="Save Task" className="bg-fuchsia-600 w-full p-3 text-white uppercase
                font-bold hover:bg-fuchsia-700 transition-colors"/>
                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}