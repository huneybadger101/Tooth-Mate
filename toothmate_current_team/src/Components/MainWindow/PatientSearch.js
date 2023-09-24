import '../../StyleSheets/MainWindow/NHISearch.css';
import PlanSwitchButtons from './PlanSwitchButtons';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { useState } from 'react';

function NHISearch({setActiveContent}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const handleChange = async event => {
        const searchValue = event.target.value;
        setSearchTerm(searchValue);
    
        if (searchValue) {
          try {
            const response = await axios.get(`https://5f34ab754164.ngrok.app/search/${searchValue}`);
            
            setResults(response.data.data);
            console.log(results)
          } catch (err) {
            console.error('Error fetching data:', err);
          }
        } else {
          setResults([]);
        }
      };
    const handleClick=(id)=>{
        setSearchTerm(id)
        setResults([])
        navigate(`/${id}`);
    }
    return (
        <>
        <div className="nhi-search-container">
            
        <PlanSwitchButtons handleContentChange={setActiveContent}/>

            <div className="nhi-search" id="NHI">
                <input type="text" value={searchTerm} onChange={handleChange} placeholder="NHI"/>
                 {/* Add the input field */}
                <button type="Search">Search</button>
                {results && results.length > 0 && (
                <ul className="results">
                {results.map((result, index) => (
                    <li key={index} onClick={()=>handleClick(result.nhi_c)}>NHI: {result.nhi_c}<br/> Name: {result.salutation+" "+result.first_name+" "+result.last_name}</li>
                ))}
                </ul>
            )}
            </div>
            
        </div>
        </>)
}



export default NHISearch;