import {
  ChangeEvent,
  ChangeEventHandler,
  InputHTMLAttributes,
  useRef,
  useState,
} from "react";

type UploadImageProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label?: string;
  hint?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  onClearError?: () => void;
};

const UploadImage: React.FC<UploadImageProps> = ({
  id,
  label,
  hint,
  value,
  onChange,
  name = id,
  onClearError,
}) => {
  const [images, setImages] = useState<string[]>([]);
  const uploadImageBtn = useRef<HTMLInputElement>(null);

  const uploadImagesOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileList = [];
      for (const file of files) {
        fileList.push(file);
      }
      setImages(fileList.map((file) => URL.createObjectURL(file)));
    } else {
      setImages([]);
    }
  };
  const uploadBtnOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    uploadImageBtn.current?.click();
  };
  return (
    <div className="flex flex-col gap-1">
      <div className="mb-2 flex flex-col">
        {label && (
          <label htmlFor={id} className="body-16-semibold text-neutral-200">
            {label}
          </label>
        )}
        <span className="body-12-regular text-neutral-50">{hint}</span>
      </div>
      <div className="grid grid-cols-5 gap-4">
        <button
          className="border border-neutral-25 h-[200px] flex"
          onClick={uploadBtnOnClick}
        >
          <span className="body-14-regular m-auto text-neutral-200">
            Add a photo
          </span>
        </button>
        {images.map((image) => {
          return (
            <div className="h-[200px] flex" key={image}>
              <img src={image} alt="" />
            </div>
          );
        })}
      </div>

      <input
        multiple
        ref={uploadImageBtn}
        type="file"
        id={id}
        value={value}
        name={name}
        onChange={uploadImagesOnChange}
        onFocus={onClearError}
        className="hidden"
      />
    </div>
  );
};

export default UploadImage;
