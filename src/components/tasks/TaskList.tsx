import { Task, TaskStatus } from "@/types/index.ts";
import TaskCard from "@/components/tasks/TaskCard.tsx";
import DropTask from "./DropTask";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "@/api/TaskApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

type TaskListProps = {
  tasks: Task[];
  canEdit: boolean;
};

const statusStyles: { [key: string]: string } = {
  pending: "border-t-slate-500",
  onHold: "border-t-red-500",
  inProgress: "border-t-blue-500",
  underReview: "border-t-amber-500",
  completed: "border-t-emerald-500",
};

export default function TaskList({ tasks, canEdit }: TaskListProps) {
  const params = useParams();
  const projectId = params.projectId!;
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Definimos un array con todos los estados posibles de una tarea
  // 'as const' hace que TypeScript trate esto como valores literales inmutables
  // esto ayuda con el tipado y previene modificaciones accidentales
  const allStatuses = [
    "pending",
    "onHold",
    "inProgress",
    "underReview",
    "completed",
  ] as const;

  // Creamos un objeto inicial donde cada estado tiene un array vacío
  // Este será nuestro punto de partida para agrupar las tareas
  const initialGrouped = allStatuses.reduce((acc, status) => {
    // Para cada estado, creamos una propiedad en el acumulador
    // con un array vacío como valor inicial
    acc[status] = [];
    return acc;
  }, {} as Record<Task["status"], Task[]>);
  // El tipo Record<Task['status'], Task[]> indica que:
  // - Las keys son los posibles valores de Task['status']
  // - Los valores son arrays de Task

  // Agrupamos las tareas por su estado, manteniendo la estructura inicial
  const groupedTasks = tasks.reduce(
    (accumulator, task) => ({
      // Mantenemos todas las propiedades existentes del acumulador
      ...accumulator,
      // Para el estado de la tarea actual:
      // - Tomamos el array existente de ese estado [...accumulator[task.status]]
      // - Añadimos la tarea actual al final [task]
      [task.status]: [...accumulator[task.status], task],
    }),
    initialGrouped
  );

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragEnd = (e: DragEndEvent) => {
    const { over, active } = e;

    if (over && over.id) {
        const taskId = active.id.toString();
        const status = over.id as TaskStatus;
        mutate({projectId, taskId, status});

        // Actualización Optimista =======================================
        queryClient.setQueryData(['project', projectId], (prevData) => {
            const updatedTasks = prevData.tasks.map((task: Task) => {
                // Actualizamos el estado de la tarea actual
                if(task._id === taskId) {
                    return {
                        ...task,
                        status
                    }
                } return task;
            })

            return {
                ...prevData,
                tasks: updatedTasks
            }
        })
    }
  };

  return (
    <>
      <h2 className="text-5xl font-black my-10">Tasks</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          {allStatuses.map((status) => (
            <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
              <h3
                className={`capitalize text-xl border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]}`}
              >
                {status.replace(/([A-Z])/g, " $1").trim()}
              </h3>

              <DropTask status={status} />

              <ul className="mt-5 space-y-5">
                {groupedTasks[status].length === 0 ? (
                  <li className="text-gray-600 text-center pt-3">
                    There are no Task's
                  </li>
                ) : (
                  groupedTasks[status].map((task) => (
                    <TaskCard key={task._id} task={task} canEdit={canEdit} />
                  ))
                )}
              </ul>
            </div>
          ))}
        </DndContext>
      </div>
    </>
  );
}
