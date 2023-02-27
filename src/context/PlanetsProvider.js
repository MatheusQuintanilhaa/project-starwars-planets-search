import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import context from './PlanetsContext';

function StarWarsApi({ children }) {
  const [planets, setPlanets] = useState([]);

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

  return (
    <context.Provider value={ { planets } }>
      { children }
    </context.Provider>
  );
}

StarWarsApi.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsApi;
