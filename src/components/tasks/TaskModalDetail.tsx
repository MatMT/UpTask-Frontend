import {Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getTaskById, updateStatus} from "@/api/TaskApi.ts";
import {toast} from "react-toastify";
import {formatDate} from "@/utils/utils.ts";
import {TaskStatus} from "@/types/index.ts";
import ActivityHistory from "@/components/tasks/ActivityHistory.tsx";
import NotesPanel from "@/components/notes/NotesPanel.tsx";

const allStatuses = [
    'pending',
    'onHold',
    'inProgress',
    'underReview',
    'completed'
] as const;

export default function TaskModalDetails() {
    const params = useParams();
    const projectId = params.projectId!;

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get("viewTask")!;

    const show = taskId ? true : false;

    const {data, isError, error} = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        enabled: !!taskId,
        retry: false,
    });

    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: updateStatus,
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({queryKey: ['project', projectId]});
            queryClient.invalidateQueries({queryKey: ['task', taskId]});
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as TaskStatus;
        const data = {projectId, taskId, status};
        mutate(data);
    }

    if (isError) {
        toast.error(error.message, {toastId: 'error'});
        // return <Navigate to={`/projects/${projectId}`}/>; // redirigir de forma programada
    }

    if (data) return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={
                    () => navigate(location.pathname, {replace: true})
                }>

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


                                    <p className='text-sm text-slate-500'>Created at: {formatDate(data.createdAt)} </p>
                                    <p className='text-sm text-slate-500'>Updated at:
                                        : {formatDate(data.updatedAt)} </p>

                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 mt-5"
                                    >
                                        {data.name}
                                    </Dialog.Title>

                                    <p className='text-lg text-slate-500 mb-2'>Description: {data.description}</p>

                                    {data.completedBy.length > 0 && <ActivityHistory data={data} />}

                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Status:
                                        </label>

                                        <select className="p-3 border border-gray-200 w-full bg-white capitalize"
                                                defaultValue={data.status}
                                                onChange={handleChange}
                                        >

                                            {Object.entries(allStatuses).map(([key, value]) => (
                                                <option key={key}
                                                        value={value}> {value.replace(/([A-Z])/g, ' $1').trim()}</option>
                                            ))}

                                        </select>
                                    </div>

                                    <NotesPanel notes={data.notes} />

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}