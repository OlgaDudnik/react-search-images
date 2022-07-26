import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from '../styles/styles.module.css';
import Notiflix from 'notiflix';

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      Notiflix.Notify.warning('Please enter something!');
      return;
    }

    onSubmit(value);
    setValue('');
  };

  const handleChangeValue = e => {
    setValue(e.currentTarget.value);
  };

  return (
    <header className={styles.Searchbar}>
      <form onSubmit={handleSubmit} className={styles.SearchForm}>
        <button type="submit" className={styles.SearchForm_button}>
          <span className={styles.SearchForm_icon}></span>
        </button>
        <input
          className={styles.SearchForm_input}
          onChange={handleChangeValue}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
