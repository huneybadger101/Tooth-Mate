
import './StylesSheets/SealOptionStyles.css';

const SealOption = ({buttonOrder,handleButtonClick,handleAddToList}) => {
    return (
        <div className="SealOption-Container">
            <a>Seal</a>
            <div className='options'>
                {['M', 'O', 'D', 'B', 'L'].map(char => (
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
