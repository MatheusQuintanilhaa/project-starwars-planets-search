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
  const { filters, setFilters, planets, setPlanets } = useContext(PlanetsContext);
  const [columns, setColumn] = useState('population');

  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);

  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });

  const oderByFilter = () => {
    const sorter = planets.sort((a, b) => {
      const lastPosition = -1;
      if (b[order.column] === 'unknown') return lastPosition;
      if (order.sort === 'ASC') return Number(a[order.column]) - Number(b[order.column]);
      return Number(b[order.column]) - Number(a[order.column]);
    });
    const arr = [...sorter];
    setPlanets(arr);
  };

  const handleFilter = () => {
    const objects = {
      column: columns, comparison, value,
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
        value={ columns }
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

      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ oderByFilter }
      >
        Ordenar
      </button>
      <label htmlFor="">
        Ascendent
        <input
          type="radio"
          name="order"
          data-testid="column-sort-input-asc"
          value="ASC"
          onChange={ ({ target: { value: valor } }) => {
            setOrder({ ...order, sort: valor });
          } }
        />
      </label>
      <label htmlFor="">
        Descendent
        <input
          type="radio"
          name="order"
          data-testid="column-sort-input-desc"
          value="DESC"
          onChange={ ({ target: { value: valor } }) => {
            setOrder({ ...order, sort: valor });
          } }
        />
      </label>

      <select
        name="column"
        data-testid="column-sort"
        value={ columns }
        onChange={ ({ target: { value: valor } }) => setOrder(
          { ...order, column: valor },
        ) }
      >
        { INITIAL_COLUMNS.map((c) => (
          <option key={ c } value={ c }>{c}</option>
        )) }
      </select>

    </form>
  );
}

export default NumberFilter;
