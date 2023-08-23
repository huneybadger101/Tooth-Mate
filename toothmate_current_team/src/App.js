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
import Menu from './Components/MainWindow/Menu';

function App() {
  const [patientData,setPatientData] = useState({})
  const {id} = useParams()

  useEffect(()=>{
    axios.get(`https://5f34ab754164.ngrok.app/${id}`).then((res=>{
      console.log(res.data)
      setPatientData(res.data)
    })).catch((err) =>{
      console.log(err)
    })
  },[id])

  return (
    <div className="App">
          <Menu />
          {patientData&&patientData.info&&<PatientWarning patientData={patientData}/>}
          {patientData&&patientData.info&&<PatientInfo patientData={patientData} />}
          <NotesField />
          <SubmitButton />
          <CancelButton />
          <TeethModel />
    </div>
  );
}

export default App;
