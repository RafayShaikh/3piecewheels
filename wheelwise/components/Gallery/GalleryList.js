import GalleryItem from './GalleryItem';

function GalleryList({ items }) {
  return (
    <>
      {items?.map(
        (item) => item && <GalleryItem key={item.description} item={item} />
      )}
    </>
  );
}

export default GalleryList;
