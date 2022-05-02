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
      setStatus(st.PENDING);
      renderList();
      setValue(valueInput);
      if (valueInput !== value) {
        setUrlList([]);
        setPage(1);
      }
    }
  }, [valueInput]);

  useEffect(() => {
    if (urlList.length > 0) setStatus(st.RESOLVED);
    if (urlList.length === 0) setStatus(st.REJECTED);
  }, [urlList]);

  useEffect(() => {
    if (page > 1) {
      renderList();
    }
  }, [page]);

  function onLoadMore() {
    const increment = 1;

    setPage(prePage => prePage + increment);
  }

  function renderList() {
    fechApi(valueInput, page).then(res => {
      setTotal(res.total);
      setUrlList(preList => [...preList, ...res.hits]);
    });
  }

  // ******** HML ********************

  if (status === 'idle') {
    return <h1>Введіть запит пошуку.</h1>;
  }
  if (status === 'pending') {
    return <Loader />;
  }
  if (status === 'resolved') {
    return (
      <div>
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
        {total !== urlList.length && <Button onClick={onLoadMore} />}
      </div>
    );
  }
  if (status === 'rejected') {
    return <h1>Результат запиту не знайдений!</h1>;
  }
}
