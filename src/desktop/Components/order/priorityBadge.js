import React from "react";
import { Row, Col } from "react-bootstrap";
import lowPriorityIcon from "./../../assets/images/order/priority/low.svg";
import mediumPriorityIcon from "./../../assets/images/order/priority/medium.svg";
import highPriorityIcon from "./../../assets/images/order/priority/high.svg";

export const PriorityBadge = ({ order }) => {
  return (
    <Row className="m-0 mt-3 noPrint justify-content-end ps-4">
      {order.status == 3 && order.priority ? (
        <Col
          xs={1}
          className="py-2 px-0 d-flex justify-content-center btn--sale--opprotunity ms-4 priority-badge"
        >
          <img
            src={
              order.priority == 1
                ? lowPriorityIcon
                : order.priority == 2
                ? mediumPriorityIcon
                : order.priority == 3
                ? highPriorityIcon
                : ""
            }
            height="25px"
            alt="print-icon"
          />
        </Col>
      ) : null}
    </Row>
  );
};
