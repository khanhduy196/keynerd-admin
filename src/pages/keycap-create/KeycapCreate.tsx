import { BackButton, Button, TextField } from "components/common/forms";
import UploadImage from "components/common/forms/UploadImage";

import { Layout, LoadingWrapper, PageTitle } from "components/common/layouts";
import CreateKeycapDetailForm from "components/keycap/CreateKeycapDetailForm";
import { PAGE_PATHS } from "constants/page-paths";
import { KeycapProfile } from "enums/keycap";
import { useHttpMutationService } from "hooks";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createKeycapSchema } from "schemas/create-keycap-schema";
import KeycapService from "services/keycap.service";
import { FieldErrors } from "types/field-errors.type";
import {
  CreateKeycapDetailRequest,
  CreateKeycapRequest,
} from "types/keycap.type";
import { ValidationUtil } from "utils";
import { toastError, toastSuccess } from "utils/toast";

const INITAL_KEYCAP_DETAIL_FORM: CreateKeycapDetailRequest = {
  key: -Date.now(),
  profile: KeycapProfile.SA,
  size: 1,
};

const INITAL_FORM: CreateKeycapRequest = {
  name: "",
  details: [INITAL_KEYCAP_DETAIL_FORM],
  photos: [],
};

const KeycapCreate = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<CreateKeycapRequest>(INITAL_FORM);
  const [validationError, setValidationError] = useState<
    FieldErrors<CreateKeycapRequest>
  >({});
  const { mutate, isLoading } = useHttpMutationService({
    request: (data?: CreateKeycapRequest) => KeycapService.create(data!),
  });

  const fieldOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue: CreateKeycapRequest = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(newValue);
  };

  const photosOnChange = (files: File[]) => {
    setForm({
      ...form,
      photos: files,
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error, value: validatedData } = createKeycapSchema.validate(form);

    if (error) {
      const newValidationError =
        ValidationUtil.transformValidationError<CreateKeycapRequest>(error);
      setValidationError(newValidationError);
      toastError(error.message);
      return;
    }

    const response = await mutate(validatedData);

    if (response) {
      toastSuccess("Keycap is created successfully!");
      navigate(PAGE_PATHS.KEYCAP);
    }
  };

  const handleClearErrorValidation = () => {
    setValidationError({});
  };

  const handleChangeDetails = (details: CreateKeycapDetailRequest[]) => {
    const newValues: CreateKeycapRequest = {
      ...form,
      details,
    };
    setForm(newValues);
  };
  const handleAddKeycapDetail = () => {
    setForm({
      ...form,
      details: [
        ...form.details,
        { ...INITAL_KEYCAP_DETAIL_FORM, key: -Date.now() },
      ],
    });
  };

  const handleRemoveKeycapDetail = (index: number) => {
    const newDetails = [...form.details];
    newDetails.splice(index, 1);
    handleChangeDetails(newDetails);
  };

  const handleChangeKeycapDetail = (
    value: CreateKeycapDetailRequest,
    index: number
  ) => {
    const newDetails = [...form.details];
    newDetails[index] = { ...value };
    handleChangeDetails(newDetails);
  };

  return (
    <Layout>
      <LoadingWrapper isLoading={false}>
        <div className="w-full h-fit pb-8">
          <div className="flex gap-6 items-center mb-6">
            <BackButton className="text-neutral-200" />
            <PageTitle>Create Keycap</PageTitle>
          </div>
          <div className="flex gap-8">
            <form className="flex-1 flex flex-col gap-4" onSubmit={onSubmit}>
              <UploadImage
                label="Photos"
                onChange={photosOnChange}
                errorMessage={validationError.photos?.toString()}
                onClearError={handleClearErrorValidation}
              />
              <TextField
                id="name"
                label="Name"
                name="name"
                value={form.name}
                errorMessage={validationError.name}
                onChange={fieldOnChange}
                onClearError={handleClearErrorValidation}
              />
              {form.details.map((detail, index) => {
                return (
                  <CreateKeycapDetailForm
                    onChange={handleChangeKeycapDetail}
                    value={detail}
                    index={index}
                    key={detail.key}
                    onRemove={handleRemoveKeycapDetail}
                    canRemove={form.details.length > 1}
                  />
                );
              })}

              <div className="flex justify-between gap-6 mt-12">
                <Button
                  label="Add detail"
                  type="button"
                  variant="secondary"
                  className="flex-1 h-full"
                  onClick={handleAddKeycapDetail}
                />
                <Button
                  disabled={isLoading}
                  label="Save"
                  type="submit"
                  className="flex-1 h-full"
                />
              </div>
            </form>
          </div>
        </div>
      </LoadingWrapper>
    </Layout>
  );
};
export default KeycapCreate;
