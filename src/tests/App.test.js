import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { MockData } from '../data/MockData'
import { MockData2 } from '../data/Mockdata2';
import PlanetsProvider from '../context/PlanetsContext';


describe ('Verifica se é possível aplicar os filtros numéricos', () => {
  it('Verifica se é possível aplicar o filtro numérico', async () => {
    render(<App />);

    const filterByName = screen.findByTestId('name-filter');
    expect(filterByName).toBeInTheDocument();

    const filterByNumericValues = screen.findByTestId('column-filter');
    expect(filterByNumericValues).toBeInTheDocument();

    const filterByComparison = screen.findByTestId('comparison-filter');
    expect(filterByComparison).toBeInTheDocument();

    const filterByValue = screen.findByTestId('value-filter');
    expect(filterByValue).toBeInTheDocument();

    const filterButton = screen.findByTestId('button-filter');
    expect(filterButton).toBeInTheDocument();

    const ButtonRemoveFilter = screen.findByTestId('button-remove-filter');
    expect(ButtonRemoveFilter).toBeInTheDocument();

    const table = screen.findByTestId('table');
    expect(table).toBeInTheDocument();
  });

  it('Verifica se é possível aplicar o filtro por nome', async () => {
    const mockData = { results: MockData };
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    render (<App />);

    const filterByName = screen.findByTestId('name-filter');
    userEvent.type(filterByName, 'Tatooine');

  await waitFor(() => {
    const PlanetsName = screen.getByRole('PlanetsName', {name: /Tatooine/i});
    expect(PlanetsName).toBeInTheDocument();
  });

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(PlanetsProvider);

  const tb = screen.getByRole('table').querySelector('tbody');
  expect(tb.childer).toHaveLength(mockData.results.length);
  expect(tb.firstChield).toHaveTextContent('Tatooine');
  expect(tb.firstChield).toHaveTextContent('arid');
  expect(tb.firstChield).toHaveTextContent('1 standard');
  });

  it('Verifica se é possível aplicar o filtro por coluna', async () => {
    const mock = { results: MockData };
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mock),
    }));

    render (<App />);

    const filterByColumn = screen.findByTestId('column-filter');
    expect(filterByColumn).toBeInTheDocument();
    expect(filterByColumn).toHaveValue('population');
    expect(filterByColumn).toHaveLength(5);

    userEvent.selectOptions(filterByColumn, 'orbital_period');
    expect(filterByColumn).toHaveValue('orbital_period');

    const filterByComparison = screen.findByTestId('comparison-filter');
    expect(filterByComparison).toBeInTheDocument();
    expect(filterByComparison).toHaveValue('maior que');
    expect(filterByComparison).toHaveLength(3);

    userEvent.selectOptions(filterByComparison, 'menor que');
    expect(filterByComparison).toHaveValue('menor que');

    const filterByValue = screen.getByTestId('value-filter');
    expect(filterByValue).toBeInTheDocument();
    expect(filterByValue).toHaveValue(0);

    userEvent.type(filterValue, '305');

    const filterButton = screen.getByTestId('button-filter');
    expect(filterButton).toBeInTheDocument();
    userEvent.click(filterButton);

    await waitFor(() => {
      const PlanetsName = screen.getByRole('PlanetsName', { name: /Tatooine/i });
      expect(PlanetsName).toBeInTheDocument();
    });

    const ButtonRemoveFilter = screen.getByRole('button', { name: /X/i });
    expect(ButtonRemoveFilter).toBeInTheDocument();
    expect(filterByColumn).toHaveLength(4);
    expect(filterByColumn).toHaveValue('population');

    userEvent.click(ButtonRemoveFilter);

    expect(filterByColumn).toHaveLength(5);
    expect(filterByColumn).toHaveValue('population');
  });

  it('Verifica o botão de remover filtros', async () => {
    const mock = { results: MockData2 };
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mock),
    }));

    render (<App />);

    const filterButton = screen.getByTestId('button-filter');
    const ButtonRemoveFilter = screen.getByTestId('button-remove-filters');
    const filterByColumn = screen.getByTestId('column-filter');
    expect(filterByColumn).toBeInTheDocument();

    userEvent.selectOptions(filterByColumn, 'orbital_period');
    expect(filterByColumn).toHaveValue('orbital_period');

    const filterByComparison = screen.getByTestId('comparison-filter');

    userEvent.selectOptions(filterByComparison, 'menor que');
    expect(filterByComparison).toHaveValue('menor que');

    const filterByValue = screen.getByTestId('value-filter');
    expect(filterByValue).toBeInTheDocument();
    expect(filterByValue).toHaveValue(0);

    userEvent.type(filterByValue, '4000');

    userEvent.click(filterButton);


    userEvent.selectOptions(filterByColumn, 'surface_water');
    userEvent.selectOptions(filterByComparison, 'menor que');
    userEvent.type(filterByValue, '100');
    userEvent.click(filterButton);

    userEvent.selectOptions(filterByColumn, 'population');
    userEvent.selectOptions(filterByComparison, 'maior que');
    userEvent.type(filterByValue, '30000000');
    userEvent.click(filterButton);

    await waitFor(() => {
      const PlanetsName = screen.getByRole('PlanetsName', { name: /Tatooine/i });
      expect(PlanetsName).toBeInTheDocument();
    });

    expect(filterByColumn).toHaveLength(2);

    userEvent.click(ButtonRemoveFilter);

    expect(filterByColumn).toHaveLength(5);
  });
})
