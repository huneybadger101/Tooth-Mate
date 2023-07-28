import './App.css';
import './StyleSheets/LayoutStyles.css';
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

function App() {
  return (
    <div className="App">
      <div className="GridLayout">
        <div className="SearchBar">
          <SearchBar />
        </div>
        <div className="PatientWarning">
          <PatientWarning />
        </div>
        <div className="PatientInfo">
          <PatientInfo />
        </div>
        <div className="TeethModel">
          <TeethModel />
        </div>
        <div className="NotesField">
          <NotesField />
        </div>
        <div className="BasePlanButton">
          <BasePlanButton />
        </div>
        <div className="TreatmentPlanButton">
          <TreatmentPlanButton />
        </div>
        <div className="PeriPlanButton">
          <PeriPlanButton />
        </div>
        <div className="SubmitButton">
          <SubmitButton />
        </div>
        <div className="CancelButton">
          <CancelButton />
        </div>
      </div>
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
