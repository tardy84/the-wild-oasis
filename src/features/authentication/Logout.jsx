import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogOut";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout;
