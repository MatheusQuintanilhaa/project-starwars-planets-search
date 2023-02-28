import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import StarWarsApi from './context/PlanetsProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <StarWarsApi>

      <App />

    </StarWarsApi>,
  );
