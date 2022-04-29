import React, { Component } from 'react';
import s from './imageGalegyItems.module.css';
import Modal from '../Modal/modal';

export default class ImageGalleryItem extends Component {
  state = {
    showModat: true,
  };

  onModal = () => {
    this.setState(preS => {
      return { showModat: !preS.showModat };
    });
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    if (this.state.showModat) {
      return (
        <li onClick={this.onModal} className={s.item}>
          <img className={s.img} src={webformatURL} alt={tags} />
        </li>
      );
    } else {
      return (
        <Modal onClose={this.onModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      );
    }
  }
}
