import React from "react";
import { Button } from "react-bootstrap";
// Assets
import unsuccessfulIcon from "../../assets/images/payment/unsuccessful.png";

export const UnSuccessfulPayment = () => {
  return (
    <>
      <div className="wrapper d-flex flex-column  ">
        <div className="wrapper payment--successful">
          <img
            src={unsuccessfulIcon}
            className="m-0 p-0 successful--img"
            alt="successful-icon"
          />
        </div>
        <div className="wrapper--btn--turn--back--payment mt-4 mb-5">
          <Button
            className="btn--return--back--payment"
            size="lg"
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
