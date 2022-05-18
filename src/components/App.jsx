import React, { useState, useEffect } from 'react';

import fechApi from '../services/fech';
import Container from './container/container';
import Searchbar from './Searchbar/searchbar';
import ImageGallery from './ImageGallery/imageGallery';
import Loader from './Loader/loader';
import Button from './Button/button';

const st = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
const PAGE = 1;

export default function App() {
  const [status, setStatus] = useState(st.IDLE);
  const [data, setDate] = useState([]);
  const [page, setPage] = useState(PAGE);
  const [total, setTotal] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (valueInput) {
      renderList();
      setValue(valueInput);
    }

    if (valueInput !== value) {
      setDate([]);
      setPage(PAGE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, valueInput]);

  const onLoadMore = () => {
    const increment = 1;
    setPage(prevPage => prevPage + increment);
  };

  const renderList = () => {
    setStatus(st.PENDING);

    fechApi(valueInput, page).then(res => {
      if (res.hits.length === 0) {
        return setStatus(st.REJECTED);
      }

      const filtreData = res.hits.map(
        ({ id, webformatURL, largeImageURL, tags }) => {
          return { id, webformatURL, largeImageURL, tags };
        }
      );
      setDate(prevData => [...prevData, ...filtreData]);
      setStatus(st.RESOLVED);
      setTotal(res.total);
    });
  };

  // ******** JSX ********************
  return (
    <Container>
      <Searchbar valueInput={setValueInput} />
      <div>
        {status === 'idle' && <h1>Введіть запит пошуку.</h1>}
        <ImageGallery data={data} />
        {status === 'resolved' && total !== data.length && (
          <Button onClick={onLoadMore} />
        )}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <h1>Результат запиту не знайдений!</h1>}
      </div>
    </Container>
  );
}
