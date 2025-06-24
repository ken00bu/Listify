import { useEffect, useState } from "react";

const PilihTop = ({ setDataTop }) => {
    const [ artistClicked, setArtistClicked ] = useState(true)
    const [ songClicked, setSongClicked ] = useState(true)
    const ButtonNotClicked = "flex-1 pt-2 pb-2 font-semibold bg-white text-[#36A42E] transition border-[2px] border-[#36A42E] rounded-[10px]"
    const ButtonClicked = "flex-1 pt-2 pb-2 font-semibold bg-[#73C06D] text-white transition border-[2px] border-[#36A42E] rounded-[10px]"

    useEffect(() => {
        setDataTop({
            Song: songClicked,
            Artist: artistClicked,
        })
    }, [artistClicked, songClicked])

    const clickHandle = ( type ) => {
        if ( ( type === "Artist" && artistClicked && !songClicked ) || ( type === "Song" && songClicked && !artistClicked ) ) {
            return
        } 

        type === "Artist" && setArtistClicked( prev => !prev );
        type === "Song" && setSongClicked( prev => !prev )
    }

    return (
        <div className="flex gap-2">
            <button className={ artistClicked ? ButtonClicked : ButtonNotClicked } onClick={() => clickHandle("Artist")}> Artist </button>
            <button className={ songClicked ? ButtonClicked : ButtonNotClicked } onClick={() => clickHandle("Song")}> Song </button> 
        </div>
    )
}

export default PilihTop;