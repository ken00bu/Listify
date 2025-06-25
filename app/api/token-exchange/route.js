import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Buffer } from "buffer";
import { SignJWT, jwtVerify } from 'jose'


export async function GET(request) {
    const CookieStore = await cookies();
    const {searchParams} = new URL(request.url);
    const CODE = searchParams.get('code');
    const STATE = searchParams.get('state');
    const CLIENT_SECRET = "d11bc1463be84f639088f4f91e8a0ef2";
    const CLIENT_ID = "a778f5b264b64f03824579b215ed237c";
    const REDIRECT_URL = "https://listify-eta.vercel.app/callback";
    const SERVERSTATE = CookieStore.get('state')?.value;



    const secretKey = process.env.SESSION_SECRET
    const encodedKey = new TextEncoder().encode(secretKey)
    
    const encrypt = (payload) => {
         return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
    }


    const BODY = new URLSearchParams({
        code: CODE,
        redirect_uri: REDIRECT_URL,
        grant_type: 'authorization_code'
    });

    console.log("KODE KAMU: ", CODE);
    console.log("STATE KAMU: ", STATE);
    console.log("STATE SERVER: ", SERVERSTATE);

    if (STATE !== SERVERSTATE){

        if (SERVERSTATE === undefined){
            console.log("state lu null");
            return NextResponse.json({msg: "State tidak ditemukan"}, {status: 200});
        } else {
            console.log(`state lu tidak sesuai, state lu: ${STATE}, state server: ${SERVERSTATE}`);
            console.log("state lu salah");
            return NextResponse.json({msg: "State tidak sesuai"}, {status: 401});
        }
        
    } else {
        CookieStore.delete('state')
        console.log("state lu bener, lanjut ke token exchange");
        try {
            const Data = await fetch(`https://accounts.spotify.com/api/token`, {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
            },
            body: BODY.toString()
            })

            if (!Data.ok){
                return NextResponse.json({msg: `Gagal Mengambil Data ${Data}`}, {status: 401})
            }
            
            console.log("BERHASIL MENDAPATKAN DATA TOKEN");
            const ResponseObject = await Data.json();

            CookieStore.set({
                name: 'access_token',
                value: ResponseObject.access_token,
                httpOnly: false,
                path: '/',
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60, // 1 hour
            })
            CookieStore.set({
                name: 'refresh_token',
                value: ResponseObject.refresh_token,
                httpOnly: false,
                path: '/',
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 30, // 30 days
            })


            Date.prototype.addHours = function(h) {
                this.setTime(this.getTime() + (h*60*60*1000));
                return this;
            }

            CookieStore.set({
                name: 'token_expired_date',
                value: new Date().addHours(1),
                httpOnly: false,
                path: '/',
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 30, // 30 days
            })

            const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            const user_token = ResponseObject.access_token
            const user_refresh = ResponseObject.refresh_token
            const session = await encrypt({ user_token })

            CookieStore.set({
                name: `session`,
                value: session,
                httpOnly: true,
                secure: true,
                expires: expiresAt,
                sameSite: 'lax',
                path: '/',
            })
            
            return NextResponse.json(ResponseObject, {status: 200});

        } catch (error) {
            console.log(error)
        }
    }
    

}