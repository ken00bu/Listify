`use client`;
import { useState, useEffect } from 'react';
const TemaSeting = ({ tema, setTema }) => {
    const [ animateKey, setAnimateKey ] = useState();
    

    const MyTema = {
        "gray" : "tema/gray.svg",
        "goblin" : "tema/goblin.svg",
        "melankolis" : "tema/melankolis.svg",
        "hotfire" : "tema/hotfire.svg",
    }

    const setNewTema = (newTema) => {                                                                             
        setTema(newTema);
    }

    const RenderTemaButton = () => {
        return Object.entries(MyTema).map(([temaKey, value]) => {
            return (
                <button 
                    key={temaKey} 
                    className={`w-12 h-12 rounded-full overflow-hidden`}
                    onClick={() => setNewTema(temaKey)}
                >
                    <div className={`w-12 h-12 rounded-full absolute transition duration-200 ${temaKey === tema ? 'border-[3px] border-white ring-2 ring-[#CECECE] ring-offset-2 ring-offset-transparent' : 'border-0'}`}>  </div>
                    <img src={value} alt={value} className={`w-full h-full object-cover rounded-full object-top transition duration-1000`} />
                </button>
            )
        })
    }

    return (
        <div className="flex gap-2">
            { RenderTemaButton() }
        </div>
    )
}

export default TemaSeting;