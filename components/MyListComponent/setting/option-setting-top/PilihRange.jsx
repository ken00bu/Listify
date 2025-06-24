import dynamic from "next/dynamic";
import { useEffect } from "react";

const Select = dynamic(() => import('react-select'), { ssr: false });

const PilihRange = ({dataRange, setDataRange }) => {

    const options = [
        { value: 'Last 4 Weeks', label: 'Last 4 Weeks' },
        { value: 'Last 6 Months', label: 'Last 6 Months' },
        { value: 'Last Year', label: 'Last Year' }
    ]

    useEffect(() => {
        setDataRange(options[0])
    }, [])

    const customStyle = {
        control: (styles) => ({
            ...styles,
            backgroundColor: 'white',
            borderRadius: '10px',
            display: 'flex',
            textAlign: 'center',
            width: '100%',
            border: '2px dashed #36A42E',
            boxShadow: 'none',
            fontFamily: 'var(--font-inter)',
            paddingTop: '8px',
            paddingBottom: '8px',
            fontWeight: '600',
            color: '#36A42E',
        }),
        SingleValue: ( style ) => ({
            color: '#36A42E',
        }),
        option: ( styles, state ) => ({
            ...styles,
        })
        
    }

    const customComponent = {
        DropdownIndicator: () => null
    }
    

    return (
         <div className="flex w-full h-full">
            <div className="w-full">
                <Select options={options} styles={customStyle} components={customComponent} onChange={(data => setDataRange(data))} isSearchable={false} value={dataRange}/>
            </div>
        </div>
    )
}

export default PilihRange;