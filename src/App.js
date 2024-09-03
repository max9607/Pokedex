import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import MiComponente from './api';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Pokedex
        </p>
        <a
          className="App-link"
          href="https://www.pokemon.com/el"
          target="_blank"
          rel="noopener noreferrer"
        >
          PokeWeb
        </a>
      </header>
      <div className="App-Body">
        <MiComponente />
      </div>
    </div>
  );
}

export default App;
