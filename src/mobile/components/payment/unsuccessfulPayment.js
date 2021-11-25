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
            onClick = {() => handleClick()}
          >
            بازگشت
          </Button>
        </div>
      </div>
    </>
  );
};
