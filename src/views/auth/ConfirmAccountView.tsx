import {Link} from "react-router-dom";
import {PinInput, PinInputField} from "@chakra-ui/pin-input";
import {useState} from "react";
import {ConfirmToken} from "@/types/index.ts";
import {useMutation} from "@tanstack/react-query";
import {confirmAccount} from "@/api/AuthAPI.ts";
import {toast} from "react-toastify";

export default function ConfirmAccountView() {
    const [token, setToken] = useState<ConfirmToken['token']>('');

    const {mutate} = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data)
        }
    })

    const handleCange = (token: ConfirmToken['token']) => {
        setToken(token);
    }
    const handleComplete = (token: ConfirmToken['token']) => mutate({token});

    return (
        <>
            <h1 className="text-4xl font-black text-center text-white">Confirm your Account</h1>
            <p className="text-2xl font-light text-center  text-white mt-5">
                Enter the code you received {''}
                <span className=" text-fuchsia-500 font-bold"> by email</span>
            </p>
            <form
                className="space-y-8 rounded-lg  p-10 bg-white mt-10"
            >
                <label
                    className="font-normal text-2xl text-center block"
                >Código de 6 dígitos</label>

                <div className="flex justify-center gap-5">
                    <PinInput value={token} onChange={handleCange} onComplete={handleComplete}>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placehoder-white"/>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placehoder-white"/>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placehoder-white"/>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placehoder-white"/>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placehoder-white"/>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placehoder-white"/>
                    </PinInput>
                </div>
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/request-confirm-token'
                    className="text-center text-gray-300 font-normal"
                >
                    Request a new code
                </Link>
            </nav>

        </>
    )
}