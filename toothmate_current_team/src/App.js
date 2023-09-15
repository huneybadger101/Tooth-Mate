import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { 
    BrowserRouter as Router, 
    Routes, 
    Route, 
    Link, 
    useParams 
} from 'react-router-dom';
import './App.css';
import TeethModel from './Components/MainWindow/TeethModel';
import NotesField from './Components/MainWindow/NotesField';
import PatientWarning from './Components/MainWindow/PatientWarning';
import PatientInfo from './Components/MainWindow/PatientInfo';
import SubmitButton from './Components/MainWindow/SubmitButton';
import CancelButton from './Components/MainWindow/CancelButton';
import PlanSwitchButtons from './Components/MainWindow/PlanSwitchButtons';
import Menu from './Components/MainWindow/Menu';
import TreatmentPlan from './TreatmentPlan.jsx';

function App() {
  const [activeContent, setActiveContent] = useState('contentBase');
  const [patientData, setPatientData] = useState({})
  const { id } = useParams()

  useEffect(() => {
    axios.get(`https://5f34ab754164.ngrok.app/${id}`)
      .then((res) => {
        console.log(res.data);
        setPatientData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="App">
      <Menu />

      <Routes>
        <Route path="/" element={
          <>
            {patientData && patientData.info && <PatientWarning patientData={patientData} />}
            {patientData && patientData.info && <PatientInfo patientData={patientData} />}
            {patientData && <NotesField patientHistory={patientData.history} />}
            <SubmitButton />
            <CancelButton />
            <PlanSwitchButtons handleContentChange={setActiveContent} />
            <TeethModel activeContent={activeContent} />
          </>
        } />

        <Route path="/treatment" element={<TreatmentPlan />} />
      </Routes>
    </div>
  );
}

export default App;
