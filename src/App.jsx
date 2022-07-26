import { useState, useEffect } from 'react';
import Api from './services/Api';
import Searchbar from './components/Searchbar';
import { ImageGallery } from './components/ImageGallery';
import Loader from './components/Loader';
import { Button } from './components/Button';
import Modal from './components/Modal';
import Notiflix from 'notiflix';

export default function App() {
  const [images, setImages] = useState([]);
  const [largeImage, setLargeImage] = useState(null);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const options = { value, page };

    if (!value) {
      return;
    }

    setLoading(true);
    if (page === 1) {
      Api(options)
        .then(images => {
          if (images.hits.length === 0) {
            setError(value);
          }
          setImages(images.hits);
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }

    if (setPage !== page && page !== 1) {
      setLoading(() => true);

      Api(options)
        .then(images => {
          setImages(state => [...state, ...images.hits]);
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }
  }, [page, value]);

  const handleSubmit = value => {
    setValue(value);
    setPage(1);
    setError(null);
  };

  const toggleModal = () => {
    setShowModal(state => !state);
  };

  const onClose = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      toggleModal();
    }
  };

  const handleClickImage = largeImage => {
    toggleModal();
    setLargeImage(largeImage);
  };

  const handleLoadMore = () => {
    setPage(state => state + 1);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      {images && <ImageGallery images={images} largeImage={handleClickImage} />}
      {loading && <Loader />}
      {images.length !== 0 &&
        (loading ? <Loader /> : <Button onClick={handleLoadMore} />)}
      {showModal && <Modal onClose={onClose}>{largeImage}</Modal>}
      {error &&
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        )}
    </div>
  );
}
