import React, { useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';

export default function Table() {
  const { planets, filterByName, filters } = useContext(PlanetsContext);
  const filterPlanets = () => planets.filter((planet) => {
    if (filters.length) {
      return filters.every((filter) => {
        switch (filter.comparison) {
        case 'maior que':
          return Number(planet[filter.column]) > Number(filter.value);
        case 'menor que':
          return Number(planet[filter.column]) < Number(filter.value);
        default:
          return planet[filter.column] === filter.value;
        }
      });
    }
    return true;
  });
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Rotation Period</th>
          <th scope="col">Orbital Period</th>
          <th scope="col">Diameter</th>
          <th scope="col">Climate</th>
          <th scope="col">Gravity</th>
          <th scope="col">Terrain</th>
          <th scope="col">Surface Water</th>
          <th scope="col">Population</th>
          <th scope="col">Films</th>
          <th scope="col">Created</th>
          <th scope="col">Edited</th>
          <th scope="col">URL</th>
        </tr>
      </thead>
      <tbody>
        { filterPlanets().filter(
          (planet) => planet.name.toLowerCase().includes(filterByName.toLowerCase()),
        )
          .map((planet) => (
            <tr key={ planet.name }>
              <td data-testid="planet-name">{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
