const DownloadButton = ({GenerateImage}) => {
    return (
        <div id="button" className="w-full h-14 font-inter font-bold">
            <button className="bg-gray-800 text-white w-full h-full rounded-lg" onClick={GenerateImage}>Download JPEG</button>    
        </div>
    )
}

export default DownloadButton