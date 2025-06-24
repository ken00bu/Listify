import { useState, useEffect } from "react"

const PilihLayout = ({ setDataLayout, isLayout }) => {
    
    const [ rightClicked, setRightClicked ] = useState(true)
    const [ leftClicked, setLeftClicked ] = useState(false)
    const ButtonNotClicked = "flex-1 pt-2 pb-2 font-semibold bg-white text-[#36A42E] transition border-[2px] border-[#36A42E] rounded-[10px]"
    const ButtonClicked = "flex-1 pt-2 pb-2 font-semibold bg-[#73C06D] text-white transition border-[2px] border-[#36A42E] rounded-[10px]"

    useEffect(() => {
        setDataLayout({
            Right: rightClicked,
            Left: leftClicked,
        })

        console.log(`right: ${rightClicked} left: ${leftClicked}`)
    }, [rightClicked, leftClicked])

    const clickHandle = ( type ) => {
        if ( !isLayout ) return
        
        if ( type === "Right" && rightClicked === false) {
            setRightClicked( prev => !prev )
            setLeftClicked( prev => !prev )
        } else if ( type === "Left" && leftClicked === false) {
            setLeftClicked( prev => !prev )
            setRightClicked( prev => !prev )
        }
    }

    return (
       <div className={ isLayout ? "flex gap-2" : "flex gap-2 opacity-55" }>
            <button className={ rightClicked ? ButtonClicked : ButtonNotClicked } onClick={() => clickHandle("Right")}> Right </button>
            <button className={ leftClicked ? ButtonClicked : ButtonNotClicked } onClick={() => clickHandle("Left")}> Left </button> 
        </div>
    )
}

export default PilihLayout;