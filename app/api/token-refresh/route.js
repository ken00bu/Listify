import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request) {
    const CookieStore = await cookies()
    const { searchParams } = new URL(request.url);
    const refresh = searchParams.get('refresh');
    const CLIENT_SECRET = "d11bc1463be84f639088f4f91e8a0ef2";
    const CLIENT_ID = "a778f5b264b64f03824579b215ed237c";
    console.log("REFRESH TOKEN KAMU: ", refresh);

    if (!refresh || refresh === undefined || refresh === null ) {
        return NextResponse.json({
            error: "Missing code or refresh token"
        }, { status: 400 });
    }else{
        try {
            const Data = await fetch("https://accounts.spotify.com/api/token", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
                },
                body: new URLSearchParams({
                    'grant_type': 'refresh_token',
                    'refresh_token': refresh
                }).toString(),
                json: true
                
            });
            if (!Data.ok) {
                return NextResponse.json({
                    error: "Failed to fetch data"
                }, { status: 401 });
            }

            console.log("BERHASIL MENDAPATKAN DATA REFRESH TOKEN");
            const NewToken = await Data.json();
            console.log(`Objek Refresh Token: ${JSON.stringify(NewToken)}`)

            CookieStore.set({
                name: 'access_token',
                value: NewToken.access_token,
                httpOnly: false,
                path: '/',
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60, // 1 hour
            })

            return NextResponse.json(  NewToken, { status: 200 });
            
        } catch (error) {
            console.error("Error during token refresh:", error);
            return NextResponse.json({
                error: `Error During Refresh ini adalah Catch Block ${error}`
            }, { status: 500 });
        }
    }

}
