import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { fetchImage } from '../api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './Button/Button';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query === '') return;

    const getImages = async () => {
      setLoading(true);
      try {
        const { hits } = await fetchImage(query, page);

        if (hits.length === 0) {
          toast.error('Nothing was found for your query');
          return;
        }
        const images = hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );
        setImages(prevImages => [...prevImages, ...images]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getImages();
  }, [page, query]);

  const handleSubmit = evt => {
    const notify = () => toast.error('Hey! Enter a some query!');

    evt.preventDefault();
    const query = evt.target.elements.query.value;
    query.trim() === '' ? notify() : changeQuery(query);

    evt.target.reset();
  };
  const changeQuery = newQuery => {
    if (newQuery !== query) {
      setQuery(newQuery);
      setImages([]);
      setPage(1);
    }
  };
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />

      {images.length > 0 && <ImageGallery images={images} />}
      {loading && <Loader />}
      {images.length > 0 && !loading && <LoadMore onClick={handleLoadMore} />}
      <Toaster />
    </>
  );
};
