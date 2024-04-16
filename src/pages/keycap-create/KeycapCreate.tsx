import { BackButton, Button, TextField } from "components/common/forms";
import { Layout, LoadingWrapper, PageTitle } from "components/common/layouts";

const KeycapCreate = () => {
  return (
    <Layout>
      <LoadingWrapper isLoading={false}>
        <div className="w-full h-fit pb-8">
          <div className="flex gap-6 items-center mb-6">
            <BackButton className="text-neutral-200" />
            <PageTitle>Create Keycap</PageTitle>
          </div>
          <div className="flex gap-8">
            <form className="flex-1 flex flex-col gap-6">
              <TextField id="name" label="Name" name="name" />

              <div className="flex justify-between gap-6 mt-12">
                <Button
                  label="Add detail"
                  type="button"
                  variant="secondary"
                  className="flex-1 h-full"
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
