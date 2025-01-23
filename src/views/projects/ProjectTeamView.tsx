import {Link, useNavigate, useParams} from "react-router-dom";
import AddMemberModal from "@/components/team/AddMemberModal.tsx";

export default function ProjectTeamView() {
    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId as string;

    return (
        <>
            <h1 className="text-5xl font-black">Manage Team</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Manage the team members for this project</p>

            <nav className="my-5 flex gap-3">
                <button
                    type="button"
                    className="bg-purple-400 hover:bg-purple-500 py-3 px-10 text-white text-xl font-bold cursor-pointer transition-colors "
                    onClick={() => navigate('?addMember=true')}
                >
                    Add Member
                </button>

                <Link to={`/projects/${projectId}`}
                      className="bg-fuchsia-600 hover:bg-fuchsia-700 py-3 px-10 text-white text-xl font-bold cursor-pointer transition-colors ">
                    Back
                </Link>
            </nav>

            <AddMemberModal />
        </>
    );
};
