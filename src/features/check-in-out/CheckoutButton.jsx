import { useCheckOut } from "./useCheckOut";
import Button from "../../ui/Button";

function CheckoutButton({ bookingId }) {
  const { checkOut, isCheckingOut } = useCheckOut();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkOut(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
