import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ link, tags, hide }) => {
  useEffect(() => {
    document.addEventListener(`keydown`, handleClose);
    return () => document.removeEventListener(`keydown`, handleClose);
  });

  const handleClose = event => {
    if (event.code === 'Escape' || event.target === event.currentTarget) {
      hide();
    }
  };
  return (
    <div className={css.backdrop} onClick={handleClose}>
      <img className={css.modal} src={link} alt={tags} />
    </div>
  );
};

Modal.propTypes = {
  link: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  hide: PropTypes.func.isRequired,
};
