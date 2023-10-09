import { useState } from 'react'
import './StyleSheets/UmbrellaTreatmentStyles.css'

const UmbrellaTreatment=({option,setOption})=>{
    
    const handleClick=(optionSelected) =>{

        if (option.includes(optionSelected)) {
            setOption(prevOrder => prevOrder.filter(item => item !== optionSelected));
        } else {
            // otherwise, append it to the list
            setOption(prevOrder => [...prevOrder, optionSelected]);
        }
    }

    return(
        <div className="UmbrellaTreatment">
            <a>UmbrellaTreatment</a>
            <div className='UmbrellaOption'>
                <button className={option.includes("Filling") ? "button-active" : "button"} onClick={()=> handleClick("Filling")}>Filling</button>
                <button className={option.includes("Crown") ? "button-active" : "button"} onClick={()=> handleClick("Crown")}>Crown</button>
                <button className={option.includes("Veneer") ? "button-active" : "button"} onClick={()=> handleClick("Veneer")}>Veneer</button>
                <button className={option.includes("Root Canal") ? "button-active" : "button"} onClick={()=> handleClick("Root Canal")}>Root Canal</button>
                <button className={option.includes("Extraction") ? "button-active" : "button"} onClick={()=> handleClick("Extraction")}>Extraction</button>
            </div>
        </div>
    )
}

export default UmbrellaTreatment