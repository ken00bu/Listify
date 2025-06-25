'use client'
const Login = () => {
    const CLIENT_ID = 'a778f5b264b64f03824579b215ed237c';
    const REDIRECT_URL = 'http://127.0.0.1:3000/callback';
    const SCOPE = 'user-top-read user-read-recently-played user-read-playback-position';
    async function HandleLogin() {

        try {
            const response = await fetch('/api/state-gen');
            if (!response.ok) {
                console.log("Gagal mendapatkan state");
                return;
            }

            
            const res = await response.json();
            const STATE = res.state;
            console.log(STATE);

            window.location.href = `https://accounts.spotify.com/authorize?` + new URLSearchParams({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: SCOPE,
            redirect_uri: REDIRECT_URL,
            state: STATE}).toString()

            return (`kontol`)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-screen h-screen font-inter pr-2 pl-2">
            <div className="flex flex-col items-center justify-between h-full">
                <div className="mt-36 motion-preset-focus motion-duration-1000 mb-4">
                    <h1 className="font-bold text-3xl md:text-6xl md:w-[800px] text-center">Get Your Spotify Top List for Free with Listfy</h1>
                </div>
                <div className="mb-10 md:mb-28 flex flex-col items-center gap-4">
                    <button onClick={HandleLogin} className="bg-[#36A42E] text-center p-4 text-white font-bold rounded-xl border-2 border-[#3E7F39] flex items-center flex gap-2 pt-4 pb-4 pl-16 pr-16 hover:bg-[#2f8e28] duration-300">
                        <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png" alt="Spotify Logo" width={24} height={24} />
                        Login Dengan Spotify
                    </button>
                    <h2 className="text-[#999999] cursor-pointer hover:opacity-75 tracking-[-0.413px] font-medium">Read <span className="text-[#FF6D6D]">Privacy Policy</span></h2>
                </div>
            </div>
        </div>
    )
}

export default Login;