import { useEffect, useState } from "react";
import { useBlocker } from "react-router-dom";
//https://github.com/remix-run/react-router/blob/3a44ce30353f89d57386b75e90e05a79b18b2525/decisions/0001-use-blocker.md
//in react-router v6: remove <Prompt> component and a new useBlocker hook is designed to block navigation transitions.

export const useFormBlockNavigation = () => {
  const [showLeaveModal, setShowLeaveModal] = useState<boolean>(false);
  const [formIsDirty, setFormIsDirty] = useState<boolean>(false);

  useEffect(() => {
    //use default browser popup when reloading page, updating address in browser bar,
    //or navigating to outside app
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!formIsDirty) return;

      e.preventDefault();
      return (e.returnValue = "");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [formIsDirty]);

  const shouldBlockNavigationInsideApp = () => {
    if (!formIsDirty) return false;

    setShowLeaveModal(true);
    return true;
  };

  //use customized popup when moving around app zone
  const blocker = useBlocker(shouldBlockNavigationInsideApp);

  const handleCancelLeaveModal = () => {
    blocker.reset?.();
    setShowLeaveModal(false);
  };

  const handleConfirmLeaveModal = () => {
    blocker.proceed?.();
    setShowLeaveModal(false);
  };

  return {
    showLeaveModal,
    setShowLeaveModal,
    formIsDirty,
    setFormIsDirty,
    handleCancelLeaveModal,
    handleConfirmLeaveModal,
  };
};
