import React from "react";
import { Button } from "react-bootstrap";
import { history } from "../../../helpers";
// Assets
import unsuccessfulIcon from "../../assets/images/payment/unsuccessful.png";

export const UnSuccessfulPayment = (props) => {

  const handleClick = () => {
    if (props.match.params.orderId && props.match.params.keyLink)
      history.push(`/order/factor/${props.match.params.orderId}/${props.match.params.keyLink}`)
  }

  
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
            onClick={() => handleClick()}
          >
            بازگشت
          </Button>
        </div>
      </div>
    </>
  );
};
