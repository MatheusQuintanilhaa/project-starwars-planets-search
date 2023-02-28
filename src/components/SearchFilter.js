import React, { useCallback, useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function SearchFilter() {
  const [search, setSearch] = useState('');
  const { planets, setFiltersPlanets } = useContext(PlanetsContext);
  console.log(planets);
  const handleChange = (e) => {
    setSearch(e.target.value);
    /* infos(e.target.value); */
  };

  const infos = useCallback(() => {
    if (search.length > 0) {
      const filter = planets.filter((planet) => planet.name.toLowerCase()
        .includes(search.toLocaleLowerCase()));
      setFiltersPlanets(filter);
      console.log(filter);
    } else {
      setFiltersPlanets(planets);
    }
  }, [search, planets, setFiltersPlanets]);
  useEffect(() => {
    infos();
  }, [search, infos]);

  return (
    <div>
      <label htmlFor="search">
        Search:
        <input
          name="search"
          type="text"
          id="search"
          value={ search }
          onChange={ handleChange }
          data-testid="name-filter"
        />
      </label>
    </div>
  );
}

export default SearchFilter;
