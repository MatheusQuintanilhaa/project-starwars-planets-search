import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function StarWarsApi({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filtersPlanets, setFiltersPlanets] = useState([]);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const data = await fetch('https://swapi.dev/api/planets');
      const json = await data.json();
      console.log(json);
      setPlanets(json.results);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);
  const context = {
    planets,
    setFiltersPlanets,
    filtersPlanets,
  };
  return (
    <PlanetsContext.Provider value={ context }>
      { children }
    </PlanetsContext.Provider>
  );
}

StarWarsApi.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsApi;
