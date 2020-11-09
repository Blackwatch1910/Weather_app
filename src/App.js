import './App.css';
import Forecast from './components/forecast/Forecast';
import Logo from './components/forecast/Logo/Logo.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <h1>React Weather App</h1>
      </header>

      <main>
        <Forecast />
      </main>

      <footer>
        Created by Blackwatch
      </footer>
    </div>
  );
}

export default App;
