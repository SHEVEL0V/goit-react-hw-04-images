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
  const [value, setValue] = useState('');

  useEffect(() => {
    if (value) {
      setStatus(st.PENDING);

      fechApi(value, page).then(({ hits, total }) => {
        if (hits.length === 0) {
          return setStatus(st.REJECTED);
        }

        const photos = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return { id, webformatURL, largeImageURL, tags };
        });

        setDate(photosList => [...photosList, ...photos]);
        setTotal(total);
        setStatus(st.RESOLVED);
      });
    }
  }, [page, value]);

  const onLoadMore = () => {
    const increment = 1;
    setPage(prevPage => prevPage + increment);
  };

  const handelSearch = value => {
    setValue(value);
    setDate([]);
    setPage(PAGE);
  };

  // ******** JSX ********************
  return (
    <Container>
      <Searchbar handelSearch={handelSearch} />
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
