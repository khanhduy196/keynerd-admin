import { Layout } from "components/common/layouts";

const AdminHome = () => {
  return (
    <Layout mainClassName="flex flex-col">
      <div className="flex gap-2 mb-4">
        <h5>Hello Admin</h5>
        <img src="/images/waving-hand.png" alt="waving hand icon" width={50} />
      </div>
      <p>Nothing here just yet but cool things will be added soon!</p>
      <img
        src="/images/admin-home-page-image.png"
        alt="main home image"
        height={457}
        className="rounded-3xl mt-auto"
      />
    </Layout>
  );
};
export default AdminHome;
