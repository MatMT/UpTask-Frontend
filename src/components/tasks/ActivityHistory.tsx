import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {Task} from "@/types/index.ts";

interface ActivityHistoryProps {
    data: Pick<Task, 'completedBy'>;
}

const ActivityHistory = ({ data }: ActivityHistoryProps): JSX.Element => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const getStatusColor = (status: Task['status']): string => {
        const colors: Record<Task['status'], string> = {
            pending: 'bg-yellow-100 text-yellow-800',
            onHold: 'bg-orange-100 text-orange-800',
            inProgress: 'bg-blue-100 text-blue-800',
            underReview: 'bg-purple-100 text-purple-800',
            completed: 'bg-green-100 text-green-800'
        };
        return colors[status];
    };

    // const formatDate = (date: string): string => {
    //     return new Date(date).toLocaleDateString('es-ES', {
    //         year: 'numeric',
    //         month: 'short',
    //         day: 'numeric',
    //         hour: '2-digit',
    //         minute: '2-digit'
    //     });
    // };

    return (
        <div className="mt-4 space-y-2">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full p-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                type="button"
            >
                <span className="font-medium">
                    Historial de Cambios ({data.completedBy.length})
                </span>
                {isExpanded ?
                    <ChevronUp className="w-4 h-4" /> :
                    <ChevronDown className="w-4 h-4" />
                }
            </button>

            {isExpanded && (
                <div className="pl-2 space-y-3 max-h-[11rem] overflow-y-auto">
                    {data.completedBy.map((log) => (
                        <div
                            key={log.status + Math.random()} // Consider adding an _id to your completedBy items
                            className="flex items-start space-x-3 text-sm border-l-2 border-slate-200 pl-3 py-1"
                        >
                            <div className="flex-1">
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                                    {log.status}
                                </span>
                                {log.user && (
                                    <span className="ml-2 text-slate-600">
                                        {log.user.name}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ActivityHistory;