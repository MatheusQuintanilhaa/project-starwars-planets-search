import React from 'react';
import './App.css';
import SearchFilter from './components/SearchFilter';
import Table from './components/Table/Table';
import Filters from './components/Filters';
import NumberFilter from './components/NumberFilter';
import StarWarsApi from './context/PlanetsProvider';

function App() {
  return (
    <StarWarsApi>
      <div>
        <SearchFilter />
        <Table />
        <NumberFilter />
        <Filters />
      </div>
    </StarWarsApi>

  );
}

export default App;
