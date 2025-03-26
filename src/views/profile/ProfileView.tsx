import {useAuth} from "@/hooks/useAuth.ts";
import ProfileForm from "@/components/profile/ProfileForm.tsx";

export default function ProfileView() {
    const {data, isLoading} = useAuth();
    if (isLoading) return "Loading...";
    if (data) return <ProfileForm data={data}/>
};