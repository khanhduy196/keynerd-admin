import cx from "classnames";

type Props = {
  onName: string;
  offName: string;
  on: boolean;
  onChange: (value: boolean) => void;
};

const Toggle: React.FC<Props> = ({ onName, offName, onChange, on = false }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.checked)
        }
        checked={on}
      />
      <div className="w-full h-[42px] rounded-full border border-neutral-25 p-1 flex bg-neutral-0 body-12-bold">
        <div
          className={cx(
            "w-1/2 flex justify-center items-center rounded-l-full uppercase transition duration-500",
            {
              "text-neutral-0 bg-turquoise-75": on,
              "text-neutral-100 bg-neutral-0 ease-in-out hover:scale-105 hover:text-turquoise-75":
                !on,
            }
          )}
        >
          <span>{onName}</span>
        </div>
        <div
          className={cx(
            "w-1/2 flex justify-center items-center rounded-r-full uppercase transition duration-500",
            {
              "text-neutral-0 bg-turquoise-75": !on,
              "text-neutral-100 bg-neutral-0 ease-in-out hover:scale-105 hover:text-turquoise-75":
                on,
            }
          )}
        >
          <span>{offName}</span>
        </div>
      </div>
    </label>
  );
};

export default Toggle;
