import React, { useState } from 'react';
import s from './imageGalegyItems.module.css';
import Modal from '../Modal/modal';

export default function ImageGalleryItem({ webformatURL, largeImageURL, tags }) {
  const [showModat, detShowModat] = useState(true);

  const onModal = () => detShowModat(!showModat);

  return (
    <li onClick={onModal} className={s.item}>
      {showModat && <img className={s.img} src={webformatURL} alt={tags} />}
      {!showModat && (
        <Modal onClose={onModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </li>
  );
}
