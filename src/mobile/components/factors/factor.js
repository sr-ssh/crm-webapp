import React, { useState } from "react";
import moment from "jalali-moment";
import { Card, Table, Row, Col, Button } from "react-bootstrap";
import persianJs from "persianjs/persian.min";
import { makeStyles } from "@material-ui/core/styles";
import commaNumber from "comma-number";

//icons
import tickIcon from "./../../assets/images/factor/tick.svg";
import printIcon from "./../../assets/images/order/print.svg";
import editeOrderIcon from "../../assets/images/order/edit-order-list.svg";
import noteListIcon from "../../assets/images/order/note-list-white.svg";
import cancelIcon from "../../assets/images/order/cancel.svg";
import closeIcon from "../../assets/images/order/close.svg";
import financialCheckIcon from "./../../assets/images/order/financial-check.svg";
import waitingIcon from "../../assets/images/main/Waiting.svg";
import reminderIcon from "../../assets/images/reminder−white.svg";


//components
import { EditField } from "./editField";
import { history } from "../../../helpers/history";
import { CancelProductOrder } from "./cancelProductOrder";
import { EditFactor } from "./editFactor";
import { FinancialCheckModal } from "./financialCheckModal";
import { AddReminder } from "../reminder/addReminder";


export const Factor = ({
  factor,
  setActiveFactor,
  setCancelFactorShow,
  cancelOrderShow,
  setCancelOrderShow,
  recordOrderShow = "",
  setRecordOrderShow = {},
  setActiveOrder,
  setOrder,
}) => {
  let [print, setPrint] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [cancelModalShow, setCancelModalShow] = useState(false);
  const [editFactorModalShow, setEditFactorModalShow] = useState(false);
  const [financialCheckModal, setFinancialCheckModal] = useState(false);
  const [addReminderModal, setAddReminderModal] = useState(false);

  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [orderId, setOrderId] = useState("");
  const [productId, setProductId] = useState("");
  const [editFactor, setEditFactor] = useState("");

  const getTotalPrice = (factor) => {
    let total = 0;
    factor.map((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };
  let notesHandler = () => {
    history.push({
      pathname: "/factor/note",
      state: { factor },
    });
  };

  const printWindow = async () => {
    await setPrint(true);
    window.print();
    setPrint(false);
  };

  let getDate = (date) => {
    const now = new Date(date);
    const option = {
      month: "long",
    };
    const month = new Intl.DateTimeFormat("fa-IR", option).format(now);
    const day = moment.from(date, "DD").locale("fa").format("DD");
    const year = moment.from(date, "YYYY").locale("fa").format("YYYY");

    return `${persianJs(day).englishNumber().toString()}  ${month}  ${persianJs(
      year
    )
      .englishNumber()
      .toString()}`;
  };

  return (
    <Card
      className={`m-auto mt-3 bg-light factorCard border-0 lh-lg ${
        !print ? "noPrint" : ""
      }`}
    >
      <Card.Body className="pb-0 ps-1 rounded-3 text-gray">
        <Row className="p-0 ps-2 m-0 ">
          <Card className="factor--blue--section border-0">
            <Card.Body className="m-0 p-0 py-2 mx-3 ">
              <Row className="d-flex justify-content-between align-items-center my-1">
                <Col className="lable--factor p-0">تایید خرید:</Col>
                <Col className="d-flex justify-content-end align-items-center text--factor p-0 ">
                  {factor.shopApproval.status === 1 ? (
                    <>
                      <img
                        src={tickIcon}
                        alt="tick-icon"
                        className="m-0 p-0 ms-1 p-1 icon--tick--confirm "
                      />
                      <span>{factor.shopApproval.acceptedBy}</span>
                    </>
                  ) : factor.shopApproval.status === 2 ? (
                    <>
                      <img
                        src={closeIcon}
                        alt="tick-icon"
                        className="m-0 p-0 ms-1 p-1 icon--tick--confirm "
                      />
                      <span>{factor.shopApproval.acceptedBy}</span>
                    </>
                  ) : (
                    <>
                      <img
                        src={waitingIcon}
                        alt="tick-icon"
                        className="m-0 p-0 ms-1 p-1 icon--tick--confirm "
                      />
                      <span>درحال انتظار</span>
                    </>
                  )}
                </Col>
              </Row>

              <Row className="d-flex justify-content-between align-items-center my-1">
                <Col className="lable--factor p-0">تاریخ و ساعت :</Col>
                <Col className="d-flex justify-content-end text--factor p-0">
                  <span className="ms-2">{getDate(factor.createdAt)}</span>
                  <span>
                    {factor.createdAt &&
                      persianJs(
                        moment
                          .from(factor.createdAt, "HH:mm")
                          .locale("fa")
                          .format("HH:mm")
                      )
                        .englishNumber()
                        .toString()}
                  </span>
                </Col>
              </Row>
              <Row className="d-flex justify-content-between align-items-center my-1">
                <Col className="lable--factor p-0">نام تامین کننده:</Col>
                <Col className="d-flex justify-content-end text--factor p-0">
                  <span>{factor.supplier.family}</span>
                </Col>
              </Row>
              <Row className="d-flex justify-content-between align-items-center my-1">
                <Col className="lable--factor p-0">موبایل:</Col>
                <Col className="d-flex justify-content-end text--factor p-0">
                  <span>
                    {factor.supplier.mobile &&
                      persianJs(factor.supplier.mobile)
                        .englishNumber()
                        .toString()}
                  </span>
                </Col>
              </Row>
              <Row className="d-flex justify-content-between align-items-center my-1">
                <Col className="lable--factor p-0">آدرس:</Col>
                <Col className="d-flex justify-content-end text--factor p-0">
                  <span>{factor.address}</span>
                </Col>
              </Row>
              <Row className="d-flex justify-content-between align-items-center my-1">
                <Col className="lable--factor p-0">ثبت شده توسط:</Col>
                <Col className="d-flex justify-content-end text--factor p-0">
                  <span>{factor.employee ? factor.employee.family : null}</span>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
        <Row className="m-0 p-0 ps-2 mt-2">
          <Table borderless size="sm">
            <thead>
              <tr>
                <th className="th--header--table--factor pe-3">فاکتور ها</th>
                <th className="th--header--table--factor">قیمت</th>
                <th className="th--header--table--factor text-start ps-3">
                  تعداد
                </th>
              </tr>
            </thead>
            <tbody>
              {factor.stock.length
                ? factor.stock.map((item) => {
                    return (
                      <tr key={item.name}>
                        <td className="pe-3 td--body--table--factor ">
                          {item.name &&
                            persianJs(item.name).englishNumber().toString()}
                        </td>
                        <td className="td--body--table--factor ">
                          {item.quantity * item.price &&
                            persianJs(commaNumber(item.quantity * item.price))
                              .englishNumber()
                              .toString()}
                        </td>
                        <td className="td--body--table--factor  text-start ps-4">
                          {item.quantity &&
                            persianJs(item.quantity).englishNumber().toString()}
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>
          <Row className="border-top-blue td--body--table--factor d-flex align-items-center mb-4">
            <Col className="col-6 m-0 p-0">
              <span className="">جمع کل :</span>
            </Col>
            <Col className="px-1 fs-md-5 fs-6">
              {getTotalPrice(factor.stock) &&
                persianJs(commaNumber(getTotalPrice(factor.stock)))
                  .englishNumber()
                  .toString()}{" "}
              تومان
            </Col>
          </Row>
        </Row>
        <Row className="p-0 m-0 pb-3 w-100">
          {parseInt(factor.shopApproval.status) !== 1 && (
            <Col xs={6} className="p-0 px-1 pb-3 pe-2">
              <Button
                className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2"
                type="button"
                onClick={() => setFinancialCheckModal(true)}
              >
                <img
                  src={financialCheckIcon}
                  height="25px"
                  alt="submit-icon"
                  className="col-3 py-1"
                />
                <span className="pe-1 noPrint">تایید خرید</span>
              </Button>
            </Col>
          )}
          {parseInt(factor.shopApproval.status) !== 1 && (
            <Col xs={6} className="p-0 px-1 pb-3 ps-2">
              <Button
                className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2"
                type="button"
                onClick={() => {
                  setEditFactorModalShow(true);
                  setEditFactor(factor);
                }}
              >
                <img
                  src={editeOrderIcon}
                  height="25px"
                  alt="edit-order-icon"
                  className="col-3 py-1"
                />
                <span className="pe-1 noPrint">ویرایش</span>
              </Button>
            </Col>
          )}
          <Col xs={6} className="px-1 pb-3 pe-2">
            <Button
              className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2"
              type="button"
              onClick={notesHandler}
            >
              <img
                src={noteListIcon}
                height="25px"
                alt="note-list-icon"
                className="col-3"
              />
              <span className="pe-1 noPrint">یادداشت </span>
            </Button>
          </Col>

          {parseInt(factor.shopApproval.status) !== 1 && (
            <Col xs={6} className="p-0 px-1 pb-3 ps-2">
              <Button
                className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2"
                type="button"
                onClick={() => {
                  setCancelFactorShow(true);
                  setActiveFactor(factor);
                }}
              >
                <img
                  src={cancelIcon}
                  height="25px"
                  alt="print-icon"
                  className="col-3"
                />
                <span className="pe-1 noPrint">لغو فاکتور</span>
              </Button>
            </Col>
          )}

          <Col xs={6} className="p-0 px-1 pb-3 pe-2">
            <Button
              className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2"
              type="button"
              onClick={() => printWindow()}
            >
              <img
                src={printIcon}
                height="25px"
                alt="submit-icon"
                className="col-3 py-1"
              />
              <span className="pe-1 noPrint">چاپ</span>
            </Button>
          </Col>
          <Col xs={6} className="p-0 px-1 pb-3 pe-2">
            <Button
              className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2"
              type="button"
              onClick={() =>  setAddReminderModal(true)}
            >
              <img
                src={reminderIcon}
                height="25px"
                alt="submit-icon"
                className="col-3 p-1"
              />
              <span className="pe-1 noPrint">یادآوری</span>
            </Button>
          </Col>
        </Row>
      </Card.Body>
      <EditField
        show={editModalShow}
        onHide={() => {
          setEditModalShow(false);
          setInput("");
        }}
        input={input}
        name={name}
        productId={productId}
        orderId={orderId}
        setInput={setInput}
      />
      <CancelProductOrder
        show={cancelModalShow}
        onHide={() => {
          setCancelModalShow(false);
        }}
        productId={productId}
        orderId={orderId}
      />
      <EditFactor
        show={editFactorModalShow}
        onHide={() => {
          setEditFactorModalShow(false);
        }}
        factor={editFactor}
      />
      <FinancialCheckModal
        show={financialCheckModal}
        onHide={() => setFinancialCheckModal(false)}
        factor={financialCheckModal ? factor : null}
      />
       <AddReminder
        show={addReminderModal}
        onHide={() => setAddReminderModal(false)}
        isPersonal={false}
        aditional={{ typeReminder: 3, referenceId: factor.id }}
        title={factor.supplier.family}

      />
    </Card>
  );
};
