'use client'


import React, { useState } from 'react'
import { userLoginFormControlls } from '../utils'
import { Label } from '@/components/ui/label'
import CommonFormElement from '@/components/ui/common-input/form-element/page'
import { initialLoginFormData } from '../utils'
import { Button } from '@/components/ui/button'
import { loginUserAction } from '@/actions'
import { useRouter } from 'next/navigation'

const SignIn = () => {

    const [signInFormData, setSignInFormData] = useState(initialLoginFormData);
    const router = useRouter();

    async function handleSignIn() {
        const result = await loginUserAction(signInFormData);
        console.log(result);
        if (result.success) {
            router.push('/')
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form action={handleSignIn}>
                {
                    userLoginFormControlls.map(controlItem =>
                        <div key={controlItem.name} className="flex flex-col gap-2">
                            <Label className="mt-3">{controlItem.label}</Label>
                            <CommonFormElement
                                currentItem={controlItem}
                                value={setSignInFormData[controlItem.name]}
                                onChange={(event) =>
                                    setSignInFormData({
                                        ...signInFormData,
                                        [event.target.name]: event.target.value
                                    })
                                }
                            />
                        </div>
                    )
                }
                <Button type="submit" className="mt-5">Sign In</Button>
            </form>
        </div>
    )
}

export default SignIn