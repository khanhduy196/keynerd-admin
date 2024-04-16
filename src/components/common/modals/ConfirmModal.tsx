import React from "react";
import Modal from "react-modal";
import cx from "classnames";
import { Button } from "../forms";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  content: string;
  yesButton: string;
  noButton?: string;
  onYes: () => void;
  onNo?: () => void;
  className?: string;
  yesButtonLoading?: boolean;
  yesButtonDisabled?: boolean;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title,
  content,
  yesButton,
  noButton,
  onYes,
  onNo,
  className,
  yesButtonLoading = false,
  yesButtonDisabled = false,
}) => {
  const isYesButtonDisabled = yesButtonDisabled || yesButtonLoading;

  return (
    <Modal
      isOpen={open}
      onRequestClose={onNo}
      contentLabel="Confirm Modal"
      className={cx(
        "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-8 outline-none min-w-[40vw] max-w-[38.75rem]",
        className
      )}
      overlayClassName="fixed inset-0 bg-blue-50 bg-opacity-75"
    >
      <div className="mb-2">
        <h6>{title}</h6>
      </div>
      <div>
        <p className="justify-left body-16-regular">{content}</p>
      </div>
      <div className="flex justify-end mt-12 gap-2">
        {noButton && (
          <Button
            onClick={onNo}
            variant="secondary"
            className="min-w-[7.8125rem]"
          >
            {noButton}
          </Button>
        )}
        <Button
          onClick={onYes}
          disabled={isYesButtonDisabled}
          className="min-w-[7.8125rem]"
        >
          {yesButton}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
