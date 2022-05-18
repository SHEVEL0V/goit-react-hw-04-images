import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';

import s from './searchbar.module.css';

export default function Searchbar({ valueInput }) {
  const [value, setValue] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (value.trim() !== '') {
      valueInput(value);
    }
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={onSubmit}>
        <button type="submit" className={s.button}>
          <FiSearch />
        </button>

        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={e => setValue(e.currentTarget.value)}
          value={value}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = { valueInput: PropTypes.func.isRequired };
