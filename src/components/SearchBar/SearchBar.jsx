import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './SearchBar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [state, setState] = useState('');

  const handleInputChange = event => {
    setState(event.target.value);
  };

  const handleSearchSubmit = event => {
    event.preventDefault();
    onSubmit(state);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSearchSubmit}>
        <button className={css.button} type="submit">
          <span className={css.label}></span>
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
          value={state}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
