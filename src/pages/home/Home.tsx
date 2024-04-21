import { PAGE_PATHS } from "constants/page-paths";
import { Navigate } from "react-router-dom";


const Home = () => {
  return <Navigate to={PAGE_PATHS.ORDER} />;
};
export default Home;
