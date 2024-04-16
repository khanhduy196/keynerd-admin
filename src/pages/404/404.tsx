import { LinkButton } from "components/common/forms";
import { Logo } from "components/common/layouts";
import { PAGE_PATHS } from "constants/page-paths";

const PageNotFound: React.FC = () => {
  return (
    <div className="w-full h-screen bg-blue-10">
      <div className="max-w-[1440px] h-full mx-auto flex flex-col px-6 pb-6">
        <nav className="w-full h-[88px] pt-8 pb-4">
          <Logo size="large" />
        </nav>
        <div className="flex-auto relative bg-neutral-0 rounded-3xl bg-gradient-to-t from-bgLinear-blueGreen via-49.94% via-neutral-0 z-10">
          <div className="flex flex-col items-center mt-[100px]">
            <span className="text-turquoise-10 text-[156px]/[1] font-bold">
              404
            </span>
            <span className="body-16-regular text-neutral-100 mb-6">
              Uh oh! Seems like something went wrong
            </span>
            <LinkButton to={PAGE_PATHS.HOME} variant="primary" size="large">
              Back to Homepage
            </LinkButton>
          </div>
          <img
            src="/images/404.png"
            alt="404"
            className="absolute -z-10 bottom-8 left-1/2 -translate-x-1/2 max-h-[40%] w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
