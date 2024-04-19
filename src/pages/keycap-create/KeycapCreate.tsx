import { BackButton, Button, TextField } from "components/common/forms";
import UploadImage from "components/common/forms/UploadImage";

import { Layout, LoadingWrapper, PageTitle } from "components/common/layouts";
import CreateKeycapDetailForm from "components/keycap/CreateKeycapDetailForm";
import { KeycapProfile } from "enums/keycap";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  CreateKeycapDetailRequest,
  CreateKeycapRequest,
} from "types/keycap.type";

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
  const [form, setForm] = useState<CreateKeycapRequest>(INITAL_FORM);

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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
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
      details: [...form.details, {...INITAL_KEYCAP_DETAIL_FORM, key: -Date.now()}],
    });
  };

  const handleRemoveKeycapDetail = (index: number) => {
    const newDetails = [...form.details];
    newDetails.splice(index, 1);
    handleChangeDetails(newDetails);
  };

  const handleChangeKeycapDetail = (value: CreateKeycapDetailRequest, index: number) => {
    const newDetails = [...form.details];
    newDetails[index] = {...value};
    handleChangeDetails(newDetails);
  }

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
              <UploadImage label="Photos" onChange={photosOnChange} />
              <TextField
                id="name"
                label="Name"
                name="name"
                value={form.name}
                onChange={fieldOnChange}
              />
              {form.details.map((detail, index) => {
                return (
                  <CreateKeycapDetailForm
                    onChange={handleChangeKeycapDetail}
                    value={detail}
                    index={index}
                    key={detail.key}
                    onRemove={handleRemoveKeycapDetail}
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
                <Button label="Save" type="submit" className="flex-1 h-full" />
              </div>
            </form>
          </div>
        </div>
      </LoadingWrapper>
    </Layout>
  );
};
export default KeycapCreate;
