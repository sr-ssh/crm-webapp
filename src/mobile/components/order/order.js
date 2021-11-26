import React, { useState } from "react";
import moment from "jalali-moment";
import { Card, Table, Row, Col, Button } from "react-bootstrap";
import persianJs from "persianjs/persian.min";
import { makeStyles } from "@material-ui/core/styles";
import commaNumber from "comma-number";
import { useSelector } from "react-redux";

//icons
import tickIcon from "./../../assets/images/factor/tick.svg";
import closeIcon from "./../../assets/images/order/close.svg";
import deliveryIcon from "./../../assets/images/order/delivery1.svg";
import printIcon from "./../../assets/images/order/print.svg";
import editeOrderIcon from "../../assets/images/order/edit-order-list.svg";
import addNoteIcon from "../../assets/images/order/add-note-white.svg";
import noteListIcon from "../../assets/images/order/note-list-white.svg";
import cancelIcon from "../../assets/images/order/cancel.svg";
import prevFactorIcon from "./../../assets/images/order/pish-factor.svg";
import financialCheckIcon from "./../../assets/images/order/financial-check.svg";
import resultIcon from "./../../assets/images/order/Result.svg";
import uploadIcon from "./../../assets/images/order/Upload-documents.svg";
import viewDocumentsIcon from "../../assets/images/order/View-documents.svg";
import waitingIcon from "../../assets/images/main/Waiting.svg";
import freeIcon from "../../assets/images/order/free1.svg";
import coodIcon from "../../assets/images/order/cood.svg";
import lowWhitePriorityIcon from "./../../assets/images/order/priority/low-white.svg";
import followUpDateIcon from "../../assets/images/order/follow-up-date.svg";
import reminderIcon from "../../assets/images/reminder−white.svg";
//components
import { AddNotesModal } from "./addNotesModal";
import { EditField } from "./editField";
import { history } from "../../../helpers/history";
import { CancelProductOrder } from "./cancelProductOrder";
import { EditeProductOrder } from "./editProductOrder";
import { ShareLinkModal } from "./shareLinkModal";
import { FinancialCheckModal } from "./financialCheckModal";
import { ResultOrder } from "./resultOrder";
import { FreeOrder } from "./freeOrder";
import { TrackingCodeModal } from "./trackingCode";
import { PriorityBadge } from "./priorityBadge";
import { FollowUpDateModal } from "./followUpDateModal";
import { AddReminder } from "../reminder/addReminder";


