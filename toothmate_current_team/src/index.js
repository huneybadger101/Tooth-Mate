import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App';
import TreatmentPlan from './TreatmentPlan';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/:id" element={<App/>}/>
      <Route path="/treatmentplan" element={<TreatmentPlan/>}></Route>
    </Routes>
  </BrowserRouter>
);


