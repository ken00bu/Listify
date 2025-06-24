const LayoutRight = ({ dataTracks, dataArtist, isArtist, dataRange, Today }) => {

    const RenderArtist = ( Option ) => {

        if ( dataTracks === null && dataArtist === null ) return
        console.log(`DATA TRACKS: ${dataTracks} DATA ARTIST ${dataArtist}`)
        let currentData = null
        if ( Option === "Artist" ) { currentData = dataArtist }
        if ( Option === "Track" ) { currentData = dataTracks }

        console.log( `INI ADALAH CURRENTDATA NOW: ${JSON.stringify(currentData)}` )
        return currentData.map(( value, index ) => {

            let SRC = null
            let HEAD = null
            let CAPTION = null


            if ( Option === "Track" ) { 
                SRC = value.album.images[1].url
                HEAD = value.name
                CAPTION = value.artists[0].name
            }

            if ( Option === "Artist" ) {
                SRC = value.images[1].url
                HEAD = value.name
                CAPTION = value.genres?.[0] || "Unknown"
            }

            return (
                <div id="INI-CONTAINER-ITEM" className="flex items-center gap-3" key={index}>
                    <div> 
                        <img src={SRC} alt="" className="w-[3.3rem] rounded-full" /> 
                    </div>
                    <div>
                        <h1 className="font-semibold text-[0.8rem] tracking-wide"> { HEAD } </h1>
                        <h5 className="text-[0.8rem] opacity-60 font-normal tracking-normal"> { CAPTION } </h5>
                    </div>
                </div>
            )
        })
        
    }

    console.log(`INI ISI DATARANGE: ${JSON.stringify(dataRange)}`)

    return (
        <div id="Layout Left" className=" flex flex-col justify-between h-full w-full">
            <div className="w-full flex flex-col gap-4">
                <h1 className="font-extrabold text-[2.6rem] leading-[3rem] mt-7"> { !dataRange ? "RangeNull" : (dataRange.value) }, <br></br> Top {isArtist ? "Artist" : "Song"} </h1>
                <div className="w-full flex flex-col gap-3" >
                    { RenderArtist( isArtist ? "Artist" : "Track" ) }
                </div>
            </div>
            <div className="flex flex-col gap-9">
                <div className="text-[0.75rem] flex justify-between">
                    <div className="text-[#666666] flex gap-1 items-center"><div className="w-[7px] h-[7px] bg-[#1E6A18]"></div>made with Listify</div>
                    <div>{Today}</div>
                </div>
            </div>
        </div>
    )
}

export default LayoutRight;