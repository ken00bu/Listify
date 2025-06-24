import { NextResponse } from "next/server"
import { buffer } from "stream/consumers";
import { randomFillSync } from "crypto";
import { cookies } from "next/headers";


export async function GET(request) {
    const CookieStore = await cookies();
    const Data = new Uint32Array(4);
    randomFillSync(Data);
    const rawData = Buffer.from(new Uint8Array(Data.buffer)).toString('base64url');
    const state = rawData

    console.log("STATE KAMU DARI SERVER: ", state);
    const response = NextResponse.json({ state }, { status: 200 });
    CookieStore.set({
        name: 'state',
        value: state,
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60,
        credentials: 'include',
    })

    return response;
}