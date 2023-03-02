import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import  MockData from './data/MockData'
import { act } from 'react-dom/test-utils';


describe ('Verifica se é possível aplicar os filtros numéricos', () => {

  beforeEach(async() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: async () =>  MockData ,

    }));
    render(<App />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);

        screen.getByText('Tatooine');
    });

  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Verifica se é possível aplicar o filtro numérico', async () => {


    const filterByNumericValues = screen.getByTestId('column-filter');
    expect(filterByNumericValues).toBeInTheDocument();

    const filterByComparison = screen.getByTestId('comparison-filter');
    expect(filterByComparison).toBeInTheDocument();

    const filterByValue = screen.getByTestId('value-filter');
    expect(filterByValue).toBeInTheDocument();

    const filterButton = screen.getByTestId('button-filter');
    expect(filterButton).toBeInTheDocument();

    const ButtonRemoveFilter = screen.getByTestId('button-remove-filters');
    expect(ButtonRemoveFilter).toBeInTheDocument();

  });

  it('Verifica se é possível aplicar o filtro por nome', async () => {

    const filterByName = screen.getByTestId('name-filter');
    userEvent.type(filterByName, 'Tatooine');

  await waitFor(() => {
    const PlanetsName = screen.getAllByTestId('planet-name')
    expect(PlanetsName).toHaveLength(1);
  });

});

  it('Verifica se é possível aplicar o filtro por coluna', async () => {


    const filterByColumn = screen.getByTestId('column-filter');
    expect(filterByColumn).toBeInTheDocument();
    expect(filterByColumn).toHaveValue('population');
    expect(filterByColumn).toHaveLength(5);

    userEvent.selectOptions(filterByColumn, 'orbital_period');
    expect(filterByColumn).toHaveValue('orbital_period');

    const filterByComparison = screen.getByTestId('comparison-filter');
    expect(filterByComparison).toBeInTheDocument();
    expect(filterByComparison).toHaveValue('maior que');
    expect(filterByComparison).toHaveLength(3);

    userEvent.selectOptions(filterByComparison, 'menor que');
    expect(filterByComparison).toHaveValue('menor que');

    const filterByValue = screen.getByTestId('value-filter')
    expect(filterByValue).toBeInTheDocument();
    expect(filterByValue).toHaveValue(0);

    userEvent.type(filterByValue, '305');

    const filterButton = screen.getByTestId('button-filter');
    expect(filterButton).toBeInTheDocument();
    userEvent.click(filterButton);

    await waitFor(() => {
      const PlanetsName = screen.getAllByTestId('planet-name');
      expect(PlanetsName).toHaveLength(1);
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


    userEvent.selectOptions(filterByColumn, 'diameter');
    userEvent.selectOptions(filterByComparison, 'igual a');
    userEvent.type(filterByValue, '0');
    userEvent.click(filterButton);

    await waitFor(() => {
      const PlanetsName =  screen.queryAllByTestId('planet-name')
      expect(PlanetsName).toHaveLength(0);
    });

    expect(filterByColumn).toHaveLength(1);

    userEvent.click(ButtonRemoveFilter);

    expect(filterByColumn).toHaveLength(5);

  });

  it('Verifica se é possível aplicar o filtro por coluna e nome', async () => {


      const PlanetsName = screen.getAllByTestId('planet-name');
      expect(PlanetsName).toHaveLength(10);

    const filterByName = screen.getByTestId('column-filter');
    userEvent.selectOptions(filterByName, 'orbital_period');
    expect(filterByName).toBeInTheDocument();

    const filterByValue = screen.getByTestId('value-filter');
    userEvent.type(filterByValue, '3');
    expect(filterByValue).toBeInTheDocument();

    const filterByComparison = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(filterByComparison, 'maior que');
    expect(filterByComparison).toBeInTheDocument();

    const filterButton = screen.getByTestId('button-filter');
    userEvent.click(filterButton);
    expect(filterButton).toBeInTheDocument();


  const filter = screen.getByTestId('filter');
  expect(filter).toHaveTextContent(/orbital_period/i);


    const ButtonRemoveFilter = screen.getByRole('button', { name: /X/i });
    userEvent.click(ButtonRemoveFilter);

  });

  it('Verifica se ordena em ascendente e descendente', async () => {

    const btnOrder = screen.getByTestId('column-sort-button')

    const btnOrderAsc = screen.getByTestId('column-sort-input-asc')
    userEvent.click(btnOrderAsc)
    userEvent.click(btnOrder)

    const btnOrderDesc = screen.getByTestId('column-sort-input-desc')
    userEvent.click(btnOrderDesc)
    userEvent.click(btnOrder)

    userEvent.selectOptions(screen.getByTestId('column-sort'), 'orbital_period')

  });



})

/*import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import React from 'react';
describe('Oi', () => {
  it('I am your test',async  () => {
    render(<App />);
   await waitFor(()=> {
    const firstPlanet = screen.getByText('Tatooine')
    expect(firstPlanet).toBeInTheDocument()
   }, {timeout: 4000})
   userEvent.click(screen.getByTestId('button-filter'))
    const inputColuna = screen.getByTestId('column-filter')
    const inputComparacao = screen.getByTestId('comparison-filter')
    const inputValor = screen.getByTestId('value-filter')
    userEvent.selectOptions(inputColuna, 'surface_water')
    userEvent.selectOptions(inputComparacao, 'menor que')
    userEvent.type (inputValor, '20')
    userEvent.click(screen.getByTestId('button-filter'))
    userEvent.selectOptions(inputColuna, 'diameter')
    userEvent.selectOptions(inputComparacao, 'maior que')
    userEvent.type (inputValor, '19000')
    userEvent.click(screen.getByTestId('button-filter'))
    const botoes = screen.getAllByRole('button')
    userEvent.click(botoes[2])
    userEvent.type(screen.getByTestId('name-filter'), 'a')
    userEvent.click(botoes[1])
  });
})


describe('Teste',() => {
  it('I am your test',async  () => {
    render(<App />);
   await waitFor(()=> {
    const FirstPlanet = screen.getByText('Tatooine')
    expect(FirstPlanet).toBeInTheDocument()
   }, {timeout: 4000})
    const InputColuna = screen.getByTestId('column-filter')
    const InputComparacao = screen.getByTestId('comparison-filter')
    const numberInput = screen.getByTestId('value-filter')
    userEvent.selectOptions(InputColuna, 'surface_water')
    userEvent.selectOptions(InputComparacao, 'igual a')
    userEvent.type(numberInput, '30')
    userEvent.click(screen.getByTestId('button-filter'))
    userEvent.selectOptions(InputColuna, 'diameter')
    userEvent.selectOptions(InputComparacao, 'igual a')
    userEvent.type(numberInput, 'Carlos123')
    userEvent.click(screen.getByTestId('button-filter'))

  });


  it('Verify sortButton',async  () => {
    render(<App />);
   await waitFor(()=> {
    const FirstPlanet = screen.getByText('Tatooine')
    expect(FirstPlanet).toBeInTheDocument()
   }, {timeout: 4000})

   const buttonRadio = screen.getByText(/ascendent/i)
  userEvent.click(buttonRadio)
  const buttonRadio2 = screen.getByText(/descendent/i)
  userEvent.click(buttonRadio2)

  })

})
*/

