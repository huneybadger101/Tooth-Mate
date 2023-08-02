import React, { useState } from 'react';
import './StylesSheets/SealOptionStyles.css';

const SealOption = () => {
    const [mIsActive, setMIsActive] = useState(false); 
    const [oIsActive, setOIsActive] = useState(false);
    const [dIsActive, setDIsActive] = useState(false);
    const [bIsActive, setBIsActive] = useState(false);
    const [lIsActive, setLIsActive] = useState(false);

    const [activeList, setActiveList] = useState([]); 

    const handleAddToList = () => {
        let tempList = [];
        if(mIsActive) tempList.push('M');
        if(oIsActive) tempList.push('O');
        if(dIsActive) tempList.push('D');
        if(bIsActive) tempList.push('B');
        if(lIsActive) tempList.push('L');
        setActiveList(tempList);
    }

    return(
        <div className="SealOption-Container">
            <a>Seal</a>
            <div className='options'>
                <button className={mIsActive ? "button-active" : "button"} onClick={() => setMIsActive(!mIsActive)}>M</button>
                <button className={oIsActive ? "button-active" : "button"} onClick={() => setOIsActive(!oIsActive)}>O</button>
                <button className={dIsActive ? "button-active" : "button"} onClick={() => setDIsActive(!dIsActive)}>D</button>
                <button className={bIsActive ? "button-active" : "button"} onClick={() => setBIsActive(!bIsActive)}>B</button>
                <button className={lIsActive ? "button-active" : "button"} onClick={() => setLIsActive(!lIsActive)}>L</button>
                <button className='addToList' onClick={handleAddToList}>Add to List</button>
            </div>
            {activeList.length > 0 && <div>Active List: {activeList.join(', ')}</div>}
        </div>
    )
}

export default SealOption;
