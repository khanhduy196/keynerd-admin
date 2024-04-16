import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FormWithQuestion } from "types/form";
import {
  getDateFieldValue,
  getDateTime,
  getInitialDueDate,
} from "utils/due-date-form";
import {
  AsyncDropdown,
  Button,
  DateField,
  DropdownField,
} from "components/common/forms";
import { DropdownProps } from "components/common/forms/DropdownField";
import {
  SendOutPeerFormData,
  SendOutPeerRequest,
} from "types/feedback-request";
import { MultiValue, SingleValue } from "react-select";
import { IMultipleChoiceOption } from "types/input.type";
import { ConfirmModal } from "components/common/modals";
import { User } from "types/user";
import { FieldErrors } from "types/field-errors.type";
import { sendOutPeerSchema } from "schemas";
import { ValidationUtil } from "utils";
import { toastError } from "utils/toast";

type SendOutPeerFormProps = {
  formOptions: DropdownProps["options"];
  selectedForm: FormWithQuestion;
  onSelectForm: ChangeEventHandler<HTMLSelectElement>;
  onSubmit: (data: SendOutPeerRequest) => void;
  isSubmitting?: boolean;
  onSearchUser: (searchText: string) => Promise<User[]>;
};

const SendOutPeerForm: React.FC<SendOutPeerFormProps> = ({
  formOptions,
  selectedForm,
  onSelectForm,
  onSubmit,
  isSubmitting,
  onSearchUser,
}) => {
  const [formData, setFormData] = useState<SendOutPeerFormData>(() => ({
    formId: selectedForm.id,
    reviewerIds: [],
    dueDate: getInitialDueDate(),
  }));

  const [validationError, setValidationError] = useState<
    FieldErrors<SendOutPeerFormData>
  >({});

  const [showConfirmSendModal, setShowConfirmSendModal] = useState(false);

  const { formId, revieweeId, reviewerIds, dueDate } = formData;

  useEffect(() => {
    const newFormData = {
      ...formData,
      formId: selectedForm.id,
    };

    setFormData(newFormData);
  }, [selectedForm.id]);

  const handleChangeReviewee = (
    selectedOption: SingleValue<IMultipleChoiceOption>
  ) => {
    let newValue: number | undefined;

    if (selectedOption) {
      newValue = +selectedOption.value;
    }

    const newFormData = {
      ...formData,
      revieweeId: newValue,
    };

    setFormData(newFormData);
  };

  const handleChangeReviewers = (
    selectedOptions: MultiValue<IMultipleChoiceOption>
  ) => {
    const newReviewers = selectedOptions.map(({ value }) => +value);

    const newFormData = {
      ...formData,
      reviewerIds: newReviewers,
    };

    setFormData(newFormData);
  };

  const handleChangeDueDate = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const newDueDate: Date = getDateTime(value);

    const newFormData = {
      ...formData,
      dueDate: newDueDate,
    };

    setFormData(newFormData);
  };

  const handleSubmit = () => {
    onSubmit(formData as SendOutPeerRequest);
    handleCloseConfirmModal();
  };

  const validateForm = () => {
    const { error } = sendOutPeerSchema.validate(formData);

    if (error) {
      const newValidationError = ValidationUtil.transformValidationError(error);
      setValidationError(newValidationError);
      toastError(error.message);
      return false;
    }

    return true;
  };

  const handleShowConfirmSendModal = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setShowConfirmSendModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmSendModal(false);
  };

  const handleSearchReviewer = useCallback(
    async (searchText: string) => {
      const users = await onSearchUser(searchText);

      const options = users.map<IMultipleChoiceOption>(({ email, id }) => ({
        label: email,
        value: id,
        isDisabled: id === revieweeId,
      }));

      return options;
    },
    [revieweeId]
  );

  const handleSearchReviewee = useCallback(
    async (searchText: string) => {
      const users = await onSearchUser(searchText);

      const options = users.map<IMultipleChoiceOption>(({ email, id }) => ({
        label: email,
        value: id,
        isDisabled: reviewerIds.includes(id),
      }));

      return options;
    },
    [reviewerIds]
  );

  const handleClearErrorValidation = () => {
    setValidationError({});
  };

  return (
    <form
      className="flex-1 flex flex-col gap-8"
      onSubmit={handleShowConfirmSendModal}
    >
      <div className="flex flex-col gap-6">
        <DropdownField
          label="Choose your form"
          options={formOptions}
          value={String(formId)}
          id="formSelect"
          name="formId"
          onChange={onSelectForm}
          errorMessage={validationError?.formId}
          onClearError={handleClearErrorValidation}
        />
        <AsyncDropdown<false>
          id="reviewee"
          label="Reviewee"
          hint="Please enter the email of the person whose feedback is given to"
          onChange={handleChangeReviewee}
          request={handleSearchReviewee}
          errorMessage={validationError?.revieweeId}
          onClearError={handleClearErrorValidation}
        />

        <AsyncDropdown<true>
          isMulti
          id="reviewers"
          label="Choose your reviewer(s)"
          onChange={handleChangeReviewers}
          request={handleSearchReviewer}
          errorMessage={validationError?.reviewerIds}
          onClearError={handleClearErrorValidation}
        />

        <DateField
          id="form-due-date"
          label="Deadline"
          hint="Deadline for this survey"
          value={getDateFieldValue(dueDate)}
          onChange={handleChangeDueDate}
          name="dueDate"
          errorMessage={validationError?.dueDate}
          onClearError={handleClearErrorValidation}
        />
      </div>

      <Button label="Send" className="w-full" type="submit" size="large" />
      <ConfirmModal
        open={showConfirmSendModal}
        title="Send out form"
        content="Are you sure you want to send this form to users?"
        yesButton="Yes"
        noButton="No"
        onYes={handleSubmit}
        onNo={handleCloseConfirmModal}
        yesButtonLoading={isSubmitting}
      />
    </form>
  );
};

export default SendOutPeerForm;
