import KeycapApi from "apis/keycap-api";
import {
  AsyncDropdown,
  Button,
  DropdownField,
  TextField,
} from "components/common/forms";
import { DeleteIcon } from "components/icons";
import { ChangeEvent, useCallback, useState } from "react";
import { SingleValue } from "react-select";
import { KeycapListItem } from "responses/keycap-response";
import { IMultipleChoiceOption } from "types/common";
import { FieldErrors } from "types/field-errors.type";
import { CreateOrderDetailRequest } from "types/order.type";
import { toOptions } from "utils/common.util";

type CreateOrderDetailFormProps = {
  index: number;
  onRemove: (index: number) => void;
  form: CreateOrderDetailRequest;
  onChange: (value: CreateOrderDetailRequest, index: number) => void;
  canRemove?: boolean;
  validationError?: FieldErrors<CreateOrderDetailRequest>;
  onClearError?: () => void;
};

const CreateOrderDetailForm: React.FC<CreateOrderDetailFormProps> = ({
  index,
  onRemove,
  form,
  onChange,
  canRemove = true,
  validationError,
  onClearError
}) => {
  const [filteredKeycaps, setFilteredKeycaps] = useState<KeycapListItem[]>([]);
  const [sizeOptions, setSizeOptions] = useState<IMultipleChoiceOption[]>([]);
  const [selectedKeycapOption, setSelectedKeycapOption] =
    useState<IMultipleChoiceOption>();

  const onKeycapChange = (option: SingleValue<IMultipleChoiceOption>) => {
    if (!option) return;
    const selectedKeycap = filteredKeycaps.find(
      (n) => n.id === Number(option.value)
    );

    if (selectedKeycap) {
      setSelectedKeycapOption(option);

      let newForm = {
        ...form,
        keycapId: Number(option.value),
      };

      const selectedKeycapSizeOptions =
        selectedKeycap.details.map<IMultipleChoiceOption>((n) => ({
          value: n.id.toString(),
          label: `${n.profile} ${n.size}U`,
        }));

      newForm = {
        ...newForm,
        keycapDetailId: Number(selectedKeycapSizeOptions[0].value),
      };

      onChange(newForm, index);
      setSizeOptions(selectedKeycapSizeOptions);
    }
  };

  const searchKeycap = useCallback(async (searchText: string) => {
    const paginatedList = await KeycapApi.getList({
      itemsPerPage: 15,
      currentPage: 1,
      searchQuery: searchText,
    });

    setFilteredKeycaps(paginatedList.items);

    const keycapOptions = toOptions<KeycapListItem>(
      paginatedList.items,
      "id",
      "name"
    );

    return keycapOptions;
  }, []);

  const onFieldChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const newValue: CreateOrderDetailRequest = {
      ...form,
      [e.target.name]: e.target.value,
    };
    onChange(newValue, index);
  };

  return (
    <div className="grid grid-cols-10 gap-4">
      <div className="col-span-3">
        <AsyncDropdown<false>
          id="keycapId"
          value={selectedKeycapOption}
          onChange={onKeycapChange}
          label={index === 0 ? "Keycap" : ""}
          placeholder="Find keycap by name..."
          request={searchKeycap}
          errorMessage={validationError?.keycapId}
          onClearError={onClearError}
        />
      </div>
      <div className="col-span-3">
        <DropdownField
          onChange={onFieldChange}
          value={form.keycapDetailId?.toString()}
          id="size"
          label={index === 0 ? "Size" : ""}
          options={sizeOptions}
          errorMessage={validationError?.keycapDetailId}
          name="keycapDetailId"
          onClearError={onClearError}
        />
      </div>
      <div className="col-span-3">
        <TextField
          onChange={onFieldChange}
          type="number"
          value={form.quantity.toString()}
          id="quantity"
          label={index === 0 ? "Quantity" : ""}
          name="quantity"
          errorMessage={validationError?.quantity}
          onClearError={onClearError}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="mb-2 flex flex-col text-end">
          {index === 0 && (
            <p className="body-16-semibold text-neutral-200">Action</p>
          )}
        </div>
        <div className="text-end mt-1">
          <Button
            disabled={!canRemove}
            variant="danger"
            size="small"
            onClick={() => onRemove(index)}
          >
            <DeleteIcon className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CreateOrderDetailForm;
