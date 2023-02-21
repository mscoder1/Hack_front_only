import { ModalRoot, replace, useLocation } from "@itznevikat/router";
import { useCallback } from "react";
import PoapCollectionQRModal from "./poapCollectionQR";

const ModalController = () => {
  const { pathname } = useLocation();

  const handleClose = useCallback(() => {
    replace(pathname);
  }, [replace, pathname]);

  return (
    <ModalRoot onClose={handleClose} onClosed={handleClose}>
      <PoapCollectionQRModal nav="poapCollectionQR" />
    </ModalRoot>
  );
};

export default ModalController;