export const Order = ({
  order,
  refresh,
  setRefresh,
  deliveryShow,
  setDeliveryShow,
  cancelOrderShow,
  setCancelOrderShow,
  recordOrderShow = "",
  setRecordOrderShow = {},
  setActiveOrder,
  setOrder,
  status,
  setUploadModalShow,
  setShowDocModalShow,
  freeSaleOpportunity,
  setPrioritizeModalShow,
}) => {
  let [print, setPrint] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [cancelModalShow, setCancelModalShow] = useState(false);
  const [freeModalShow, setFreeModalShow] = useState(false);
  const [editOrder, setEditOrder] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [isShareLinkOrder, setIsShareLinkOrder] = useState(false);
  const [financialCheckModal, setFinancialCheckModal] = useState(false);
  const [resultOrderModal, setResultOrderModal] = useState(false);
  const [followUpDateModal, setFollowUpDateModal] = useState(false);
  const [freeStatus, setFreeStatus] = useState("");
  const { user: userInfo, loading: userInfoLoading } = useSelector(
    (state) => state.appInfo
  );
  const [addReminderModal, setAddReminderModal] = useState(false);

  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [orderId, setOrderId] = useState("");
  const [productId, setProductId] = useState("");
  const [editProductOrder, setEditProductOrder] = useState("");
  const [shareLinkOrder, setShareLinkOrder] = useState("");
  const [trackingCodeModal, setTrackingCodeModal] = useState(false);
  const getTotalPrice = (order) => {
    let total = 0;
    order.map((item) => {
      total += item.sellingPrice * item.quantity;
    });
    return total;
  };
  let notesHandler = () => {
    history.push({
      pathname: "/order/notes",
      state: { id: order.id },
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
      className={`m-auto mt-3 px-2 mb-4 bg-light productCard border-0 lh-lg ${
        !print ? "noPrint" : ""
      }`}
    >
      <PriorityBadge order={order} />
      <Card.Body className="pb-0 px-1 rounded-3 text-gray pt-0">
        <Row className="p-0 m-0 ">
          <Card className="factor--blue--section border-0">
            <Card.Body className="m-0 p-0 py-2 mx-3 ">
              {order.status === 0 && (
                <Row className="d-flex justify-content-between align-items-center my-1">
                  <Col className="lable--factor p-0">تایید مالی:</Col>
                  {order.financialApproval.status === 1 ? (
                    <Col className="d-flex justify-content-end align-items-center text--factor p-0 ">
                      <img
                        src={tickIcon}
                        alt="tick-icon"
                        className="m-0 p-0 ms-1 p-1 icon--tick--confirm "
                      />
                      <span>{order.financialApproval.acceptedBy}</span>
                    </Col>
                  ) : order.financialApproval.status === 2 ? (
                    <Col className="d-flex justify-content-end align-items-center text--factor p-0 ">
                      <img
                        src={closeIcon}
                        alt="tick-icon"
                        className="m-0 p-0 ms-1 p-1 icon--tick--confirm "
                      />
                      <span>{order.financialApproval.acceptedBy}</span>
                    </Col>
                  ) : order.financialApproval.status === 3 ? (
                    <Col className="d-flex justify-content-end align-items-center text--factor p-0 ">
                      <img
                        src={tickIcon}
                        alt="tick-icon"
                        className="m-0 p-0 ms-1 p-1 icon--tick--confirm "
                      />
                      <span>پرداخت آنلاین</span>
                    </Col>
                  ) : (
                    <Col className="d-flex justify-content-end align-items-center text--factor p-0 ">
                      <img
                        src={waitingIcon}
                        alt="tick-icon"
                        className="m-0 p-0 ms-1 p-1 icon--tick--confirm "
                      />
                      <span>درحال انتظار</span>
                    </Col>
                  )}
                </Row>
              )}

              <Row className="d-flex justify-content-between align-items-center my-1">
                <Col className="lable--order p-0">تاریخ و ساعت :</Col>
                <Col className="d-flex justify-content-end text--factor p-0">
                  <span className="ms-2">{getDate(order.createdAt)}</span>
                  <span>
                    {order.createdAt &&
                      persianJs(
                        moment
                          .from(order.createdAt, "HH:mm")
                          .locale("fa")
                          .format("HH:mm")
                      )
                        .englishNumber()
                        .toString()}
                  </span>
                </Col>
              </Row>
              <Row className="d-flex justify-content-between align-items-center my-1">
                <Col className="lable--order p-0">شماره مشتری:</Col>
                <Col className="d-flex justify-content-end text--factor p-0">
                  <span>
                    {order.support
                      ? order.customer.phoneNumber &&
                        persianJs(order.customer.phoneNumber)
                          .englishNumber()
                          .toString()
                      : order.customer.mobile &&
                        persianJs(order.customer.mobile)
                          .englishNumber()
                          .toString()}
                  </span>
                </Col>
              </Row>
              <Row className="d-flex justify-content-between align-items-center my-1">
                <Col className="lable--order p-0">شماره همراه مشتری:</Col>
                <Col className="d-flex justify-content-end text--factor p-0">
                  <span>
                    {order.support === undefined
                      ? order.customer.mobile === undefined
                        ? null
                        : persianJs(order.customer.mobile)
                            .englishNumber()
                            .toString()
                      : order.mobile === undefined
                      ? order.customer.mobile === undefined
                        ? null
                        : persianJs(order.customer.mobile)
                            .englishNumber()
                            .toString()
                      : persianJs(order.mobile).englishNumber().toString()}
                  </span>
                </Col>
              </Row>
              <Row className="d-flex justify-content-between align-items-center my-1">
                <Col className="lable--order p-0">نام مشتری:</Col>
                <Col className="d-flex justify-content-end text--factor p-0">
                  <span>{order.customer.family}</span>
                </Col>
              </Row>
              <Row className="d-flex justify-content-between align-items-center my-1">
                <Col className="lable--order p-0">نام مجموعه:</Col>
                <Col className="d-flex justify-content-end text--factor p-0">
                  <span>{order.customer.company}</span>
                </Col>
              </Row>
              <Row className="d-flex justify-content-between align-items-center my-1">
                <Col className="lable--order p-0">شماره فروشنده:</Col>
                <Col className="d-flex justify-content-end text--factor p-0">
                  <span>
                    {order.seller === undefined
                      ? null
                      : persianJs(order.seller.mobile)
                          .englishNumber()
                          .toString()}
                  </span>
                </Col>
              </Row>
              <Row className="d-flex justify-content-between align-items-center my-1">
                <Col className="lable--order p-0">نام فروشنده:</Col>
                <Col className="d-flex justify-content-end text--factor p-0">
                  <span>
                    {order.seller === undefined ? null : order.seller.family}
                  </span>
                </Col>
              </Row>
              <Row className="d-flex justify-content-between align-items-center my-1">
                <Col className="lable--order p-0">آدرس:</Col>
                <Col className="d-flex justify-content-end text--factor p-0">
                  <span>
                    {order.address &&
                      persianJs(order.address).englishNumber().toString()}
                  </span>
                </Col>
              </Row>
              <Row className="d-flex justify-content-between align-items-center my-1">
                <Col className="lable--order p-0">تاریخ استفاده:</Col>
                <Col className="d-flex justify-content-end text--factor p-0">
                  <span>
                    {order.readyTime &&
                      persianJs(
                        moment
                          .from(order.readyTime, "YYYY/MM/DD HH:mm")
                          .locale("fa")
                          .format("HH:mm DD MMMM YYYY")
                      )
                        .englishNumber()
                        .toString()}
                  </span>
                </Col>
              </Row>
              <Row className="d-flex justify-content-between align-items-center my-1">
                <Col className="lable--order p-0">ثبت توسط:</Col>
                <Col className="d-flex justify-content-end text--factor p-0">
                  <span>
                    {order.employee
                      ? order.employee.family
                      : order.sellers && order.sellers[0]?.id.family}
                  </span>
                </Col>
              </Row>
              {order.sellers?.length > 0 && (
                <Row className="d-flex justify-content-between align-items-center my-1">
                  <Col className="lable--order p-0">دنبال کننده فعال:</Col>
                  <Col className="d-flex justify-content-end text--factor p-0">
                    <span>
                      {order.sellers &&
                        order.sellers[order.sellers?.length - 1].id?.family}
                    </span>
                  </Col>
                </Row>
              )}
              <Row className="d-flex justify-content-between align-items-center my-1">
                <Col className="lable--order p-0">کد پیگیری:</Col>
                {order.status == 3 ? (
                  <Col className="d-flex justify-content-end align-items-center text--factor p-0 ">
                    <img
                      src={closeIcon}
                      alt="tick-icon"
                      className="m-0 p-0 ms-1 p-1 icon--tick--confirm "
                    />
                    <span>ثبت نشده</span>
                  </Col>
                ) : (
                  <Col className="d-flex justify-content-end align-items-center text--factor p-0 ">
                    <img
                      src={tickIcon}
                      alt="tick-icon"
                      className="m-0 p-0 ms-1 p-1 icon--tick--confirm "
                    />
                    <span></span>
                  </Col>
                )}
              </Row>
            </Card.Body>
          </Card>
        </Row>
        <Row className="m-0 p-0 ps-2">
          <Table borderless size="sm">
            <thead>
              <tr>
                <th>سفارش</th>
                <th>قیمت(تومان)</th>
                <th>تعداد</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {order.products.length
                ? order.products.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {item.name &&
                            persianJs(item.name).englishNumber().toString()}
                        </td>
                        <td>
                          <Row>
                            <Col className="ps-0">
                              {item.quantity * item.sellingPrice &&
                                persianJs(
                                  commaNumber(item.quantity * item.sellingPrice)
                                )
                                  .englishNumber()
                                  .toString()}
                            </Col>
                          </Row>
                        </td>
                        <td>
                          <Row>
                            <Col className="ps-0">
                              {item.quantity &&
                                persianJs(item.quantity)
                                  .englishNumber()
                                  .toString()}
                            </Col>
                          </Row>
                        </td>
                        <td className="d-flex justify-content-center align-content-center">
                          <Row></Row>
                        </td>
                      </tr>
                    );
                  })
                : null}
              <tr className="border-top-blue">
                <td>جمع کل:</td>
                <td className="fs-6">
                  {getTotalPrice(order.products) &&
                    persianJs(commaNumber(getTotalPrice(order.products)))
                      .englishNumber()
                      .toString()}{" "}
                </td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <Row className="p-0 m-0 pb-3 w-100">
          {userInfo?.data?.permission?.financialConfirmationOrder &&
            order.status === 0 &&
            order.financialApproval.status == false && (
              <Col xs={6} className="p-0 px-1 pb-3 ps-2">
                <Button
                  className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2"
                  type="button"
                  onClick={() => {
                    setFinancialCheckModal(true);
                    setActiveOrder(order);
                  }}
                >
                  <img
                    src={financialCheckIcon}
                    height="25px"
                    alt="add-note-icon"
                    className="col-3"
                  />
                  <span className="pe-1">تایید مالی</span>
                </Button>
              </Col>
            )}
          {order.sellers &&
            order.sellers.some((seller) => seller.active === true) &&
            order.status == 3 &&
            order.sellers[order.sellers.length - 1].id?._id &&
            userInfo?.data &&
            order.sellers[order.sellers.length - 1]?.id?._id ===
              userInfo?.data._id && (
              <Col xs={6} className="p-0 px-1 pb-3 ps-2">
                <Button
                  className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2"
                  type="button"
                  onClick={() => {
                    setFreeModalShow(true);
                    setFreeStatus("0");
                  }}
                >
                  <img
                    src={freeIcon}
                    height="25px"
                    alt="print-icon"
                    className="col-3"
                  />
                  <span className="pe-1">آزاد کردن</span>
                </Button>
              </Col>
            )}
          {order.status == 3 && !order.priority && (
            <Col xs={6} className="p-0 px-1 pb-3 ps-2">
              <Button
                className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2"
                type="button"
                onClick={() => {
                  setPrioritizeModalShow(true);
                  setActiveOrder(order);
                }}
              >
                <img
                  src={lowWhitePriorityIcon}
                  height="25px"
                  alt="print-icon"
                  className="col-3"
                />
                <span className="noPrint">اولویت</span>
              </Button>
            </Col>
          )}
          {order.status == 3 && (
            <Col xs={6} className="p-0 px-1 pb-3 ps-2">
              <Button
                className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2"
                type="button"
                onClick={() => {
                  setTrackingCodeModal(true);
                }}
              >
                <img
                  src={coodIcon}
                  height="25px"
                  width="50px"
                  alt="tracking-code-icon"
                  className="col-3"
                />
                <span className="pe-1">کد پیگیری</span>
              </Button>
            </Col>
          )}

          <Col xs={6} className="p-0 px-1 pb-3 ps-2">
            <Button
              className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2"
              type="button"
              onClick={() => {
                setShowNotesModal(true);
                setActiveOrder(order);
              }}
            >
              <img
                src={addNoteIcon}
                height="25px"
                alt="add-note-icon"
                className="col-3"
              />
              <span className="pe-1">اضافه یادداشت</span>
            </Button>
          </Col>
          <Col xs={6} className="p-0 px-1 pb-3 ps-2">
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
              <span className="pe-1">یادداشت ها</span>
            </Button>
          </Col>
          {order.status !== 2 && (
            <Col xs={6} className="p-0 px-1 pb-3 ps-2">
              <Button
                className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2"
                type="button"
                onClick={() => {
                  setEditOrder(true);
                  setEditProductOrder(order);
                }}
              >
                <img
                  src={editeOrderIcon}
                  height="25px"
                  alt="edit-order-icon"
                  className="col-3 py-1"
                />
                <span className="pe-1">ویرایش</span>
              </Button>
            </Col>
          )}
          <Col xs={6} className="p-0 px-1 pb-3 ps-2">
            <Button
              className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2"
              type="button"
              onClick={() => {
                setIsShareLinkOrder(true);
                setShareLinkOrder(order);
              }}
            >
              <img
                src={prevFactorIcon}
                height="26px"
                alt="prev-factor-icon"
                className="col-3 py-1 me-1"
              />

              <span className="me-2">
                {order.status == 3 ? "پیش فاکتور" : "فاکتور"}
              </span>
            </Button>
          </Col>
          {/* <Col xs={6} className="p-0 px-1 pb-3 ps-2">
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
              <span className="pe-1">پرینت</span>
            </Button>
          </Col> */}
          {order.status !== 3 && order.status !== 2 && (
            <Col xs={6} className="p-0 px-1 pb-3 ps-2">
              <Button
                className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2"
                type="button"
                onClick={() => {
                  setCancelOrderShow(true);
                  setActiveOrder(order);
                }}
              >
                <img
                  src={cancelIcon}
                  height="25px"
                  alt="print-icon"
                  className="col-3"
                />
                <span className="pe-1">لغو سفارش</span>
              </Button>
            </Col>
          )}
          <Col xs={6} className="p-0 px-1 pb-3 ps-2">
            <Button
              className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2"
              type="button"
              onClick={() => {
                setUploadModalShow(true);
                setActiveOrder(order);
              }}
            >
              <img
                src={uploadIcon}
                height="25px"
                alt="print-icon"
                className="col-3"
              />

              <span className="noPrint">بارگذاری مدارک</span>
            </Button>
          </Col>
          <Col xs={6} className="p-0 px-1 pb-3 ps-2">
            <Button
              className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2"
              type="button"
              onClick={() => {
                setShowDocModalShow(true);
                setActiveOrder(order);
              }}
            >
              <img
                src={viewDocumentsIcon}
                height="25px"
                alt="print-icon"
                className="col-3"
              />
              <span className="noPrint">مشاهده مدارک</span>
            </Button>
          </Col>
          <Col xs={6} className="p-0 px-1 pb-3 ps-2">
            <Button
              className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2"
              type="button"
              onClick={() => {
                setDeliveryShow(true);
                setOrder(order?.id);
              }}
            >
              <img
                src={deliveryIcon}
                height="25px"
                alt="delivery-icon"
                className="col-3"
              />
              <span className="pe-1">پیک</span>
            </Button>
          </Col>

          {order.status === 3 && (
            <Col xs={6} className="p-0 px-1 pb-3 ps-2">
              <Button
                className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2"
                type="button"
                onClick={() => {
                  setResultOrderModal(true);
                  setActiveOrder(order);
                }}
              >
                <img
                  src={resultIcon}
                  height="25px"
                  alt="print-icon"
                  className="col-3"
                />
                <span className="pe-1">نتیجه</span>
              </Button>
            </Col>
          )}
          {order.status == 3 && order.trackingTime == undefined && (
            <Col xs={6} className="p-0 px-1 pb-3 ps-2">
              <Button
                className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2"
                type="button"
                onClick={() => {
                  setFollowUpDateModal(true);
                }}
              >
                <img
                  src={followUpDateIcon}
                  height="28px"
                  alt="print-icon"
                  className="col-3"
                />
                <span className="pe-1">پیگیری شد </span>
              </Button>
            </Col>
          )}
          
            <Col xs={6} className="p-0 px-1 pb-3 ps-2">
              <Button
                className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2"
                type="button"
                onClick={() => {
                  setAddReminderModal(true);
                }}
              >
                <img
                  src={reminderIcon}
                  height="28px"
                  alt="print-icon"
                  className="col-3 p-1"
                />
                <span className="pe-1">یادآوری</span>
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
      <EditeProductOrder
        show={editOrder}
        onHide={() => {
          setEditOrder(false);
        }}
        order={editProductOrder}
      />
      <AddNotesModal
        show={showNotesModal}
        onHide={() => {
          setShowNotesModal(false);
        }}
        permission={true}
        orderId={order.id}
        status={status}
      />
      <ShareLinkModal
        show={isShareLinkOrder}
        onHide={() => setIsShareLinkOrder(false)}
        order={isShareLinkOrder ? shareLinkOrder : null}
      />
      <FinancialCheckModal
        show={financialCheckModal}
        onHide={() => setFinancialCheckModal(false)}
        order={financialCheckModal ? order : null}
      />
      <ResultOrder
        show={resultOrderModal}
        onHide={() => setResultOrderModal(false)}
        order={resultOrderModal ? order : null}
      />
      <FreeOrder
        show={freeModalShow}
        onHide={() => {
          setFreeModalShow(false);
          setRefresh(!refresh);
        }}
        order={order?.id}
        status={freeStatus}
      />
      <TrackingCodeModal
        show={trackingCodeModal}
        onHide={() => {
          setTrackingCodeModal(false);
        }}
        order={order}
      />
      <FollowUpDateModal
        show={followUpDateModal}
        onHide={() => {
          setFollowUpDateModal(false);
        }}
        order={order}
      />
      <AddReminder
        show={addReminderModal}
        onHide={() => setAddReminderModal(false)}
        isPersonal={false}
        aditional={{ typeReminder: 2, referenceId: order.id }}
        title={order.customer.family}
      />
    </Card>
  );
};
