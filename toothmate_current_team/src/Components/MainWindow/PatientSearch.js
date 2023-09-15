import '../../StyleSheets/MainWindow/NHISearch.css';
import PlanSwitchButtons from './PlanSwitchButtons';

function NHISearch({setActiveContent}) {
    return (
        <>
        <div className="nhi-search-container">
        <PlanSwitchButtons
          handleContentChange={setActiveContent}
        />
            <form className="nhi-search" id="NHI">
                <input type="text" placeholder="NHI"/>
                <input type="text" placeholder = "Name"/>
                <input type="text" placeholder = "D.o.B"/>
                 {/* Add the input field */}
                <button type="Search">Search</button>
            </form>
        </div>
        </>)
}



export default NHISearch;