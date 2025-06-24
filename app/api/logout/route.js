import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(){
    const Cookiestore = await cookies()
    Cookiestore.delete('session')

    return NextResponse.json({ message: 'Logged out' }, { status: 200 });
}