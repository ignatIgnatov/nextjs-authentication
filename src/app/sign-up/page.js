'use client'

import CommonFormElement from "@/components/ui/common-input/form-element/page"
import { initialSignUpFormData, userRegistrationFormControls } from "../utils"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { registerUser } from "@/actions"
import { useRouter } from "next/navigation"



const SignUp = () => {

    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
    const router = useRouter();

    function handleSignUpBtnValid() {
        return Object.keys(signUpFormData).every(key => signUpFormData[key].trim() !== '');
    }

    async function handleSignUp() {
        const result = await registerUser(signUpFormData);
        console.log(result);
        if (result?.data) {
            router.push('/sign-in');
        }
    }

    return (
        <div>
            <h1>Registration</h1>
            <form action={handleSignUp}>
                {
                    userRegistrationFormControls.map((controlItem) => (
                        <div key={controlItem.name} className="flex flex-col gap-2">
                            <Label className="mt-3">{controlItem.label}</Label>
                            <CommonFormElement
                                currentItem={controlItem}
                                value={signUpFormData[controlItem.name]}
                                onChange={(event) => setSignUpFormData({
                                    ...signUpFormData,
                                    [event.target.name]: event.target.value
                                })}
                            />
                        </div>
                    ))}
                <Button disabled={!handleSignUpBtnValid()} className="disabled:opacity-65 mt-5" type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUp