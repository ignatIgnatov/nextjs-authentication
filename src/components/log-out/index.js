'use client'

import React from 'react'
import { Button } from '../ui/button'
import { logoutAction } from '@/actions'

const Logout = () => {

    async function handleLoglout() {
        await logoutAction();
    }

    return (
        <Button onClick={handleLoglout}>Logout</Button>
    )
}

export default Logout