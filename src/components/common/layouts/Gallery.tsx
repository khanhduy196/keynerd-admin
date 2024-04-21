type GalleryProps = {
  photos: string[];
};

const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {photos.map((photo) => {
        return (
          <div
            className="border border-neutral-25 bg-neutral-20 h-[200px] flex justify-center"
            key={photo}
          >
            <img src={photo} alt="" />
          </div>
        );
      })}
    </div>
  );
};
export default Gallery;
