import React, { useState } from "react";
import moment from "jalali-moment";
import {
  Container,
  Form,
  Card,
  Table,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import persianJs from "persianjs/persian.min";
import { Dialog, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import commaNumber from "comma-number";

//icons
import tickIcon from "./../../assets/images/order/tick.svg";
import closeIcon from "./../../assets/images/order/close.svg";
import deliveryIcon from "./../../assets/images/order/delivery1.svg";
import printIcon from "./../../assets/images/order/print.svg";
import editeOrderIcon from "../../assets/images/order/edit-order-list.svg";
import addNoteIcon from "../../assets/images/order/add-note-black.svg";
import cancelIcon from "../../assets/images/order/cancel.svg";
import pishFactorIcon from "../../assets/images/order/pish-factor.svg";
import viewDocumentsIcon from "../../assets/images/order/View-documents.svg";
import financialCheckIcon from "./../../assets/images/order/financial-check.svg";
import uploadIcon from "./../../assets/images/order/Upload-documents.svg";
import resultIcon from "./../../assets/images/order/Result.svg";
import waitingIcon from "../../assets/images/main/Waiting.svg";
import freeIcon from "../../assets/images/order/free1.svg";
import coodIcon from "../../assets/images/order/cood.svg";
import lowWhitePriorityIcon from "./../../assets/images/order/priority/low-white.svg";
import followUpDateIcon from "../../assets/images/order/follow-up-date.svg";

// Actions
import { notesActions } from "../../../actions";

//components
import { AddNotesModal } from "./addNotesModal";
import { EditField } from "./editField";
import { CancelProductOrder } from "./cancelProductOrder";
import { EditeProductOrder } from "./editProductOrder";
import { Notes } from "./notes";
import { ShareLinkOrder } from "./shareLinkOrder";
import { Note } from "./note";
import { FinancialCheckModal } from "./financialCheckModal";
import { ResultOrder } from "./resultOrder";
import { FreeOrder } from "./freeOrder";
import { TrackingCodeModal } from "./trackingCode";
import { PriorityBadge } from "./priorityBadge";
import { FollowUpDateModal } from "./followUpDateModal";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff !important",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  productCard: {
    width: "100%",
  },
  rounded: {
    borderRadius: "15px",
  },
  paper: {
    maxWidth: "700px",
    borderRadius: "15px",
    overflowY: "visible",
  },
}));

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
  setCustomerInfoShow,
  setPrioritizeModalShow
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let [print, setPrint] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [cancelModalShow, setCancelModalShow] = useState(false);
  const [editOrder, setEditOrder] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [isShareLinkOrder, setIsShareLinkOrder] = useState(false);
  const [financialCheckModal, setFinancialCheckModal] = useState(false);
  const [resultOrderModal, setResultOrderModal] = useState(false);
  const [freeModalShow, setFreeModalShow] = useState(false);
  const [followUpDateModal, setFollowUpDateModal] = useState(false);
  const [coodPeygiriAcceptModalShow, setCoodPeygiriAcceptModalShow] =
    useState(false);
  const [freeStatus, setFreeStatus] = useState("");

  const [isPrivate, setIsPrivate] = useState(order.notes.isPrivate);
  // const [showDocModalShow, setShowDocModalShow] = useState(false)
  let editStatusNotesLoading = useSelector((state) => state.editStatusNotes);
  const { user: userInfo, loading: userInfoLoading } = useSelector(
    (state) => state.appInfo
  );

  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [orderId, setOrderId] = useState("");
  const [productId, setProductId] = useState("");
  const [editProductOrder, setEditProductOrder] = useState("");

  const getTotalPrice = (order) => {
    let total = 0;
    order.map((item) => {
      total += item.sellingPrice * item.quantity;
    });
    return total;
  };

  const handleClose = () => {
    setOpen(false);
  };

  let toggleHanler = (e) => {
    if (e.target.checked === true) {
      dispatch(notesActions.editStatusNotes(order.id, "1"));
    } else if (e.target.checked === false) {
      dispatch(notesActions.editStatusNotes(order.id, "0"));
    }
    setTimeout(() => {
      setOrderId("");
    }, 1000);
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
      className={`m-auto mt-3 mb-4 pb-3 bg-light productCard border-0 lh-lg ${
        !print ? "noPrint" : ""
      } mx-1 ${classes.productCard}`}
    >
      <PriorityBadge order={order} />

      <Row className="m-0 mt-0 noPrint">
        {order.sellers?.some((seller) => seller.active === true) &&
          order.status == 3 &&
          order.sellers[order.sellers.length - 1]?.id?._id ===
            userInfo.data?._id && (
            <Col className="d-flex justify-content-end ">
              <Button
                className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2 notes-round"
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
                <span className="noPrint me-1">آزاد کردن</span>
              </Button>
            </Col>
          )}
          {order.status == 3 && !order.priority && <Col className="d-flex justify-content-end">
          <Button
            className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2 notes-round"
            type="button"
            onClick={() => {
              setPrioritizeModalShow(true);
              setActiveOrder(order);
            }}
          >
            <img
              src={lowWhitePriorityIcon}
              height="25px"
              alt="low-priority-icon"
              className="col-3"
            />
            <span className="noPrint">اولویت</span>
          </Button>
        </Col>}
        {order.status == 0 ? null : (
          <Col className="d-flex justify-content-end">
            <Button
              className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2 notes-round"
              type="button"
              onClick={() => {
                setCoodPeygiriAcceptModalShow(true);
              }}
            >
              <img
                src={coodIcon}
                height="30px"
                width="45px"
                alt="print-icon"
                className="col-3"
              />
              <span className="noPrint me-1">کد پیگیری</span>
            </Button>
          </Col>
        )}
        <Col className="d-flex justify-content-center ">
          <Button
            className={`${
              order.status == 2 ? "w-50" : "w-100"
            } btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2 notes-round`}
            type="button"
            onClick={() => {
              setIsShareLinkOrder(true);
            }}
          >
            <img
              src={pishFactorIcon}
              height="25px"
              alt="edit-order-icon"
              className="col-3 py-1"
            />
            <span className="me-2">
              {order.status == 3 ? "پیش فاکتور" : "فاکتور"}
            </span>
          </Button>
        </Col>
        {userInfo?.data?.permission.financialConfirmationOrder &&
          order.status === 0 &&
          order.financialApproval.status == false && (
            <Col className="d-flex justify-content-center">
              <Button
                className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2 notes-round"
                type="button"
                onClick={() => {
                  setFinancialCheckModal(true);
                }}
              >
                <img
                  src={financialCheckIcon}
                  height="25px"
                  alt="edit-order-icon"
                  className="col-3 py-1"
                />
                <span>تایید مالی</span>
              </Button>
            </Col>
          )}
        {order.status !== 2 && order.financialApproval.status === false && (
          <Col className="d-flex justify-content-center">
            <Button
              className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2 notes-round"
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
              <span>ویرایش</span>
            </Button>
          </Col>
        )}
        <Col className="d-flex justify-content-center">
          <Button
            className={`${
              order.status == 2 ? "w-50" : "w-100"
            } btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2 notes-round`}
            type="button"
            onClick={() => {
              setDeliveryShow(true);
              setOrder(order.id);
            }}
          >
            <img
              src={deliveryIcon}
              height="25px"
              alt="delivery-icon"
              className="col-3"
            />
            <span>پیک</span>
          </Button>
        </Col>

        {/* <Col className="d-flex justify-content-center">
          <Button
            className={`${
              order.status == 2 ? "w-50" : "w-100"
            } btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2`}
            type="button"
            onClick={() => printWindow()}
          >
            <img
              src={printIcon}
              height="25px"
              alt="submit-icon"
              className="col-3 py-1"
            />
            <span>پیرینت</span>
          </Button>
        </Col> */}

        {order.status === 0 && order.financialApproval.status === false && (
          <Col className="d-flex justify-content-center">
            <Button
              className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2 notes-round"
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
              <span>لغو سفارش</span>
            </Button>
          </Col>
        )}

        {order.status === 3 && (
          <Col className="d-flex justify-content-center">
            <Button
              className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2 notes-round"
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
              <span>نتیجه</span>
            </Button>
          </Col>
        )}
        <Col className="d-flex justify-content-end">
          <Button
            className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2 notes-round"
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
        <Col className="d-flex justify-content-end">
          <Button
            className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2 notes-round"
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
        {order.status == 3 && order.trackingTime == undefined && (
          <Col className="d-flex justify-content-center">
            <Button
              className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2 notes-round"
              type="button"
              onClick={() => {
                setFollowUpDateModal(true);
              }}
            >
              <img
                src={followUpDateIcon}
                height="25px"
                alt="edit-order-icon"
                className="col-3 ms-1 "
              />
              <span>پیگیری شد</span>
            </Button>
          </Col>
        )}
      </Row>
      <Card.Body className="pb-0 ps-1 rounded-3 text-gray">
        <Row className="p-0 ps-2 m-0 ">
          <Card className="background-blue border-0 customer-round">
            <Card.Body className="pe-0 ps-0 ">
              <Row className="mx-2">
                {order.status === 0 && (
                  <Col className="p-0 d-flex justify-content-start">
                    <Card.Text>
                      تایید مالی :
                      {order.financialApproval.status === 1 ? (
                        <>
                          <img
                            src={tickIcon}
                            alt="tick-icon"
                            className="m-0 p-0 ms-1 p-1 icon--tick--confirm "
                          />
                          <span>{order.financialApproval.acceptedBy}</span>
                        </>
                      ) : order.financialApproval.status === 2 ? (
                        <>
                          <img
                            src={closeIcon}
                            alt="tick-icon"
                            className="m-0 p-0 ms-1 p-1 icon--tick--confirm "
                          />
                          <span>{order.financialApproval.acceptedBy}</span>
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
                    </Card.Text>
                  </Col>
                )}
                <Col className="p-0 d-flex ">
                  <Card.Text className="d-flex justify-content-end p-0">
                    تاریخ و ساعت :
                    <span className="me-2">{getDate(order.createdAt)}</span>
                    <span className="me-2">
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
                  </Card.Text>
                </Col>
                {order.support && order.support !== undefined && (
                  <Col className="p-0 d-flex  ">
                    <Card.Text>
                      شماره مشتری:{" "}
                      <span className="me-2">
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
                    </Card.Text>
                  </Col>
                )}
                <Col className="p-0 d-flex  ">
                  <Card.Text>
                    شماره همراه مشتری:{" "}
                    <span className="me-2">
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
                  </Card.Text>
                </Col>
                <Col className="p-0 d-flex  ">
                  <Card.Text>
                    نام مشتری:{" "}
                    <span className="me-2">{order.customer.family}</span>
                  </Card.Text>
                </Col>
              </Row>
              <Row className="flex-nowrap  mt-2 mx-2">
                {order.support && (
                  <Col className="p-0 d-flex ">
                    <Card.Text>
                      نام مجموعه:{" "}
                      <span className="me-2">{order.customer.company}</span>
                    </Card.Text>
                  </Col>
                )}
                {order.support && (
                  <Col className="p-0 d-flex justify-content-start">
                    <Card.Text>
                      شماره فروشنده:{" "}
                      <span className="me-2">
                        {order.seller === undefined
                          ? null
                          : persianJs(order.seller.mobile)
                              .englishNumber()
                              .toString()}
                      </span>
                    </Card.Text>
                  </Col>
                )}
                {order.support && (
                  <Col className="p-0 d-flex justify-content-start">
                    <Card.Text>
                      نام فروشنده:{" "}
                      <span className="me-2">
                        {order.seller === undefined
                          ? null
                          : order.seller.family}
                      </span>
                    </Card.Text>
                  </Col>
                )}
                <Col className="p-0 d-flex justify-content-start">
                  <Card.Text>
                    آدرس :{" "}
                    <span className="me-2">
                      {order.address &&
                        persianJs(order.address).englishNumber().toString()}
                    </span>
                  </Card.Text>
                </Col>
              </Row>
              <Row className="flex-nowrap  mt-2 mx-2">
                <Col className="p-0 d-flex ">
                  <Card.Text>
                    ثبت شده توسط:{" "}
                    <span>
                      {order.employee
                        ? order.employee.family
                        : order.sellers && order.sellers[0]?.id.family}
                    </span>
                  </Card.Text>
                </Col>
                <Col className="p-0 d-flex ">
                  <Card.Text>
                    تاریخ استفاده:{" "}
                    <span className="me-2">
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
                  </Card.Text>
                </Col>

                {order.sellers?.length > 0 && (
                  <Col className="p-0 d-flex">
                    <Card.Text>
                      دنبال کننده فعال:{" "}
                      <span>
                        {order.sellers[order.sellers.length - 1].id?.family}
                      </span>
                    </Card.Text>
                  </Col>
                )}

                <Col className="p-0 d-flex">
                  <Card.Text>
                    کد پیگیری:{" "}
                    <span>
                      {order.trackingCode &&
                        persianJs(order.trackingCode)
                          .englishNumber()
                          .toString()}
                    </span>
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>

        <Row className="m-0 mt-3 p-0 ps-2">
          <Col className="ms-xl-5 col-12 col-md-6">
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
                                    commaNumber(
                                      item.quantity * item.sellingPrice
                                    )
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
          </Col>
          <Col className="mb-3 noPrint">
            <div className="notes--page--dektop">
              <Container
                fluid
                className="m-0 p-0"
                style={{ position: "sticky", top: "0", zIndex: "2" }}
              >
                <Row className="m-0 p-0 header--notes--desktop d-flex flex-row justify-content-between ">
                  <Col className="m-0 p-0">
                    <Form.Group
                      className="fw-bold mx-4"
                      onChange={() => setIsPrivate(!isPrivate)}
                    >
                      <label htmlFor="r1">
                        {editStatusNotesLoading.loading &&
                        orderId == order.id ? (
                          <CircularProgress color="secondary" size={24} />
                        ) : (
                          <>
                            <input
                              type="checkbox"
                              id="r1"
                              name="r-group"
                              className="btn-toggle-status-notes--desktop"
                              checked={isPrivate}
                              onChange={(e) => {
                                toggleHanler(e);
                                setOrderId(order.id);
                              }}
                            />
                          </>
                        )}
                        <span className="text-light me-3">خصوصی</span>
                      </label>
                    </Form.Group>
                  </Col>
                  <Col className="m-0 p-0 d-flex justify-content-end">
                    <Button
                      className="m-0 p-0 py-1 btn-outline-dark btn--add--note--desktop border-0 noPrint ms-2 "
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
                        className="mx-2"
                      />
                      <span className="ms-2">اضافه یادداشت</span>
                    </Button>
                  </Col>
                </Row>
              </Container>
              <Container style={{ height: "195px", overflow: "hidden" }}>
                <Row>
                  <Col className="m-0 p-0">
                    {order.notes.Notes != undefined ? (
                      order.notes.Notes?.map((note, index) => (
                        <Note key={index} note={note} />
                      ))
                    ) : (
                      <span> هنوز یادداشتی برای این سفارش ثبت نشده است</span>
                    )}
                  </Col>
                </Row>
              </Container>
              <Container fluid className="m-0 p-0 w-100 mt-1">
                <Row className="m-0 p-0 ">
                  <Col className="m-0 p-0 d-flex justify-content-end ms-4 text--more--note--desktop">
                    <span onClick={() => setOpen(true)}>بیشتر ...</span>
                  </Col>
                </Row>
              </Container>
            </div>
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
        status={status}
      />
      <AddNotesModal
        show={showNotesModal}
        onHide={() => {
          setShowNotesModal(false);
        }}
        permission="true"
        orderId={order.id}
        status={status}
      />
      <Dialog
        onClose={handleClose}
        className="notes-round"
        aria-labelledby="notes-dialog"
        open={open}
        classes={{ paper: classes.paper }}
      >
        <Notes
          order={order}
          open={open}
          setOpen={setOpen}
          setShowNotesModal={setShowNotesModal}
          setActiveOrder={() => setActiveOrder(order)}
        />
      </Dialog>
      <Dialog
        classes={{ paper: classes.paper }}
        aria-labelledby="shareLink-dialog"
        open={isShareLinkOrder}
      >
        <ShareLinkOrder
          isShareLinkOrder={isShareLinkOrder}
          setIsShareLinkOrder={setIsShareLinkOrder}
          order={isShareLinkOrder ? order : null}
          customerInfoModal={() => {
            setCustomerInfoShow(true);
            setOrder(order.customer._id);
          }}
        />
      </Dialog>
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
        show={coodPeygiriAcceptModalShow}
        onHide={() => {
          setCoodPeygiriAcceptModalShow(false);
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
      {/* <ShowDocuments show={showDocModalShow} onHide={() => setShowDocModalShow(false)} order={activeOrder} /> */}
    </Card>
  );
};
