import { ChangeEventHandler, FormEvent, useMemo, useState } from "react";
import { FormWithQuestion } from "types/form";
import { getDateFieldValue } from "utils/due-date-form";
import { Button, DateField, DropdownField } from "components/common/forms";
import { DropdownProps } from "components/common/forms/DropdownField";
import { SendOut360Request } from "types/feedback-request";
import { ConfirmModal } from "components/common/modals";
import { FieldErrors } from "types/field-errors.type";
import { toastError } from "utils/toast";
import { sendOut360Schema } from "schemas";
import { ValidationUtil } from "utils";

type SendOut360FormProps = {
  formOptions: DropdownProps["options"];
  selectedForm: FormWithQuestion;
  onSelectForm: ChangeEventHandler<HTMLSelectElement>;
  onSubmit: (data: SendOut360Request) => Promise<void>;
  isSubmitting?: boolean;
};

const SendOut360Form: React.FC<SendOut360FormProps> = ({
  formOptions,
  selectedForm,
  onSelectForm,
  onSubmit,
  isSubmitting,
}) => {
  const [showConfirmSendModal, setShowConfirmSendModal] = useState(false);
  const [validationError, setValidationError] = useState<
    FieldErrors<SendOut360Request>
  >({});

  const formId = selectedForm.id;

  const dueDate = useMemo(() => {
    return selectedForm?.dueDate;
  }, [formId]);

  const handleSubmit = async () => {
    await onSubmit({ formId });
    handleCloseConfirmModal();
  };

  const validateForm = () => {
    const { error } = sendOut360Schema.validate({ formId });

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
          value={String(selectedForm.id)}
          id="formSelect"
          name="form-select"
          onChange={onSelectForm}
          errorMessage={validationError.formId}
          onClearError={handleClearErrorValidation}
        />

        {dueDate && (
          <DateField
            id="form-due-date"
            label="Deadline"
            hint="Deadline for this survey"
            value={getDateFieldValue(dueDate)}
            name="dueDate"
            disabled
          />
        )}
      </div>

      <Button
        label="Send to All"
        className="w-full"
        type="submit"
        size="large"
      />

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

export default SendOut360Form;
