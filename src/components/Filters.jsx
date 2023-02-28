import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Filters() {
  const { filters, setFilters } = useContext(PlanetsContext);
  return (
    <div>
      Filters
      {
        filters.map((filter) => (
          <div key={ filter.column } data-testid="filter">
            <p>{filter.column}</p>
            <p>{filter.comparison}</p>
            <p>{filter.value}</p>
            <button
              type="button"
              onClick={
                () => setFilters(filters.filter((f) => f.column !== filter.column))
              }
            >
              X
            </button>
          </div>
        ))
      }
    </div>
  );
}
