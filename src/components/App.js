import React, { useState } from 'react';
import Container from './container/container';
import Searchbar from './Searchbar/searchbar';
import ImageGallery from './ImageGallery/imageGallery';

export default function App() {
  const [valueInput, setValueInput] = useState('');

  const onSubmit = value => {
    setValueInput(value);
  };

  return (
    <Container>
      <Searchbar submit={onSubmit} />
      <ImageGallery valueInput={valueInput} />
    </Container>
  );
}
