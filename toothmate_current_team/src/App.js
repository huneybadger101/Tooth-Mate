import './App.css';
import SearchBar from './Components/MainWindow/SearchBar';
import TeethModel from './Components/MainWindow/TeethModel';
import NotesField from './Components/MainWindow/NotesField';
import PatientWarning from './Components/MainWindow/PatientWarning';
import BasePlanButton from './Components/MainWindow/BasePlanButton';
import TreatmentPlanButton from './Components/MainWindow/TreatmentPlanButton';
import PeriPlanButton from './Components/MainWindow/PeriPlanButton';
import PatientInfo from './Components/MainWindow/PatientInfo';
import SubmitButton from './Components/MainWindow/SubmitButton';
import CancelButton from './Components/MainWindow/CancelButton';
import Menu from './Components/MainWindow/Menu';

function App() {
  return (
    <div className="App">
          <Menu />
          <SearchBar />
          <PatientWarning />
          <PatientInfo />
          <NotesField />
          <BasePlanButton />
          <TreatmentPlanButton />
          <PeriPlanButton />
          <SubmitButton />
          <CancelButton />
          <TeethModel />
    </div>
  );
  // Below code was used to see the grid cells
  /*return (
    <div className="App">
      <div className="GridLayout">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );*/
}

export default App;
