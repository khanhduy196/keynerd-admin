type GalleryItemProps = {
  photo: string;
};

const Gallery: React.FC<GalleryItemProps> = ({ photo }) => {
  return (
    <div
      className="border border-neutral-25 bg-neutral-20 h-[200px] flex justify-center"
      key={photo}
    >
      <img src={photo} alt="" />
    </div>
  );
};
export default Gallery;
