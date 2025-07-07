import { useEffect, useMemo, useState } from "react"

const LayoutMany = ({ DATA, isArtist, dataRange, totalOutput, Today, tema, displayText }) => {
    
    const [ dataArtist, setArtist ] = useState()
    const [ dataTracks, setTracks ] = useState() 
    const [ currentData, setCurrentData ] = useState()
    const [ dataKanan, setDataKanan ] = useState()
    const [ dataKiri, setDataKiri ] = useState()

    //INI BUAT ISI DATA AWAL
    useEffect(()=>{
        console.log(`KANA DATANYA GAK ADA: ${DATA}`)
        if ( !DATA ) return
        console.log("KANA DATANYA UDAH ADA")
        setArtist( DATA.topArtists )
        setTracks( DATA.topTracks )
        setCurrentData( isArtist ? dataArtist : dataTracks )

    },[DATA, isArtist, dataArtist, dataTracks])


    //DATA HASIL FILTER
    useEffect(()=>{
        console.log(`KANA CURRENT DATANYA GAK ADA: ${currentData}`)
        if ( !currentData ) return
        console.log(`KANA CURRENT DATANYA UDAH ADA: ${DATA}`)
        
        const Offset = Math.ceil(totalOutput / 2)
        console.log(`KANA INI offset: ${Offset}`) 
        setDataKiri( currentData.slice( 0, Offset) )
        setDataKanan( currentData.slice( Offset, totalOutput ) )
        console.log(`KANA PANJANG DATA KANAN: ${dataKanan?.length}`)
        

        console.log("KANA INI BELUM DI BLOK DATA SUDAH DIUBAH")
    }, [currentData, totalOutput])

    //FUNGSI UNTUK RENDER ITEM
    const RenderMyItem = ( DataItem, Pilih ) => {
        console.log("KANA INI BELUM DI BLOK 1")
       
        if ( !DataItem ) return
        console.log("KANA INI BELUM DI BLOK 3")
        return DataItem.map((value, index)=>{
                console.log(`KANA INI BELUM DI BLOK ${index}`)
                let HEAD = undefined
                let CAPTION = undefined
                const Offset = Math.ceil(totalOutput / 2)
                const LeftIndex = index + 1
                const RightIndex = Offset + 1 + index
                let INDEX = Pilih === "Kanan" ? RightIndex : LeftIndex 
                
                if ( isArtist ) {
                    HEAD = value.name
                    CAPTION = value.genres?.[0] || "Unknown"
                }

                if ( !isArtist ) { 
                    HEAD = value.name
                    CAPTION = value.artists[0].name
                }

                return (
                    <div id="ITEM-CONTAINER" className="text-[0.7rem] font-normal" key={index}>
                        <div className="flex justify-end gap-2">
                            <div className="flex justify-end w-1/12"> {INDEX} </div>
                            <div className="w-11/12"> 
                                <div> 
                                    <div className="truncate w-24"> {HEAD} </div>
                                    <div className="font-normal opacity-50 "> {CAPTION} </div>
                                </div> 
                            </div>
                        </div>
                    </div>  
                )

            })
    }


    return (
        <div id="Layout Left" className=" flex flex-col justify-between h-full w-full">
            <div id="Layout Left" className=" flex flex-col justify-between h-full w-full">
                <div className="w-full flex flex-col gap-4">
                    <h1 className={`font-extrabold text-[2.6rem] leading-[3rem] mt-7 ${ tema !== `gray` && 'font-InstrumentSerif text-[3rem]'  }`}> { !dataRange ? "RangeNull" : ( displayText() ) } </h1>
                    <div className="w-full flex flex gap-3" >
                        <div className="flex-1" id="KIRI">
                            {RenderMyItem(dataKiri)}
                        </div>
                        <div className="flex-1" id="KANAN">
                            {RenderMyItem(dataKanan, "Kanan")}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-9">
                    <div className="text-[0.75rem] flex justify-between">
                        <div className="text-[#666666] flex gap-1 items-center"><div className="w-[7px] h-[7px] bg-[#1E6A18]"></div>made with Listify</div>
                        <div className="opacity-50">{Today}</div>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default LayoutMany;