import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './App.css';
import TeethModel from './Components/MainWindow/TeethModel';
import ChildTeethModel from './Components/MainWindow/Pediatric_TeethModel'
import NotesField from './Components/MainWindow/NotesField';
import PatientWarning from './Components/MainWindow/PatientWarning';
import PatientInfo from './Components/MainWindow/PatientInfo';
import SubmitButton from './Components/MainWindow/SubmitButton';
import CancelButton from './Components/MainWindow/CancelButton';
import PlanSwitchButtons from './Components/MainWindow/PlanSwitchButtons';
import NHISearch from './Components/MainWindow/PatientSearch';
import EntryField from './Components/MainWindow/AppointmentEntry';
import XrayList from './Components/MainWindow/XrayHistory';
import Menu from './Components/MainWindow/Menu';
import _ from 'lodash';


function App() {
  /* TeethModel Content change functions*/
  const [showTreatmentPopup, setshowTreatmentPopup] = useState(false);
  const [activeContent, setActiveContent] = useState('contentBase');  // This is the default content that will be set as active.
  const [childModelActive, setChildModeActive] = useState(false)
  const [patientData, setPatientData] = useState({})
  const [treatmentTodo, setTreatmentTodo] = useState({})
  const [oldTreatmentTodo, setOldTreatmentTodo] = useState({})
  const [note,setNote] = useState('')
  const [oldNote, setOldNote] = useState('')
  const { id } = useParams()
  const [recordId, setRecordID] = useState()
  const [save, setSave] = useState(false)

  const fetchData = async () => {
    try {
      const res = await axios.get(`https://5f34ab754164.ngrok.app/${id}`);
      setPatientData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id,save]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

  const addRecord = async () => {
    if(!save){
      try {
        const response = await axios.post('https://5f34ab754164.ngrok.app/addRecord', {
          nhi: id,
          treatmentSummary: treatmentTodo,
          notes: note
        });
        console.log(response.data); // Record added successfully!
        setRecordID(response.data.recordId)
        setOldNote(note)
        setSave(true)
        setOldTreatmentTodo(treatmentTodo)
        alert('Record added successfully!')
      } catch (error) {
        console.error('There was an error adding the record!', error);
      }
    }
    else{
      if(_.isEqual(treatmentTodo, oldTreatmentTodo) && note === oldNote){
        alert("Nothing changes")
      }
      else{
        try {
          const response = await axios.put('https://5f34ab754164.ngrok.app/updateRecord', {
              recordId: recordId, // Use the correct record ID here
              treatmentSummary: treatmentTodo,
              notes: note
          });
          console.log(response.data); // Record updated successfully!
          setOldTreatmentTodo(treatmentTodo)
          setOldNote(note)
          alert('Record updated successfully!')
          fetchData();
      } catch (error) {
          console.error('There was an error updating the record!', error);
      }
      }
    }
    
  };

  const handleCancelChnage =()=>{
    setTreatmentTodo(oldTreatmentTodo)
    setNote(oldNote)
  }
  

  return (
    <div className="App">
      <div className="menu-bar">
        <NHISearch setActiveContent={setActiveContent} formatDate={formatDate}/>
      </div>
      <div className='warning-submit-cancel-panel'>
        {patientData && patientData.info && <PatientWarning patientData={patientData} />}
        <SubmitButton addRecord={addRecord} save={save}/>
        <CancelButton handleCancelChnage={handleCancelChnage}/>
      </div>
      

      <div className='bodyContainer'>
        {console.log(patientData)}
        {childModelActive ?
          <ChildTeethModel formatDate={formatDate} patientHistory={patientData.history} activeContent={activeContent} setChildModeActive={setChildModeActive} treatmentTodo={treatmentTodo} setTreatmentTodo={setTreatmentTodo}/>:
          <TeethModel formatDate={formatDate} activeContent={activeContent} setChildModeActive={setChildModeActive} treatmentTodo={treatmentTodo} setTreatmentTodo={setTreatmentTodo} patientHistory={patientData.history}/>
        }
        
        <NotesField patientHistory={patientData.history} setTreatmentTodo={setTreatmentTodo} treatmentTodo={treatmentTodo} showTreatmentPopup={showTreatmentPopup} setshowTreatmentPopup={setshowTreatmentPopup}/>
      </div>

      <div className='bottomContainer'>
        <PatientInfo patientData={patientData} formatDate={formatDate} fetchData={fetchData}/>

       <EntryField setNote={setNote} note={note}/>
        <XrayList patientHistory={patientData.history}/>

      </div>
    </div>
  );
}

export default App;
