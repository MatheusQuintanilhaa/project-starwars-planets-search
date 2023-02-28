import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const SearchFilterContext = createContext();

export function SearchFilterProvider({ children }) {
  const [search, setSearch] = useState('');

  const infos = (names) => {
    setSearch(names);
  };

  return (
    <SearchFilterContext.Provider value={ { search, infos } }>
      {children}
    </SearchFilterContext.Provider>
  );
}
SearchFilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
