import { BackButton, Button, TextField } from "components/common/forms";
import { Layout, LoadingWrapper, PageTitle } from "components/common/layouts";
import CreateKeycapDetailForm from "components/keycap/CreateKeycapDetailForm";
import { PAGE_PATHS } from "constants/page-paths";
import { KeycapProfile } from "enums/keycap";
import {
  useError,
  useHttpMutationService,
  useHttpQueryService,
  useNumericParam,
} from "hooks";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { KeycapDetailViewItem, KeycapViewItem } from "responses/keycap-response";
import KeycapService from "services/keycap.service";
import { FieldErrors } from "types/field-errors.type";
import {
  UpdateKeycapDetailRequest,
  UpdateKeycapRequest,
} from "types/keycap.type";

import { toastSuccess } from "utils/toast";

const INITAL_KEYCAP_DETAIL_FORM: UpdateKeycapDetailRequest = {
  id: 0,
  key: -Date.now(),
  profile: KeycapProfile.SA,
  size: 1,
};

const INITAL_FORM: UpdateKeycapRequest = {
  id: 0,
  name: "",
  details: [INITAL_KEYCAP_DETAIL_FORM],
};

const KeycapUpdate = () => {
  const id = useNumericParam("id");

  const {
    result: keycap,
    error: gettingKeycapError,
    isLoading: isGettingKeycapLoading,
  } = useHttpQueryService<KeycapViewItem>({
    request: () => KeycapService.getById(id),
  });

  const {
    result: usedDetails,
    error: gettingUsedDetailsError,
    isLoading: isGettingUsedDetailsLoading,
  } = useHttpQueryService<KeycapDetailViewItem[]>({
    request: () => KeycapService.getUsedDetailsOfKeycap(id),
  });

  useError(gettingUsedDetailsError, true);
  useError(gettingKeycapError, true);

  const navigate = useNavigate();
  const [form, setForm] = useState<UpdateKeycapRequest>(INITAL_FORM);
  const [validationError, setValidationError] = useState<
    FieldErrors<UpdateKeycapRequest>
  >({});

  const { mutate, isLoading } = useHttpMutationService({
    request: (data?: UpdateKeycapRequest) => KeycapService.update(data!),
  });

  useEffect(() => {
    if (keycap) {
      setForm({
        id: keycap.id,
        name: keycap.name,
        details: keycap.details.map<UpdateKeycapDetailRequest>((detail) => ({
          ...detail,
          key: -Math.random()
        }))
      });
    }
  }, [keycap]);

  const fieldOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue: UpdateKeycapRequest = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(newValue);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const { error, value: validatedData } = createKeycapSchema.validate(form);

    // if (error) {
    //   const newValidationError =
    //     ValidationUtil.transformValidationError<UpdateKeycapRequest>(error);
    //   setValidationError(newValidationError);
    //   toastError(error.message);
    //   return;
    // }

    const response = await mutate(form);

    if (response) {
      toastSuccess("Keycap is updated successfully!");
      navigate(PAGE_PATHS.KEYCAP);
    }
  };

  const handleClearErrorValidation = () => {
    setValidationError({});
  };

  const handleChangeDetails = (details: UpdateKeycapDetailRequest[]) => {
    const newValues: UpdateKeycapRequest = {
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
    value: UpdateKeycapDetailRequest,
    index: number
  ) => {
    const newDetails = [...form.details];
    newDetails[index] = { ...value };
    handleChangeDetails(newDetails);
  };

  return (
    <Layout>
      <LoadingWrapper isLoading={isGettingKeycapLoading || isGettingUsedDetailsLoading}>
        <div className="w-full h-fit pb-8">
          <div className="flex gap-6 items-center mb-6">
            <BackButton className="text-neutral-200" />
            <PageTitle>Update Keycap</PageTitle>
          </div>
          <div className="flex gap-8">
            <form className="flex-1 flex flex-col gap-4" onSubmit={onSubmit}>
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
                    canRemove={form.details.length > 1 && !(usedDetails ?? []).find(
                      (n) => n.id === detail.id
                    )}
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
                  label="Update"
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
export default KeycapUpdate;
