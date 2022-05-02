import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import s from './searchbar.module.css';

export default function Searchbar({ submit }) {
  const [value, setValue] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    if (value.trim() !== '') {
      submit(value);
      setValue('');
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
          onChange={e => setValue(e.target.value)}
          value={value}
        />
      </form>
    </header>
  );
}
