import LayoutRight from "./LayoutRight"
import LayoutLeft from "./LayoutLeft"
import LayoutArtistSong from "./LayoutArtistSong"
import LayoutMany from "./LayoutMany"

import { useEffect, useState, useRef, useImperativeHandle, forwardRef } from "react"

const Preview = ({ TopList, Range, Offset, TotalOutput, Layout, DATA, isLayout, setIsLayout, LayoutRef, Today }) => {


    const [ topArtists, setTopArtists ] = useState(null)
    const [ topTracks, setTopTracks ] = useState(null)
   
    console.log(`DATA DI PREVIEW: ${DATA}`)

    useEffect(() => {
        DATA && ( setTopArtists(DATA.topArtist), setTopTracks(DATA.topTracks) )
        console.log(`TOTAL OUTPUT DI PREVIEW: ${TotalOutput}`)
        const Output = Number(Offset) + 5

        if ( DATA ) {
            console.log(`OFFSET: ${Offset}, Output: ${Output}`)
            setTopArtists(() => DATA.topArtists.slice(Offset, Output) )
            setTopTracks(() => DATA.topTracks.slice(Offset, Output))
        }
        
    }, [DATA, TotalOutput, Offset])

    if (TopList) {
        console.log(`TOPLIST ${JSON.stringify(TopList)}`)
    }

    useEffect(() => {
        if (TotalOutput <= 5 && TopList.Artist && TopList.Song || TotalOutput > 5 ) {
            setIsLayout(false);
        } else {
            setIsLayout(true)
        }
    }, [TotalOutput, TopList.Artist, TopList.Song]);


    return (
        <div className="w-fit h-fit rounded-xl overflow-hidden">
        <div className="h-[624px] w-[351px] text-white preview-background font-inter" ref={LayoutRef}>
            <div className="flex justify-center items-center h-full w-full p-7"> 
                {TopList.Artist && TopList.Song ? (
                    <LayoutArtistSong
                        dataTracks={topTracks}
                        dataArtist={topArtists}
                        dataRange={Range}
                        Today={Today}
                    />
                    ) : (
                    TotalOutput > 5 && (TopList.Artist || TopList.Song) && (
                        <LayoutMany
                        DATA={DATA}
                        isArtist={TopList.Artist}
                        dataRange={Range}
                        totalOutput={TotalOutput}
                        Today={Today}
                        />
                    )
                )}
                { isLayout && TotalOutput <= 5 && 
                ( Layout.Right ? <LayoutRight Today={Today} dataRange={Range} dataTracks={topTracks} dataArtist={topArtists} isArtist={ TopList.Artist } /> : <LayoutLeft Today={Today} dataTracks={topTracks} dataArtist={topArtists} isArtist={ TopList.Artist } dataRange={Range} />  ) }
            </div>
        </div>
        </div>
    )
}

export default Preview;