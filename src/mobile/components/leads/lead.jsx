import React, { useEffect } from "react";
import { Card, Row, Button, Spinner, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import persianJs from "persianjs/persian.min";
// Actions
import { leadActions } from "../../../actions";

// Icons
import phoneIcon from "./../../assets/images/lead/call.svg";
import reminderIcon from "./../../assets/images/reminder.svg";

export const Lead = ({
  item,
  acceptLead,
  activeId,
  addOrder,
  failLead,
  setAddReminderModal,
  ...props
}) => {
  const dispatch = useDispatch();
  const editLoading = useSelector((state) => state.editLeadStatus.loading);

  useEffect(() => {
    activeId === item?._id && editLoading && dispatch(leadActions.getLeads());
  }, [editLoading]);

  return (
    <>
      <Card
        ref={item._id == props.refKey ? props.leadRef : null}
        className={`m-auto mt-3 bg-light radius-10 border-0 mx-1`}
      >
        <Card.Body className="pb-3 rounded-3">
          <Card.Text className="pt-1">
            <span className="text-gray fw-bold">نام : </span>
            <span className="fs-6 me-2 fw-bold">
              {item.family &&
                persianJs(item.family).englishNumber().toString()}
            </span>
          </Card.Text>
          {item?.accepted && (
            <>
              <Card.Text className="pt-1">
                <Row>
                  <Col xs={9}>
                    <span className="text-gray fw-bold">شماره : </span>
                    <span className="fs-6 me-2 fw-bold">
                      {item.mobile &&
                        persianJs(item.mobile).englishNumber().toString()}
                    </span>
                  </Col>

                  <Col dir="ltr" className="top-16 ms-2 ">
                    <Button
                      onClick={(e) =>
                        addOrder(e, item?._id, item?.family, item?.mobile)
                      }
                      className="background--green button--green border-0 p-1"
                    >
                      <img src={phoneIcon} alt="phone-icon" width="27px" />
                    </Button>
                  </Col>
                </Row>
              </Card.Text>
              <Card.Text className="m-0 p-0 pt-1 d-flex align-items-start top-16">
                <span className="text-gray fw-bold text--description--product">
                  توضیحات :
                </span>
                <span className="fs-6 me-2 fw-bold ">
                  {item.description &&
                    persianJs(item.description).englishNumber().toString()}
                </span>
              </Card.Text>
            </>
          )}
          {item?.accepted && (
            <Card.Text className="d-flex justify-content-end ps-1 ">
              <Button
                className={`d-flex flex-row align-items-center justify-content-center btn--add--note--desktop--addOrder m-0 `}
                style={{ width: "42%" }}
                onClick={() => setAddReminderModal(item._id, item.family)}
              >
                <img
                  className="me-3 p-1"
                  src={reminderIcon}
                  height="30px"
                  alt="edit-icon"
                />
                <span className="me-1 fw-bold ms-3">یادآوری</span>
              </Button>
            </Card.Text>
          )}

          <Card.Text className="m-0 p-0 d-flex align-items-start w-100">
            {activeId === item?._id && editLoading ? (
              <Button
                className="button--green fs-6 fw-bold background--green border-0 w-50 mt-3"
                size="lg"
                type="submit"
                disabled
              >
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                در حال انجام عملیات...
              </Button>
            ) : item?.accepted ? (
              <Button
                onClick={(e) => failLead(e, item?._id)}
                className="button--red fs-6 fw-bold background--red border-0 w-100"
                size="lg"
                type="submit"
                block
              >
                ناموفق
              </Button>
            ) : (
              <Button
                onClick={(e) => acceptLead(e, item?._id)}
                className="button--green fs-6 fw-bold background--green border-0 w-100"
                size="lg"
                type="submit"
                block
              >
                قبول
              </Button>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
