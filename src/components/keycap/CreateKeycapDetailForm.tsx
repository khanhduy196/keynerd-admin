import { Button, DropdownField } from "components/common/forms";
import UploadFile from "components/common/forms/UploadFile";
import { DeleteIcon } from "components/icons";
import { ChangeEvent } from "react";
import { OptionItem } from "types/common";
import { CreateKeycapDetailRequest } from "types/keycap.type";

type CreateKeycapDetailFormProps = {
  index: number;
  onRemove: (index: number) => void;
  value: CreateKeycapDetailRequest;
  onChange: (value: CreateKeycapDetailRequest, index: number) => void;
};

const PROFILES: OptionItem[] = [
  {
    value: "SA",
    display: "SA",
  },
  {
    value: "OEM",
    display: "Oem",
  },
  {
    value: "CUBE",
    display: "Cube",
  },
  {
    value: "SHORTSA",
    display: "Short SA",
  },
];

const SIZES: OptionItem[] = [
  {
    value: "1",
    display: "1",
  },
  {
    value: "2",
    display: "2",
  },
  {
    value: "2.5",
    display: "2.5",
  },
];

const CreateKeycapDetailForm: React.FC<CreateKeycapDetailFormProps> = ({
  index,
  onRemove,
  value,
  onChange,
}) => {
  const { profile, size } = value;

  const fileOnChange = (file: File | undefined) => {
    onChange(
      {
        ...value,
        file,
      },
      index
    );
  };

  const fieldOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValue: CreateKeycapDetailRequest = {
      ...value,
      [e.target.name]: e.target.value,
    };
    onChange(newValue, index);
  };

  return (
    <div className="grid grid-cols-10 gap-4">
      <div className="col-span-3">
        <DropdownField
          onChange={fieldOnChange}
          value={profile}
          id="profile"
          label={index === 0 ? "Profile" : ""}
          options={PROFILES}
          name="profile"
        />
      </div>
      <div className="col-span-3">
        <DropdownField
          onChange={fieldOnChange}
          value={size.toString()}
          id="size"
          label={index === 0 ? "Size" : ""}
          options={SIZES}
          name="size"
        />
      </div>
      <div className="col-span-3">
        <UploadFile
          onChange={fileOnChange}
          id={`detail-file-1`}
          label={index === 0 ? "File" : ""}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="mb-2 flex flex-col text-end">
          {index === 0 && (
            <p className="body-16-semibold text-neutral-200">Icons</p>
          )}
        </div>
        <div className="text-end">
          <Button variant="danger" size="small" onClick={() => onRemove(index)}>
            <DeleteIcon className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CreateKeycapDetailForm;
