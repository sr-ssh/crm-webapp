import React from "react";
import { Button } from "react-bootstrap";
// Assets
import successfulIcon from "../../assets/images/payment/successful.png";

export const SuccessfulPayment = () => {
  return (
    <>
      <div className="wrapper--payment--result--mobile d-flex flex-column">
        <div className="payment--successful">
          <img
            src={successfulIcon}
            className="m-0 p-0 payment--img--mobile"
            alt="successful-icon"
          />
        </div>
        <div className="wrapper--btn--turn--back--payment">
          <Button
            className="btn--return--back--payment--mobile"
            type="submit"
            block
          >
            بازگشت
          </Button>
        </div>
      </div>
    </>
  );
};
