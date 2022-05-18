import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './imageGalegyItems.module.css';
import Modal from '../Modal/modal';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
}) {
  const [showModat, setShowModat] = useState(false);

  const onModal = () => {
    setShowModat(preShouModal => !preShouModal);
  };

  return (
    <>
      <li onClick={onModal} className={s.item}>
        <img className={s.img} src={webformatURL} alt={tags} />
      </li>

      {showModat && (
        <Modal onClose={onModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
