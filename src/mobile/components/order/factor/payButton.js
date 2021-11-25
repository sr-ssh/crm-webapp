import React from "react";
import { Col, Row, Button } from "react-bootstrap";

export const PayButton = ({ factor }) => {
  const payHandle = (e) => {
    e.preventDefault();
    window.open(factor.payURL, "_blank");
  };

  return (
    <>
      {factor.btnPayOnline  ? (
        <Row className="m-0 p-0 w-100 mt-4 justify-content-center">
          <Col xs={7}>
            <Button
              className="btn--checkout--order--mobile" 
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
