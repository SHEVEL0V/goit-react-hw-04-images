import React, { Component } from 'react';
import axios from 'axios';
import s from './ImageGalery.module.css';
import Loader from '../Loader/loader';
import Button from '../Button/button';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  state = {
    cards: [],
    cardsAll: [],
    status: 'idle',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.props;
    const { page } = this.state;

    if (prevProps.value !== value) {
      this.setState({ status: 'pending', page: 1, cardsAll: [] });
      this.fechApi(value, page);
    }
    if (prevProps.value === value && prevState.page !== page) {
      this.fechApi(value, page);
    }
  }

  onLoadMore = () => {
    this.setState(prevS => {
      const incremetPage = 1;
      return { page: prevS.page + incremetPage };
    });
  };

  fechApi(value, page) {
    const KEY = '26773095-8033af7b4c44df434cdac5aab';
    const per_page = 12;

    axios
      .get(
        `https://pixabay.com/api/?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`,
      )
      .then(res => this.renderCards(res))
      .catch(error => console.log(error));
  }

  renderCards = res => {
    const cards = res.data.hits;
    if (cards.length === 0) {
      return this.setState({ status: 'rejected' });
    } else {
      return this.setState(preS => {
        const cardsAll = [...preS.cardsAll, ...cards];
        return { cards, cardsAll, status: 'resolved' };
      });
    }
  };

  render() {
    const { cards, cardsAll, status } = this.state;
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
            {cardsAll.map(el => (
              <ImageGalleryItem
                key={el.id}
                webformatURL={el.webformatURL}
                largeImageURL={el.largeImageURL}
                tags={el.tags}
              />
            ))}
          </ul>
          {cards.length === 12 && <Button onClick={this.onLoadMore} />}
        </div>
      );
    }
    if (status === 'rejected') {
      return <h1>Результат запиту не знайдений!</h1>;
    }
  }
}

export default ImageGallery;
