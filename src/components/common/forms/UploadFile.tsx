import {
  ChangeEvent,
  useRef,
  useState,
} from "react";
import Button from "./Button";
import { UploadIcon } from "components/icons";

const NO_FILE_CHOSEN = "No file chosen";

type UploadFileProps = {
  id: string;
  label?: string;
  hint?: string;
  value?: string;
  onChange: (file: File | undefined) => void;
  className?: string;
  onClearError?: () => void;
};

const UploadFile: React.FC<UploadFileProps> = ({
  id,
  label,
  hint,
  value,
  onChange,

  onClearError,
  ...inputAttributes
}) => {
  const uploadFileBtn = useRef<HTMLInputElement>(null);
  const [selectectFileName, setSelectectFileName] = useState(NO_FILE_CHOSEN);
  const uploadFilesOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setSelectectFileName(selectedFile.name);
      onChange(selectedFile);
    } else {
      setSelectectFileName(NO_FILE_CHOSEN);
      onChange(undefined);
    }
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
      <div className="flex">
        <Button
          label="Upload"
          onClick={() => uploadFileBtn.current?.click()}
          type="button"
          variant="form"
          className="flex mr-2"
          Icon={UploadIcon}
        />
        <span className="body-14-regular my-auto text-neutral-200">
          {selectectFileName}
        </span>
      </div>

      <input
        ref={uploadFileBtn}
        type="file"
        id={id}
        value={value}
        onChange={uploadFilesOnChange}
        className="hidden"
        onFocus={onClearError}
        {...inputAttributes}
      />
    </div>
  );
};

export default UploadFile;
