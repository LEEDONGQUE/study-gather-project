import { createPortal } from "react-dom";
import { useModal } from "../login-page/useModal";
import LoginPage from "../login-page/LoginPage";
import SignupPage from "./SignupPage";

export default function ModalRoot() {
    const { modal } = useModal();
    if (!modal) return null;

    const Comp = modal === "signup" ? SignupPage : LoginPage;
    return createPortal(<Comp />, document.body);
}