import React, { Component } from "react";
import axios from "axios";
import s from "./ImageGalery.module.css";
import Loader from "../Loader/loader";
import Button from "../Button/button";

import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

class ImageGallery extends Component {
  state = {
    cards: [],
    status: "idle",
    error: null,
    page: 1,
  };

  componentDidUpdate(prevP, prevS) {
    const { value } = this.props;
    const { page } = this.state;
    if (prevP.value !== value || prevS.page !== page) {
      this.setState({ status: "pending" });
      this.fechApi(value, page);
    }
  }

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
      .then((res) => {
        const cards = res.data.hits;

        return this.setState({ cards, status: "resolved" });
      })
      .catch((error) => this.setState({ status: "rejected", error }));
  }

  render() {
    const { cards, status, page } = this.state;
    console.log(page);
    if (status === "idle") {
      return <h1>card</h1>;
    }
    if (status === "pending") {
      return <Loader />;
    }
    if (status === "resolved") {
      return (
        <ul className={s.galery}>
          {cards.map((el) => (
            <ImageGalleryItem
              key={el.id}
              webformatURL={el.webformatURL}
              largeImageURL={el.largeImageURL}
            />
          ))}
          <Button onClick={this.onLoadMore} />
        </ul>
      );
    }
    if (status === "rejected") {
      <h1>{this.state.error}</h1>;
    }
  }
}

export default ImageGallery;
