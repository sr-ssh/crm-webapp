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
        <Row className="m-0 p-0 w-100 mt-4 justify-content-center">
          <Col xs={5}>
            <Button
              className="py-2 order-submit btn-dark-blue border-0 w-100 mt-4 notes-round"
              size="lg"
              type="submit"
              block
              onClick={payHandle}
            >
              پرداخت
            </Button>
          </Col>
        </Row>
      ) : null}
    </>
  );
};
