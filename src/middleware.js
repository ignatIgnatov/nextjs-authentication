import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export function middleware(request) {
    const path = request.nextUrl.pathName;
    const checkPublickPath = path === '/sign-in' || '/sign-up';
    const getCookies = cookies();
    const token = getCookies.get('token')?.value || '';

    if (checkPublickPath && token !== '') {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if (!checkPublickPath && token === '') {
        return NextResponse.redirect(new URL('sign-in', request.nextUrl))
    }
}


export const config = {
    matcher: ['/sign-in', '/sign-up']
}