import { RotatingLines } from 'react-loader-spinner';
import s from './loader.module.css';
export default function Loader() {
  return (
    <div className={s.loader}>
      <RotatingLines width="100" strokeColor="#FF5733" />
    </div>
  );
}
