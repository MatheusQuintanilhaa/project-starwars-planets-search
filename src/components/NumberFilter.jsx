import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const INITIAL_COLUMNS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function NumberFilter() {
  const { filters, setFilters } = useContext(PlanetsContext);
  const [column, setColumn] = useState('population');

  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);

  /* const handleChange = useCallback(({ target: { name, value } }) => {
    setColumn(value);
    const values = {
      column: value,
    };
  }); */

  const handleFilter = () => {
    const objects = {
      column, comparison, value,
    };
    setFilters([...filters, objects]);
    setColumn('population');
    setComparison('maior que');
    setValue(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFilter();
  };

  return (
    <form onSubmit={ handleSubmit }>
      <select
        name="column"
        data-testid="column-filter"
        value={ column }
        onChange={ ({ target: { value: valor } }) => setColumn(valor) }
      >
        {
          INITIAL_COLUMNS.filter((e) => {
            const filter = filters.some((f) => f.column === e);
            return !filter;
          })
            .map((c) => (
              <option key={ c } value={ c }>{c}</option>
            ))
        }
      </select>

      <select
        name="comparison"
        data-testid="comparison-filter"
        onChange={ ({ target: { value: valor } }) => setComparison(valor) }
        value={ comparison }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        name="value"
        data-testid="value-filter"
        onChange={ ({ target: { value: valor } }) => setValue(valor) }
        value={ value }
      />

      <button
        type="submit"
        data-testid="button-filter"
      >
        Filtrar
      </button>

      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => setFilters([]) }
      >
        Remover Filtros
      </button>
    </form>
  );
}

export default NumberFilter;
