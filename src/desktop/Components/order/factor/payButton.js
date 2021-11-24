import React from "react";
import { Col, Row, Button } from "react-bootstrap";

export const PayButton = ({ factor }) => {
  const payHandle = (e) => {
    e.preventDefault();
    window.open(factor.payURL, "_blank");
  };

  return (
    <>
      {factor.payStatus == 100 && factor.payURL && factor.status == 3 ? (
        <Row className="m-0 p-0 w-100 mt-4 mb-5 justify-content-center">
          <Col xs={3}>
            <Button
              className="btn--checkout--order--desktop"
              type="submit"
              onClick={payHandle}
            >
              پرداخت آنلاین
            </Button>
          </Col>
        </Row>
      ) : null}
    </>
  );
};
