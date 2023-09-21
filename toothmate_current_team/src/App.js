import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './App.css';
import TeethModel from './Components/MainWindow/TeethModel';
import NotesField from './Components/MainWindow/NotesField';
import PatientWarning from './Components/MainWindow/PatientWarning';
import PatientInfo from './Components/MainWindow/PatientInfo';
import SubmitButton from './Components/MainWindow/SubmitButton';
import CancelButton from './Components/MainWindow/CancelButton';
import PlanSwitchButtons from './Components/MainWindow/PlanSwitchButtons';
import NHISearch from './Components/MainWindow/PatientSearch';
import EntryField from './Components/MainWindow/AppointmentEntry';
import Menu from './Components/MainWindow/Menu';


function App() {
  /* TeethModel Content change functions*/
  const [activeContent, setActiveContent] = useState('contentBase');  // This is the default content that will be set as active.


  const [patientData, setPatientData] = useState({})
  const { id } = useParams()

  useEffect(() => {
    axios.get(`https://5f34ab754164.ngrok.app/${id}`).then((res => {
      console.log(res.data)
      setPatientData(res.data)
    })).catch((err) => {
      console.log(err)
    })
  }, [id])

  return (
    <div className="App">
      <div className="menu-bar">
        <NHISearch setActiveContent={setActiveContent} />
      </div>
      {patientData && patientData.info && <PatientWarning patientData={patientData} />}

      <div className='bodyContainer'>
        <TeethModel
          activeContent={activeContent}
        />
        {patientData && <NotesField patientHistory={patientData.history} />}
      </div>

      <div className='bottomContainer'>
        {patientData && patientData.info && <PatientInfo patientData={patientData} />}
        <EntryField />
      </div>
    </div>
  );
}

export default App;