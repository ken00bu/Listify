'use client'
import { useState, useEffect, useRef } from "react";
import fetchTopItems from "@/utils/fetchTopItems";
import readCookie from "@/utils/readCookie";
import html2canvas from "html2canvas";
import DomToImage from "dom-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

import Preview from "@/components/MyListComponent/Preview";
import PilihTop from "@/components/MyListComponent/setting/option-setting-top/PilihTop";
import PilihRange from "@/components/MyListComponent/setting/option-setting-top/PilihRange";
import InputNomor from "@/components/MyListComponent/setting/option-setting-top/offset-setting/InputNomor";
import TotalOutput from "@/components/MyListComponent/setting/option-setting-top/offset-setting/TotalOutput";
import PilihLayout from "@/components/MyListComponent/setting/option-setting-top/layout-setting/PilihLayout";
import TemaSetting from "@/components/MyListComponent/setting/option-setting-top/tema-setting/TemaSetting";
import DownloadButton from "@/components/MyListComponent/setting/option-download/DownloadButton"



const MyList = () => {
    const [ Data, setData ] = useState();
    const [ DataListWeek, setDataListWeek ] = useState();
    const [ DataListMonth, setDataListMonth ] = useState();
    const [ DataListYear, setDataListYear ] = useState();

    const PreviewLayout = useRef()
    console.log("------------------RE-RENDER----------------------------")
    //State yang dikirim di Preview
    const [ dataTop, setDataTop ] = useState({ Song: true, Artist: false })
    const [ dataLayout, setDataLayout ] = useState({ Right: true, Left: false })
    const [ dataRange, setDataRange ] = useState()
    const [ dataNilaiOffset, setDataNilaiOffset ] = useState(0)
    const [ dataTotalOutput, setDataTotalOutput ] = useState(5)
    const [ isLayout, setIsLayout ] = useState(true)
    const [ DateNow, setDateNow ] = useState()
    const [ tema, setTema ] = useState("gray")

    useEffect(() => {


        const MyCookies = document.cookie;

        //Dapatin data full
        const Response = async () => {
            const CookieStorage = await readCookie(MyCookies)
            if ( !CookieStorage ) return
            
            const DataWeek = await fetchTopItems(
                CookieStorage.access_token, 
                20, 
                'short_term', 
                CookieStorage.token_expired_date, 
                CookieStorage.refresh_token
            );

            setDataListWeek(DataWeek)
            console.log(`INI DI DATA WEEK ${JSON.stringify(DataWeek)}`)

            const DataListMonth = await fetchTopItems(
                CookieStorage.access_token, 
                20, 
                'medium_term', 
                CookieStorage.token_expired_date, 
                CookieStorage.refresh_token
            );

            setDataListMonth(DataListMonth)
            

            const DataListYear = await fetchTopItems(
                CookieStorage.access_token, 
                20, 
                'long_term', 
                CookieStorage.token_expired_date, 
                CookieStorage.refresh_token
            );

            setDataListYear(DataListYear)
            setData(DataWeek)
           
        } 

        const Today = new Date()
        const TodayDate = Today.toLocaleDateString("Id-ID", { day: "numeric", month: "long", year: "numeric"})
        console.log(`TODAY DATE: ${TodayDate}`)
        setDateNow(TodayDate)
        

        Response();
    }, []);

    useEffect(() => {
        dataRange?.value === "Last 4 Weeks" && setData(DataListWeek);
        dataRange?.value === "Last 6 Months" && setData(DataListMonth);
        dataRange?.value === "Last Year" && setData(DataListYear);

        console.log(`DATA SAAT INI: ${JSON.stringify(Data)}`)
    }, [dataRange, DataListMonth, DataListWeek, DataListYear])

    useEffect(()=>{ console.log(`DATE BERUBAH: ${DateNow}`) }, [DateNow])

   const GenerateImage = async () => {
    if (!PreviewLayout) return
    
    await document.fonts.ready;
    console.log(PreviewLayout)
    
    
    const Image = await toJpeg(PreviewLayout.current, {pixelRatio: 5})

    const link = document.createElement('a')
    link.download = 'listify.png'
    link.href = Image
    link.click()
   }

    return (
        <div className="flex flex-col items-center justify-center mb-24">
        <div className=" flex justify-center items-center font-inter"> 
            <div id="container-buat-ketengah">
                <div id="container-buat-elemen" className="flex gap-10 flex-col md:flex-row items-center justify-center pt-24 pb-24">
                    <div className="zoom-[0.80] md:zoom-100 rounded-xl h-full"> < Preview TopList={dataTop} Range={dataRange} Offset={dataNilaiOffset} TotalOutput={dataTotalOutput} Layout={dataLayout} DATA={Data} isLayout={isLayout} setIsLayout={setIsLayout} LayoutRef={PreviewLayout} Today={DateNow} tema={tema} setTema={setTema} /> </div>
                    <div id="container-buat-setting" className="bg-white w-[105%] rounded-3xl border-[1px] border-[#BABABA] p-4 flex flex-col gap-6 pt-8">
                        <div id="container-buat-atas" className="flex flex-col gap-3">
                            <h1 className="font-inter text-sm font-medium text-[#999999]"> Get My Top List </h1>
                            <div id="container-buat-button" className="flex flex-col gap-2">
                                <div id="container-buat-button-hijau">
                                    < PilihTop setDataTop={setDataTop} />
                                </div>
                                < PilihRange dataRange={dataRange} setDataRange={setDataRange} />
                            </div>
                        </div>
                        <div id="container-buat-offset" className="flex flex-col gap-3">
                            <h1 className="font-inter text-sm font-medium text-[#999999]">Offset: Atur urutan top list kamu (maks 20)</h1>
                            <div id="container-buat-input-offset" className="flex items-center gap-3">
                                < InputNomor dataNilaiOffset={dataNilaiOffset} setDataNilaiOffset={setDataNilaiOffset} />
                                < TotalOutput dataTotalOutput={dataTotalOutput} setDataTotalOutput={setDataTotalOutput} dataTop={dataTop} />
                            </div>
                        </div>
                        <div id="container-buat-pilih-layout">
                            <div className="flex flex-col gap-3">
                                <h1 className="font-inter text-sm font-medium text-[#999999]"> Pilih Layout </h1>
                                < PilihLayout setDataLayout={setDataLayout} isLayout={isLayout} />
                            </div>
                        </div>
                        <div id="container-buat-tema">
                            <div className="flex flex-col gap-3">
                                <h1 className="font-inter text-sm font-medium text-[#999999]"> Pilih Tema </h1>
                                <TemaSetting tema={tema} setTema={setTema} />
                            </div>
                        </div>
                        <div id="container-download-button">
                            <DownloadButton GenerateImage={GenerateImage}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="font-inter font-medium opacity-30" ><a href="https://muhammad-fikri.vercel.app/" target="_blank" rel="noopener noreferrer"> Made by Kenobu using React ✨ </a></div>
        </div>
        
    );
}

export default MyList;