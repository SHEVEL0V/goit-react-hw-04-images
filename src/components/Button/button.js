import s from './button.module.css';

export default function Button({ onClick }) {
  return (
    <button className={s.Button} type="button" onClick={onClick}>
      load more
    </button>
  );
}
