import { Button, DropdownField } from "components/common/forms";
import UploadFile from "components/common/forms/UploadFile";
import { DeleteIcon } from "components/icons";

type CreateKeycapDetailFormProps = {
  index: number;
};

const QUESTION_TYPE_OPTIONS = {
  1: "Multiple Choice",
  2: "Free Text",
};

const CreateKeycapDetailForm: React.FC<CreateKeycapDetailFormProps> = ({
  index,
}) => {
  return (
    <div className="grid grid-cols-10 gap-4">
      <div className="col-span-3">
        <DropdownField
          id={`detail-profile-1`}
          label={index === 0 ? "Profile" : ""}
          options={QUESTION_TYPE_OPTIONS}
          name="profile"
        />
      </div>
      <div className="col-span-3">
        <DropdownField
          id={`detail-size-1`}
          label={index === 0 ? "Size" : ""}
          options={QUESTION_TYPE_OPTIONS}
          name="size"
        />
      </div>
      <div className="col-span-3">
        <UploadFile
          id={`detail-file-1`}
          label={index === 0 ? "File" : ""}
          name="file"
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="mb-2 flex flex-col text-end">
          {index === 0 && (
            <p className="body-16-semibold text-neutral-200">Icons</p>
          )}
        </div>
        <div className="text-end">
          <Button variant="danger" size="small">
            <DeleteIcon className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CreateKeycapDetailForm;
