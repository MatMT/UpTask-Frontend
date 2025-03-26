import AddNoteForm from "@/components/notes/AddNoteForm.tsx";
import {Task} from "@/types/index.ts";
import NoteDetail from "@/components/notes/NoteDetail.tsx";

type NotePanelProps = {
    notes: Task['notes'];
}

export default function NotesPanel({notes} : NotePanelProps) {
    return (
        <>
            <AddNoteForm />

            <div className="divide-y divide-gray-100 mt-10 max-h-52 overflow-y-auto">
                {notes.length ? (
                    <>
                        <p className="text-gray-500 font-bold text-center my-5">Notes:</p>
                        {notes.map((note, index) => (
                            <NoteDetail note={note} key={index} />
                        ))}
                    </>
                ) : <p className="text-gray-500 text-center pt-3">There is no notes</p>
                }
            </div>
        </>
    );
};