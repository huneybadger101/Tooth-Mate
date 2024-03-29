import '../../StyleSheets/MainWindow/NHISearch.css';
import PlanSwitchButtons from './PlanSwitchButtons';
import { useNavigate } from 'react-router-dom';

import axios from '../../api/axios';
import { useState } from 'react';

function NHISearch({setActiveContent,formatDate}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const handleChange = async event => {
        const searchValue = event.target.value;
        setSearchTerm(searchValue);
    
        if (searchValue) {
          try {
            const response = await axios.get(`/search/${searchValue}`);
            
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
        window.location.reload();
    }
    return (
        <>
        <div className="nhi-search-container">
            
        <PlanSwitchButtons  handleContentChange={setActiveContent}/>

            <div className="nhi-search" id="NHI">
                <input type="text" value={searchTerm} onChange={handleChange} placeholder="NHI"/>
                 {/* Add the input field */}
                <button type="Search">Search</button>
                


                {results && results.length > 0 && (
                  <ul className="results">
                      {results.map((result, index) => (
                          <li key={result.nhi_c} onClick={() => handleClick(result.nhi_c)}>
                              <div>
                                  NHI: {result.nhi_c}
                                  <br />
                                  Name: {result.salutation + " " + result.first_name + " " + result.last_name}
                                  <br />
                                  Phone Number: {result.phone_mobile}
                                  <br />
                                  DOB: {formatDate(result.dob_c)}
                              </div>
                              {index < results.length - 1 && <hr />}
                          </li>
                      ))}
                  </ul>
                )}

            </div>
            
            
        </div>
        </>)
}



export default NHISearch;