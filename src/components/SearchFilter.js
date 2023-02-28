import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function SearchFilter() {
  const { setFilterByName } = useContext(PlanetsContext);
  const handleChange = (e) => {
    setFilterByName(e.target.value);
  };

  return (
    <div>
      <label htmlFor="search">
        Search:
        <input
          name="search"
          type="text"
          id="search"
          /* value={ filterByName } */
          onChange={ handleChange }
          data-testid="name-filter"
        />
      </label>
    </div>
  );
}

export default SearchFilter;
