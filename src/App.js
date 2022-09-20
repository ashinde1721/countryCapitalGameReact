import './App.css';
import CountryCapitalGame from './CountryCapitalGame';

function App() {
  const data = {
  Australia: 'Canberra',
  Italy: 'Rome',
  India: 'Delhi',
  Brazil: 'Brasilia'
  }
  return (
    <div className="App">
      {<CountryCapitalGame {...{data}}/>}
    </div>
  );
}

export default App;
