import {BrowserRouter, Routes, Route} from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashBoardView from "./views/DashBoardView";
import CreateProjectView from "./views/projects/CreateProjectView";
import EditProjectView from "@/views/projects/EditProjectView";
import ProjectDetailsView from "@/components/projects/ProjectDetailsView.tsx";
import AuthLayout from "@/layouts/AuthLayout.tsx";
import LoginView from "@/views/auth/LoginView.tsx";
import RegisterView from "@/views/auth/RegisterView.tsx";
import ConfirmAccountView from "@/views/auth/ConfirmAccountView.tsx";
import RequestConfirmTokenView from "@/views/auth/RequestConfirmTokenView.tsx";
import ForgotPasswordView from "@/views/auth/ForgotPasswordView.tsx";
import NewPasswordView from "@/views/auth/NewPasswordView.tsx";
import ProjectTeamView from "@/views/projects/ProjectTeamView.tsx";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path="/" element={<DashBoardView/>} index/>
                    <Route path="/projects/create" element={<CreateProjectView/>}/>
                    <Route path="/projects/:projectId" element={<ProjectDetailsView/>}/>
                    <Route path="/projects/:projectId/edit" element={<EditProjectView/>}/>
                    <Route path="/projects/:projectId/team" element={<ProjectTeamView/>}/>
                </Route>

                <Route element={<AuthLayout/>}>
                    <Route path="/auth/login" element={<LoginView/>}/>
                    <Route path="/auth/register" element={<RegisterView/>}/>
                    <Route path="/auth/confirm-account" element={<ConfirmAccountView/>}/>
                    <Route path="/auth/request-confirm-token" element={<RequestConfirmTokenView />}/>
                    <Route path="/auth/forgot-password" element={<ForgotPasswordView />}/>
                    <Route path="/auth/reset-password" element={<NewPasswordView />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
