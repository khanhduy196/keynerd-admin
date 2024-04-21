import { CameraIcon } from "components/icons";
import { ChangeEvent, useRef, useState } from "react";
import cx from "classnames";

type UploadImageProps = {
  label?: string;
  hint?: string;
  onChange: (files: File[]) => void;
  className?: string;
  onClearError?: () => void;
  errorMessage?: string;
};

const UploadImage: React.FC<UploadImageProps> = ({
  label,
  hint,
  onChange,
  onClearError,
  errorMessage,
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
      onChange(fileList);
    } else {
      setImages([]);
      onChange([]);
    }
  };
  const uploadBtnOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (onClearError) {
      onClearError();
    }
    uploadImageBtn.current?.click();
  };
  return (
    <div className="flex flex-col gap-1">
      <div className="mb-2 flex flex-col">
        {label && (
          <label
            htmlFor="upload-image-btn"
            className="body-16-semibold text-neutral-200"
          >
            {label}
          </label>
        )}
        <span className="body-12-regular text-neutral-50">{hint}</span>
      </div>
      <div className="grid grid-cols-5 gap-4">
        <button
          className={cx(
            "border border-neutral-25 h-[200px] flex flex-col justify-center items-center",
            {
              "border border-state-error-100": errorMessage,
            }
          )}
          onClick={uploadBtnOnClick}
        >
          <CameraIcon className="w-6 h-6" />
          <span className="body-14-regular text-neutral-200">Add a photo</span>
        </button>
        {images.map((image) => {
          return (
            <div
              className="border border-neutral-25 bg-neutral-20 h-[200px] flex justify-center"
              key={image}
            >
              <img src={image} alt="" />
            </div>
          );
        })}
      </div>

      <input
        multiple
        ref={uploadImageBtn}
        type="file"
        id="upload-image-btn"
        onChange={uploadImagesOnChange}
        onFocus={onClearError}
        className="hidden"
      />
    </div>
  );
};

export default UploadImage;
