import React, { Component } from "react";
import axios from "axios";

import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

class ImageGallery extends Component {
  state = {
    ObjApi: null,
  };

  componentDidUpdate(prevP, prevS) {
    if (prevP.value !== this.props.value) {
      this.fechApi(this.props.value);
    }
  }

  fechApi(value = "dog", page = 1) {
    const KEY = "26773095-8033af7b4c44df434cdac5aab";
    const per_page = 12;

    axios
      .get(
        `https://pixabay.com/api/?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`
      )
      .then((res) => {
        console.log(res);
        return this.setState({ ObjApi: res });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { ObjApi } = this.state;
    // const cards = ObjApi.data.hits;

    console.log(ObjApi);
    return (
      <ul className="gallery">
        {/* {ObjApi.map((el) => (
          <ImageGalleryItem />
        ))} */}
      </ul>
    );
  }
}

export default ImageGallery;
