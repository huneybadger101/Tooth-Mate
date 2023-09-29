import { useState,useEffect } from 'react';
import axios from 'axios';
import '../../StyleSheets/MainWindow/PatientInfo.css';

function PatientInfo({ patientData, formatDate }) {
    const patientInfo = patientData?.info?.[0];
    const otherInfo = patientData?.otherInfo?.[0];
    const [edit, setEdit] = useState(false);

    // State for input fields
    const [firstName, setFirstName] = useState(patientInfo?.first_name??"");
    const [lastName, setLastName] = useState(patientInfo?.last_name ?? "");
    const [dob, setDob] = useState(otherInfo ? formatDate(otherInfo.dob_c) : "");
    const [street, setStreet] = useState(patientInfo?.primary_address_street ?? "");
    const [city, setCity] = useState(patientInfo?.primary_address_city ?? "");
    const [country, setCountry] = useState(patientInfo?.primary_address_country ?? "");
    const [phone, setPhone] = useState(patientInfo?.phone_mobile ?? "");

    useEffect(() => {
        if (patientData) {
            const patientInfo = patientData?.info?.[0];
            const otherInfo = patientData?.otherInfo?.[0];
            
            setFirstName(patientInfo?.first_name ?? "");
            setLastName(patientInfo?.last_name ?? "");
            setDob(otherInfo ? formatDate(otherInfo.dob_c) : "");
            setStreet(patientInfo?.primary_address_street ?? "");
            setCity(patientInfo?.primary_address_city ?? "");
            setCountry(patientInfo?.primary_address_country ?? "");
            setPhone(patientInfo?.phone_mobile ?? "");
        }
    }, [patientData]);

    const handleSave=async()=>{
        try {
            const response = await axios.post('https://5f34ab754164.ngrok.app/updateInfo', {
              firstName: firstName,
              lastName: lastName,
              dob:dob,
              street:street,
              city:city,
              country:country,
              phone:phone
            });
            
            alert('Update patient info successfully!')
          } catch (error) {
            console.error('There was an error adding the record!', error);
          }
    }

    const handleCancel=()=>{
        setFirstName(patientInfo?.first_name ?? "");
        setLastName(patientInfo?.last_name ?? "");
        setDob(otherInfo ? formatDate(otherInfo.dob_c) : "");
        setStreet(patientInfo?.primary_address_street ?? "");
        setCity(patientInfo?.primary_address_city ?? "");
        setCountry(patientInfo?.primary_address_country ?? "");
        setPhone(patientInfo?.phone_mobile ?? "");
        setEdit(false)
    }

    return (
        <>
            {edit ? (
                <div className="patient-info-container-edit">
                    <h3>Patient Info</h3>
                    <div className="info-field">
                        <label>First name:</label>
                        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <br/>
                        <label>Last Name:</label>
                        <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <br/>
                        <label>DOB:</label>
                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                        <br/>
                        <label>Address:</label>
                        <input value={street} onChange={(e) => setStreet(e.target.value)} />
                        <br/>
                        <label>City Name:</label>
                        <input value={city} onChange={(e) => setCity(e.target.value)} />
                        <br/>
                        <label>Country:</label>
                        <input value={country} onChange={(e) => setCountry(e.target.value)} />
                        <br/>
                        <label>Phone:</label>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className='btn-container'>
                        <button className='save-btn' onClick={() => { handleSave() }}>Save</button>
                        <button className='edit-btn' onClick={() => { handleCancel() }}>Cancel</button>
                    </div>
                    
                </div>
            ) : (
                <div className="patient-info-container">
                    <h3>Patient Info</h3>
                    <div className="info-field">
                        <p>Name: {`${firstName} ${lastName}`}</p>
                        <p>Date of Birth: {dob}</p>
                        <p>Address: {`${street}, ${city}, ${country}`}</p>
                        <p>Phone: {phone}</p>
                    </div>
                    <button className='edit-btn' onClick={() => { setEdit(true) }}>Edit</button>
                </div>
            )}
        </>
    );
}

export default PatientInfo;
