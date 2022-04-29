import React, { Component } from "react";
import axios from "axios";
import s from "./ImageGalery.module.css";
import Loader from "../Loader/loader";
import Button from "../Button/button";

import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

class ImageGallery extends Component {
  state = {
    cards: [],
    cardsAll: [],
    status: "idle",
    error: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.props;
    const { page } = this.state;

    if (prevProps.value !== value) {
      this.setState({ status: "pending", page: 1, cardsAll: [] });
      this.fechApi(value, page);
    }
    if (prevProps.value === value && prevState.page !== page) {
      this.fechApi(value, page);
    }
  }
  s;

  onLoadMore = () => {
    this.setState((prevState) => {
      return { page: prevState.page + 1 };
    });
  };

  fechApi(value, page) {
    const KEY = "26773095-8033af7b4c44df434cdac5aab";
    const per_page = 12;

    axios
      .get(
        `https://pixabay.com/api/?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`
      )
      .then((res) => this.onSetState(res))
      .catch((error) => this.setState({ status: "rejected", error }));
  }

  onSetState = (res) => {
    console.log(res.data.hits);
    const cards = res.data.hits;
    return this.setState((preS) => {
      const cardsAll = [...preS.cardsAll, ...cards];
      return { cards, cardsAll, status: "resolved" };
    });
    // }
  };

  render() {
    const { cards, cardsAll, status } = this.state;
    if (status === "idle") {
      return <h1>Введіть запит пошуку.</h1>;
    }
    if (status === "pending") {
      return <Loader />;
    }
    if (status === "resolved") {
      return (
        <ul className={s.galery}>
          {cardsAll.map((el) => (
            <ImageGalleryItem
              key={el.id}
              webformatURL={el.webformatURL}
              largeImageURL={el.largeImageURL}
            />
          ))}
          {cards.length === 12 && <Button onClick={this.onLoadMore} />}
        </ul>
      );
    }
    if (status === "rejected") {
      <h1>{this.state.error}</h1>;
    }
  }
}

export default ImageGallery;
