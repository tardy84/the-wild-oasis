import { useBooking } from "./useBooking";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckOut";
import { useDeleteBooking } from "./useDeleteBooking";
import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { booking, isLoading } = useBooking();
  const { checkOut, isCheckingOut } = useCheckOut();
  const { deleteBooking, isLoading: isDeleting } = useDeleteBooking();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;
  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Modal>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking # {bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        {/* <ButtonText onClick={moveBack}>&larr; Back</ButtonText> */}
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal.Open opens="delete">
          <Button
            variation="danger"
            onClick={() => {
              deleteBooking(bookingId);
              navigate(-1);
            }}
          >
            Delete
          </Button>
        </Modal.Open>

        {status === "unconfirmed" && (
          <Button
            onClick={() => navigate(`/checkin/${bookingId}`)}
            icon={<HiArrowDownOnSquare />}
          >
            Check in
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            onClick={() => checkOut(bookingId)}
            disabled={isCheckingOut}
            icon={<HiArrowUpOnSquare />}
          >
            Check out
          </Button>
        )}
        <Button variation="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
      </ButtonGroup>
      <Modal.Window name="delete">
        <ConfirmDelete
          resourceName="booking"
          disabled={isDeleting}
          onConfirm={() => {
            deleteBooking(bookingId, { onSettled: () => navigate(-1) });
          }}
        />
      </Modal.Window>
    </Modal>
  );
}

export default BookingDetail;
