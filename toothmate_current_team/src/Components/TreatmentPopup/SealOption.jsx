

import { useState,useEffect } from 'react';
import './StyleSheets/SealOptionStyles.css';

const SealOption = ({buttonOrder,handleButtonClick,handleAddToList, url}) => {
    const [sortButton, setSortButton] = useState([]);

    useEffect(() => {
        let buttons = [];

        if(url.includes("Right_Upper")){
            console.log("yes");
            buttons = ['B', 'M', 'O', 'D', 'P'];
        }
        if(url.includes("Right_Lower")){
            console.log("yes");
            buttons = ['L', 'M', 'O', 'D', 'B'];
        }
        if(url.includes("Left_Upper")){
            console.log("yes");
            buttons = ['B', 'D', 'O', 'M', 'P'];
        }
        if(url.includes("Left_Lower")){
            console.log("yes");
            buttons = ['L', 'D', 'O', 'M', 'B'];
        }

        const numbers = ['13', '12', '11', '21', '22', '23', '43', '42', '41', '31', '32', '33'];
        const shouldChangeOtoI = numbers.some(number => url.includes(number));

        if (shouldChangeOtoI) {
            buttons = buttons.map(button => button === 'O' ? 'I' : button);
        }

        setSortButton(buttons);
    }, [url]);


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
