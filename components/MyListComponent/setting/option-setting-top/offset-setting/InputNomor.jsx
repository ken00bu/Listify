const InputNomor = ({ dataNilaiOffset, setDataNilaiOffset }) => {


    const onChangeHandle = (e) => {
        e.target.value > 20 ? setDataNilaiOffset(20) : setDataNilaiOffset(e.target.value)
    }

    



    return (
        <div>
            <input type="number" name="" id="" className="w-12 h-12 font-bold bg-[#36A42E] border-[#3E7F39] border-[2px] rounded-lg text-white p-2 text-center" min={0} max={20} onChange={onChangeHandle} value={dataNilaiOffset}/>
        </div>
    )
}

export default InputNomor;