import './App.css';
import TeethModel from './Components/MainWindow/TeethModel';
import NotesField from './Components/MainWindow/NotesField';
import PatientWarning from './Components/MainWindow/PatientWarning';
import PatientInfo from './Components/MainWindow/PatientInfo';
import SubmitButton from './Components/MainWindow/SubmitButton';
import CancelButton from './Components/MainWindow/CancelButton';
import Menu from './Components/MainWindow/Menu';

function App() {
  return (
    <div className="App">
          <Menu />
          <PatientWarning />
          <PatientInfo />
          <NotesField />
          <SubmitButton />
          <CancelButton />
          <TeethModel />
    </div>
  );
}

export default App;
