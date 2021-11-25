import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { orderActions } from "../../../../actions";

// Components
import { CircularProgress } from "@material-ui/core";

export const PayButton = ({ factor }) => {
  const dispatch = useDispatch();
  let { loading: getPaymentlinkLoading, data: getPaymentlinkdata } =
    useSelector((state) => state.getPaymentlink);
  const payHandle = (e) => {
    e.preventDefault();
    let params = window.location.pathname.split("/");
    dispatch(
      orderActions.getPaymentlink({ orderId: params[3], keylink: params[4] })
    );
  };

  return (
    <>
      {factor.btnPayOnline ? (
        <Row className="m-0 p-0 w-100 mt-4 mb-5 justify-content-center">
          <Col xs={3}>
            {getPaymentlinkLoading ? (
              <Button
                className="btn--checkout--order--desktop"
                type="submit"
                disabled={true}
              >
                <CircularProgress color="#fff" size={29} />
              </Button>
            ) : (
              <Button
                className="btn--checkout--order--desktop"
                type="submit"
                onClick={payHandle}
              >
                پرداخت آنلاین
              </Button>
            )}
          </Col>
        </Row>
      ) : null}
    </>
  );
};
