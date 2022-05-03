import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDoun);

    return () => {
      return window.removeEventListener('keydown', handleKeyDoun);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handelBackdropClick(e) {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

  function handleKeyDoun(e) {
    if (e.code === 'Escape') {
      onClose();
    }
  }

  return createPortal(
    <div className={s.backdrop} onClick={handelBackdropClick}>
      <div className={s.content}>{children}</div>
    </div>,
    modalRoot,
  );
}
