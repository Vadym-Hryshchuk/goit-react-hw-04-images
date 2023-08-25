import { ModalImage } from 'components/Modal/Modal';
import { useState } from 'react';

export const ImageGalleryItem = ({ image }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <img
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => {
          setIsOpen(true);
        }}
      />
      <ModalImage
        onOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <img src={image.largeImageURL} alt={image.tags} />
      </ModalImage>
    </>
  );
};
