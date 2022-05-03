import React, { useState, useEffect } from 'react';
import s from './ImageGalery.module.css';
import Loader from '../Loader/loader';
import Button from '../Button/button';
import fechApi from '../fech/fech';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const st = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
const PAGE = 1;

export default function ImageGallery({ valueInput }) {
  const [status, setStatus] = useState(st.IDLE);
  const [urlList, setUrlList] = useState([]);
  const [page, setPage] = useState(PAGE);
  const [total, setTotal] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (valueInput) {
      renderList();
      setValue(valueInput);
    }
    if (value !== valueInput) {
      setUrlList([]);
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueInput, page]);

  function onLoadMore() {
    const increment = 1;
    setPage(prePage => prePage + increment);
  }

  function renderList() {
    setStatus(st.PENDING);
    fechApi(valueInput, page)
      .then(res => {
        setTotal(res.total);
        setUrlList(preList => [...preList, ...res.hits]);
        setStatus(st.RESOLVED);
        if (res.hits.length === 0) {
          setStatus(st.REJECTED);
        }
      })
      .catch(e => setStatus(st.REJECTED));
  }

  // ******** JSX ********************

  return (
    <div>
      {status === 'idle' && <h1>Введіть запит пошуку.</h1>}

      <ul className={s.galery}>
        {urlList.map(el => (
          <ImageGalleryItem
            key={el.id}
            webformatURL={el.webformatURL}
            largeImageURL={el.largeImageURL}
            tags={el.tags}
          />
        ))}
      </ul>

      {status === 'resolved' && total !== urlList.length && <Button onClick={onLoadMore} />}
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <h1>Результат запиту не знайдений!</h1>}
    </div>
  );
}
