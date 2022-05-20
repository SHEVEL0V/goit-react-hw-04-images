import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';

import s from './searchbar.module.css';

export default function Searchbar({ handelSearch }) {
  const [value, setValue] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (value.trim() !== '') {
      handelSearch(value);
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

Searchbar.propTypes = { handelSearch: PropTypes.func.isRequired };
