

import { useState,useEffect } from 'react';
import './StyleSheets/SealOptionStyles.css';

const SealOption = ({buttonOrder,handleButtonClick,handleAddToList, url}) => {
    const [sortButton, setSortButton] = useState([])
    console.log(url)
    useEffect(()=>{
        if(url.includes("Right_Upper")){
            console.log("yes")
            setSortButton(['B', 'M', 'O', 'D', 'P'])
        }
        if(url.includes("Right_Lower")){
            console.log("yes")
            setSortButton(['L', 'M', 'O', 'D', 'B'])
        }
        if(url.includes("Left_Upper")){
            console.log("yes")
            setSortButton(['B', 'D', 'O', 'M', 'P'])
        }
        if(url.includes("Left_Lower")){
            console.log("yes")
            setSortButton(['L', 'D', 'O', 'M', 'B'])
        }
    },[])
    

    return (
        <div className="SealOption-Container">
            <a>Tooth surface</a>
            <div className='options'>
                {sortButton.map(char => (
                    <button
                        key={char}
                        className={buttonOrder.includes(char) ? "button-active" : "button"}
                        onClick={() => handleButtonClick(char)}
                    >
                        {char}
                    </button>
                ))}
                <button className='addToList' onClick={handleAddToList}>Add to List</button>
            </div>
        </div>
    )
}

export default SealOption;
