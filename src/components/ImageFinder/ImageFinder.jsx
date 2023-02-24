import { Searchbar } from 'components/SearchBar/SearchBar';
import { useState, useEffect } from 'react';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { searchImages } from 'api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ImageFinder = () => {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [imageLink, setImageLink] = useState(null);
  const [imageTags, setImageTags] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState(null);

  const notify = () =>
    toast.warn('Search field must contain something to show results!', {
      position: toast.POSITION.TOP_CENTER,
      theme: 'colored',
      autoClose: 2500,
      pauseOnHover: false,
    });

  useEffect(() => {
    async function getResponse() {
      try {
        setStatus('pending');

        const response = await searchImages(search, page);
        const newImages = response.data.hits.map(
          ({ id, previewURL, webformatURL, tags }) => {
            return {
              id,
              previewURL,
              webformatURL,
              tags,
            };
          }
        );
        setImages(prevState => [...prevState, ...newImages]);
        setStatus('resolved');
        setTotalHits(response.data.totalHits);
        return;
      } catch (error) {
        setStatus(`rejected`);
        setError(error.message || 'Sorry, something gone wrong!');
      }
    }

    if (search) {
      getResponse();
    }
  }, [search, page]);

  const addNewSearchValue = value => {
    if (value.trim() !== search && value.trim() !== '') {
      setSearch(value.trim());
      setImages([]);
      setPage(1);
    }
    if (value.trim() === '') {
      notify();
    }
  };

  const showModal = (url, tags) => {
    setModal(true);
    setImageLink(url);
    setImageTags(tags);
  };

  const hideModal = () => {
    setModal(false);
    setImageLink(null);
  };

  const setCurrentPage = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <Searchbar onSubmit={addNewSearchValue} />
      {images.length !== 0 && (
        <ImageGallery data={images} showModal={showModal} />
      )}
      {status === 'resolved' &&
        images.length > 0 &&
        totalHits !== images.length && <Button setPage={setCurrentPage} />}
      {status === 'resolved' && images.length === 0 && (
        <p>No images matching your search criteria were found</p>
      )}
      {status === 'pending' && <Loader />}
      {modal && <Modal link={imageLink} tags={imageTags} hide={hideModal} />}
      {status === 'rejected' && <p>{error}</p>}
      <ToastContainer />
    </>
  );
};
