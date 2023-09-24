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
                <button className={option.includes("Option 1") ? "button-active" : "button"} onClick={()=> handleClick("Option 1")}>Option 1</button>
                <button className={option.includes("Option 2") ? "button-active" : "button"} onClick={()=> handleClick("Option 2")}>Option 2</button>
                <button className={option.includes("Option 3") ? "button-active" : "button"} onClick={()=> handleClick("Option 3")}>Option 3</button>
                <button className={option.includes("Option 4") ? "button-active" : "button"} onClick={()=> handleClick("Option 4")}>Option 4</button>
                <button className={option.includes("Option 5") ? "button-active" : "button"} onClick={()=> handleClick("Option 5")}>Option 5</button>
            </div>
        </div>
    )
}

export default UmbrellaTreatment