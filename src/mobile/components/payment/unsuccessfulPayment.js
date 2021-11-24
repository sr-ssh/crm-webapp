import React from "react";
import { Button } from "react-bootstrap";
// Assets
import unsuccessfulIcon from "../../assets/images/payment/unsuccessful.png";

export const UnSuccessfulPayment = () => {
  return (
    <>
      <div className="wrapper--payment--result--mobile d-flex flex-column  ">
        <div className="payment--successful">
          <img
            src={unsuccessfulIcon}
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
