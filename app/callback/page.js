'use client'
import { useEffect } from "react";

const Callback = () => {
    useEffect(() => {
        const fetchData = async () => {
                try {
                    const { searchParams } = new URL(window.location.href);
                    const code = searchParams.get('code');
                    const state = searchParams.get('state');

                    if (code && state) {
                        console.log("SENDING REQUEST TO EXCHANGE TOKEN");
                        const send = await fetch(`api/token-exchange?code=${code}&state=${state}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            credentials: 'include',
                        });

                        if (!send.ok) {
                            console.error("Failed to exchange token:", send.statusText);
                            return;
                        } else{
                            const data = await send.json();
                            console.log("Token exchange data:", data);

                            window.location.href = '/mylist';
                        }

                    }

                    } catch (error) {
                        console.error("Error during callback:", error);
                        console.log("KODE KAMU ERROR😂");
                    }
        }

        fetchData();
    }, [])

    console.log("kontoll");

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <h1 className="font-inter font-bold text-4xl motion-preset-oscillate ">BENTAR YAH😂😂😂</h1>
        </div>
    )
}

export default Callback;