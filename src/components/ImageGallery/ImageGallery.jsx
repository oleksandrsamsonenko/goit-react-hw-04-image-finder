import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ data, showModal }) => {
  const elements = data.map(item => {
    return (
      <ImageGalleryItem
        key={item.id}
        id={item.id}
        preview={item.previewURL}
        fullImage={item.webformatURL}
        tags={item.tags}
        showModal={showModal}
      />
    );
  });
  return <ul className={css.list}>{elements}</ul>;
};

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      previewURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  showModal: PropTypes.func.isRequired,
};
