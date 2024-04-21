import { BackButton, Button, TextArea } from "components/common/forms";
import { Layout, LoadingWrapper, PageTitle } from "components/common/layouts";
import CreateOrderDetailForm from "components/order/CreateOrderDetailForm";
import { PAGE_PATHS } from "constants/page-paths";
import { useHttpMutationService } from "hooks";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrderSchema } from "schemas/create-order-schema";
import OrderService from "services/order.service";
import { FieldErrors } from "types/field-errors.type";
import { CreateOrderDetailRequest, CreateOrderRequest } from "types/order.type";
import { ValidationUtil } from "utils";
import { toastError, toastSuccess } from "utils/toast";

const INITAL_ORDER_DETAIL_FORM: CreateOrderDetailRequest = {
  key: -Date.now(),
  keycapDetailId: undefined,
  quantity: 1,
};

const INITAL_FORM: CreateOrderRequest = {
  note: "",
  details: [INITAL_ORDER_DETAIL_FORM],
};

const OrderCreate = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<CreateOrderRequest>(INITAL_FORM);
  const [validationError, setValidationError] = useState<
    FieldErrors<CreateOrderRequest>
  >({});
  const { mutate } = useHttpMutationService({
    request: (data?: CreateOrderRequest) => OrderService.create(data!),
  });

  const fieldOnChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue: CreateOrderRequest = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(newValue);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error, value: validatedData } = createOrderSchema.validate(form);

    if (error) {
      const newValidationError =
        ValidationUtil.transformValidationError<CreateOrderRequest>(error);
      setValidationError(newValidationError);
      toastError(error.message);
      return;
    }
    const response = await mutate(validatedData);

    if (response) {
      toastSuccess("Order is created successfully!");
      navigate(PAGE_PATHS.ORDER);
    }
  };

  const handleChangeDetails = (details: CreateOrderDetailRequest[]) => {
    const newValues: CreateOrderRequest = {
      ...form,
      details,
    };
    setForm(newValues);
  };

  const handleAddOrderDetail = () => {
    setForm({
      ...form,
      details: [
        ...form.details,
        { ...INITAL_ORDER_DETAIL_FORM, key: -Date.now() },
      ],
    });
  };

  const handleRemoveOrderDetail = (index: number) => {
    const newDetails = [...form.details];
    newDetails.splice(index, 1);
    handleChangeDetails(newDetails);
  };

  const handleChangeOrderDetail = (
    value: CreateOrderDetailRequest,
    index: number
  ) => {
    const newDetails = [...form.details];
    newDetails[index] = { ...value };
    handleChangeDetails(newDetails);
  };

  const handleClearValidationError = () => {
    setValidationError({});
  };

  return (
    <Layout>
      <LoadingWrapper isLoading={false}>
        <div className="w-full h-fit pb-8">
          <div className="flex gap-6 items-center mb-6">
            <BackButton className="text-neutral-200" />
            <PageTitle>Create Order</PageTitle>
          </div>
          <div className="flex gap-8">
            <form className="flex-1 flex flex-col gap-4" onSubmit={onSubmit}>
              <TextArea
                id="note"
                label="Note"
                name="note"
                value={form.note}
                onChange={fieldOnChange}
                errorMessage={validationError.note}
                onClearError={handleClearValidationError}
              />
              {form.details.map((detail, index) => {
                return (
                  <CreateOrderDetailForm
                    onChange={handleChangeOrderDetail}
                    form={detail}
                    index={index}
                    key={detail.key}
                    onRemove={handleRemoveOrderDetail}
                    canRemove={form.details.length > 1}
                    validationError={validationError?.details?.[index]}
                    onClearError={handleClearValidationError}
                  />
                );
              })}

              <div className="flex justify-between gap-6 mt-12">
                <Button
                  label="Add detail"
                  type="button"
                  variant="secondary"
                  className="flex-1 h-full"
                  onClick={handleAddOrderDetail}
                />
                <Button label="Save" type="submit" className="flex-1 h-full" />
              </div>
            </form>
          </div>
        </div>
      </LoadingWrapper>
    </Layout>
  );
};
export default OrderCreate;
