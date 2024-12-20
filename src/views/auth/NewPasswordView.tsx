import {useState} from "react";
import NewPasswordToken from "@/components/auth/NewPasswordToken.tsx";
import NewPasswordForm from "@/components/auth/NewPasswordForm.tsx";
import {ConfirmToken} from "@/types/index.ts";

export default function NewPasswordView() {
    const [token, setToken] = useState<ConfirmToken["token"]>('');
    const [isValidToken, setIsValidToken] = useState(false);

    return (
        <>
            <h1 className="text-5xl font-black text-white">Recovery Password</h1>
            <p className="text-2xl font-light text-white mt-5">
                Enter the code received {''}
                <span className=" text-fuchsia-500 font-bold"> by email</span>
            </p>

            {!isValidToken ?
                <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken}/> :
                <NewPasswordForm token={token}/>}
        </>
    );
};
