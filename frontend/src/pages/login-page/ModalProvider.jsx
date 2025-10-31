import { useCallback, useState } from "react";
import { ModalContext } from "./useModal";

export default function ModalProvider({ children }) {
  const [modal, setModal] = useState(null); 

  const openLogin = useCallback(() => setModal("login"), []);
  const openSignup = useCallback(() => setModal("signup"), []);
  const closeModal = useCallback(() => setModal(null), []);

  const value = { modal, openLogin, openSignup, closeModal };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}