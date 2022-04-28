import s from "./imageGalegyItems.module.css";

export default function ImageGalleryItem({ webformatURL, largeImageURL }) {
  return (
    <li className={s.item}>
      <img src={webformatURL} alt="" />
    </li>
  );
}
