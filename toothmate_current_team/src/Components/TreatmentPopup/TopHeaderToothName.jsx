import'./StyleSheets/TopHeaderToothNameStyles.css'

const TopHeaderToothName=({url})=>{
    const toothName = url.split("3Dmodel/").join("").split(".")
    return(
        <div className="toothName">
            <a>{toothName[0].split("_").join(" ")}</a>
        </div>
    )
}

export default TopHeaderToothName