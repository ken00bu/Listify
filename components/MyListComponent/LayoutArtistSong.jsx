const LayoutArtistSong = ({ dataTracks, dataArtist, dataRange, Today }) => {

    if ( dataTracks && dataArtist ) {
        console.log(JSON.stringify(dataTracks))
    }

    const DisplayData = ( Option ) => {

        if ( dataTracks === null && dataArtist === null ) return
        console.log(`DATA TRACKS: ${dataTracks} DATA ARTIST ${dataArtist}`)
        let currentData = null
        if ( Option === "Artist" ) { currentData = dataArtist }
        if ( Option === "Track" ) { currentData = dataTracks }

       
        return currentData.map((value, index) => {
            let head = null
            let cap = null

            if ( Option === "Track" ) { 
                head = value.name
                cap = value.artists[0].name
            }

            if ( Option === "Artist" ) {
                head = value.name
                cap = value.genres?.[0] || "Unknown"
            }
            

            return (
                
                <div id="container-buat-teks-lagu-dan-artist" className="text-[0.75rem]" key={index}>
                    <h1 className="truncate">{head}</h1>
                    <h1 className="opacity-60 font-normal truncate">{cap}</h1>
                </div>
            )
        })

    }

    return (
        <div id="Layout Right" className=" flex flex-col justify-between h-full w-full">
                    <div className="w-full ">
                        <h1 className="font-extrabold text-[2.7rem] leading-[3rem] mt-7">My Top List, <br></br> { !dataRange ? "RangeNull" : (dataRange.value === "Last 4 Weeks" ? "Last 4 Week" : dataRange.value) }</h1>
                    </div>
                    <div className="flex flex-col gap-9">
                        <div className="w-full flex justify-between gap-3" >
                            <div className="w-1/2">
                                <div className="font-extrabold text-xl mb-4">Song</div>
                                <div className="flex flex-col gap-[0.8px] ">
                                    {DisplayData("Track")}
                                </div>    
                            </div>
                            <div className="w-1/2">
                                <div className="font-extrabold text-xl mb-4">Artist</div>
                                <div className="flex flex-col gap-[0.8px] mr-14">
                                    {DisplayData("Artist")}
                                </div>
                            </div>
                        </div>
                        <div className="text-[0.75rem] flex justify-between">
                            <div className="text-[#666666] flex gap-1 items-center"><div className="w-[7px] h-[7px] bg-[#1E6A18]"></div>made with Listify</div>
                            <div>{Today}</div>
                        </div>
                    </div>
                </div>
    )
}

export default LayoutArtistSong;