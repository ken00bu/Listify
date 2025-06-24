import { useEffect, useState } from "react"

const TotalOutput = ({ dataTotalOutput, setDataTotalOutput, dataTop }) => {

    const [isTop, setTop] = useState(false)

    useEffect(()=>{
        console.log("dataTop--------------------------------------------------")
        if ( dataTop.Song && dataTop.Artist ){
            setTop(true)
        } else {
            setTop(false)
        }
        
        console.log(`dataTop isTop: ${isTop}`)
        console.log(`dataTop Berubah: ${JSON.stringify(dataTop)}`)
    }, [dataTop])

    const onChangeOutput = (e) => {

        if (!isTop) {
            console.log("dataTop", isTop)
            setDataTotalOutput(e.target.value)
            return
        } 

        setDataTotalOutput(5)
    }

    const SliderOn = "w-40 h-12 bg-[#E0E0E0] border-2 border-[#BCBCBC] flex items-center justify-center rounded-lg"
    const SliderOff = "w-40 h-12 bg-[#E0E0E0] border-2 border-[#BCBCBC] flex items-center justify-center rounded-lg opacity-50"

    return (
        <div className="flex items-center gap-1">
           <div id="slider-container" className={ !isTop ? SliderOn : SliderOff }>
                <input type="range" className="slider" min={5} max={20} value={dataTotalOutput} onChange={(e) => onChangeOutput(e)}/>
           </div>
           <div className="w-12 h-12 flex justify-center items-center text-[#5A5A5A] font-medium bg-[#E0E0E0] border-[#BCBCBC] border-[2px] rounded-lg p-2 text-center">
                <span className={isTop ? "text-[#5A5A5A] font-bold opacity-50" : "text-[#5A5A5A] font-bold"}>{dataTotalOutput}</span>
           </div>
        </div>
    )
}

export default TotalOutput