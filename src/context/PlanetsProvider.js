import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import PlanetsContext from './PlanetsContext';

function StarWarsApi({ children }) {
  const [filters, setFilters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState('');

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const data = await fetch('https://swapi.dev/api/planets');
      const json = await data.json();
      setPlanets(json.results);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);
  const context = useMemo(() => ({
    planets,
    setPlanets,
    setFilterByName,
    filterByName,
    filters,
    setFilters,
  }), [planets, setFilterByName, filterByName, filters, setFilters]);

  return (
    <PlanetsContext.Provider value={ context }>
      { children }
    </PlanetsContext.Provider>
  );
}

StarWarsApi.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default StarWarsApi;
