import React, { useEffect, useState } from "react";
import moment from "jalali-moment";
import {
  Container,
  Form,
  Card,
  Table,
  Row,
  Col,
  Spinner,
  Button,
} from "react-bootstrap";
import persianJs from "persianjs/persian.min";
import { Dialog, CircularProgress } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import commaNumber from "comma-number";

//icons
import tickIcon from "./../../assets/images/order/tick.svg";
import closeIcon from "./../../assets/images/order/close.svg";
import deliveryIcon from "./../../assets/images/order/delivery1.svg";
import printIcon from "./../../assets/images/order/print.svg";
import submitIcon from "./../../assets/images/order/submit.svg";
import editIcon from "../../assets/images/Products/edit.svg";
import deleteIcon from "../../assets/images/delete.svg";
import editeOrderIcon from "../../assets/images/order/edit-order-list.svg";
import addNoteIcon from "../../assets/images/order/add-note-black.svg";
import noteListIcon from "../../assets/images/order/note-list-white.svg";
import cancelIcon from "../../assets/images/order/cancel.svg";
import pishFactorIcon from "../../assets/images/order/pish-factor.svg";
import financialCheckIcon from "./../../assets/images/order/financial-check.svg";
import waitingIcon from "../../assets/images/main/Waiting.svg";
import AddIcon from "@material-ui/icons/Add";

// Actions
import { notesActions, orderActions, receiptActions } from "../../../actions";

//components
import { AddNotesModal } from "./addNotesModal";
import { EditField } from "./editField";
import { history } from "../../../helpers/history";
import { CancelProductOrder } from "./cancelProductOrder";
import { EditFactor } from "./editFactor";
import { Notes } from "./notes";
import { Note } from "./note";
import { FinancialCheckModal } from "./financialCheckModal";
import { AddReminder } from "../reminder/addReminder";

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
  btnAddReminder: {
    color: "#fff",
  },
}));

export const Factor = ({
  factor,
  setCancelFactorShow,
  setDeliveryShow,
  cancelOrderShow,
  setCancelOrderShow,
  recordOrderShow = "",
  setRecordOrderShow = {},
  setActiveFactor,
  setOrder,
  status,
  ...props
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let [print, setPrint] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [cancelModalShow, setCancelModalShow] = useState(false);
  const [editFactorModalShow, setEditFactorModalShow] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [isShareLinkOrder, setIsShareLinkOrder] = useState(false);
  const [isPrivate, setIsPrivate] = useState(factor?.note?.isPrivate);
  const [financialCheckModal, setFinancialCheckModal] = useState(false);
  const { user: userInfo, loading: userInfoLoading } = useSelector(
    (state) => state.appInfo
  );
  const [addReminderModal, setAddReminderModal] = useState(false);

  let editStatusNotesLoading = useSelector((state) => state.editStatusNotes);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [factorId, setFactorId] = useState("");
  const [productId, setProductId] = useState("");
  const [editFactor, setEditFactor] = useState("");

  const edit = (value, name, factorId, productId) => {
    setInput(value);
    setName(name);
    setProductId(productId);
    setFactorId(factorId);
    setEditModalShow(true);
  };

  const getTotalPrice = (factor) => {
    let total = 0;
    factor.map((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  let toggleHanler = (e, id) => {
    if (e.target.checked === true) {
      dispatch(receiptActions.editReceiptNoteStatus(id, "1"));
    } else if (e.target.checked === false) {
      dispatch(receiptActions.editReceiptNoteStatus(id, "0"));
    }
    setTimeout(() => {
      setFactorId("");
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

  useEffect(() => {
    setIsPrivate(factor.note?.private || false);
  }, [factor]);

  return (
    <Card
      ref={factor.id == props?.keyRef ? props.refFactor : null}
      className={`m-auto mt-3 bg-light productCard border-0 lh-lg ${
        !print ? "noPrint" : ""
      } mx-1 ${classes.productCard}`}
    >
      <Row className="mx-2 mt-3 noPrint d-flex justify-content-between">
        {userInfo?.data?.permission?.purchaseConfirmationInvoice &&
          factor.shopApproval.status === 0 && (
            <Col className="d-flex justify-content-end col-2">
              <Button
                className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2 justify-content-center"
                type="button"
                onClick={() => {
                  setFinancialCheckModal(true);
                }}
              >
                <img
                  src={financialCheckIcon}
                  height="25px"
                  alt="print-icon"
                  className="ms-3"
                />
                <span className="noPrint">تایید خرید</span>
              </Button>
            </Col>
          )}
        {parseInt(factor.shopApproval.status) !== 1 && (
          <Col className="d-flex justify-content-start col-2">
            <Button
              className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2 justify-content-center"
              type="button"
              onClick={() => {
                setEditFactorModalShow(true);
                setEditFactor(factor);
              }}
            >
              <img
                src={editeOrderIcon}
                height="30px"
                alt="edit-order-icon"
                className="ms-3 py-1"
              />
              <span className="noPrint">ویرایش</span>
            </Button>
          </Col>
        )}
        <Col className="d-flex justify-content-cent col-2">
          <Button
            className={`w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2 justify-content-center`}
            type="button"
            onClick={() => printWindow()}
          >
            <img
              src={printIcon}
              height="30px"
              alt="submit-icon"
              className="ms-3 py-1"
            />
            <span className="noPrint">چاپ</span>
          </Button>
        </Col>
        {parseInt(factor.shopApproval.status) !== 1 && (
          <Col className="d-flex justify-content-end col-2">
            <Button
              className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2 justify-content-center"
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
                className="ms-3"
              />
              <span className="noPrint">لغو فاکتور</span>
            </Button>
          </Col>
        )}
        <Col className="d-flex justify-content-end col-2">
          <Button
            className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2 justify-content-center"
            type="button"
            onClick={() => {
              setAddReminderModal(true);
            }}
          >
                
            <AddIcon className="ms-3" classes={{ root: classes.btnAddReminder }} />
            <span>یادآوری</span>
          </Button>
        </Col>
      </Row>
      <Card.Body className="pb-0 ps-1 rounded-3 text-gray">
        <Row className="p-0 ps-2 m-0 ">
          <Card className="background-blue border-0 customer-round">
            <Card.Body className="p-0 my-2 ">
              <Row className="mx-2 mb-3 d-flex justify-content-around">
                {
                  <Col className="p-0 d-flex justify-content-start">
                    <Card.Text>
                      تایید خرید :
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
                    </Card.Text>
                  </Col>
                }
                <Col className="p-0 d-flex justify-content-start">
                  تاریخ و ساعت
                  <span className="me-2">{getDate(factor.createdAt)}</span>
                  <span className="me-2">
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
                <Col className="p-0 d-flex justify-content-center">
                  نام :<span className="me-2">{factor.supplier.family}</span>
                </Col>
                <Col className="p-0 d-flex justify-content-center">
                  موبایل:
                  <span className="me-2">
                    {factor.supplier.mobile &&
                      persianJs(factor.supplier.mobile)
                        .englishNumber()
                        .toString()}
                  </span>
                </Col>
              </Row>
              <Row className="flex-nowrap mt-2 mx-2">
                <Col className="p-0 d-flex justify-content-start">
                  آدرس:
                  <span className="me-2">
                    {factor.address &&
                      persianJs(factor.address).englishNumber().toString()}
                  </span>
                </Col>
                <Col className="p-0 d-flex flex-flex-grow-1"></Col>
                <Col className="p-0 d-flex flex-flex-grow-1"></Col>
                <Col className="p-0 d-flex justify-content-center">
                  ثبت شده توسط :
                  <span className="me-2">{factor.employee?.family}</span>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>

        <Row className="m-0 mt-3 p-0 ps-2">
          <Col className="ms-xl-5 col-12 col-md-5">
            <Table borderless size="sm">
              <thead>
                <tr>
                  <th colspan="2">سفارش</th>
                  <th>قیمت(تومان)</th>
                  <th>تعداد</th>
                </tr>
              </thead>
              <tbody>
                {factor.stock.length
                  ? factor.stock.map((item) => {
                      return (
                        <tr key={item.name}>
                          <td colspan="2" className="pb-3">
                            {item.name &&
                              persianJs(item.name).englishNumber().toString()}
                          </td>
                          <td className="pb-3">
                            <Row>
                              <Col className="ps-0">
                                {item.quantity * item.price &&
                                  persianJs(
                                    commaNumber(item.quantity * item.price)
                                  )
                                    .englishNumber()
                                    .toString()}
                              </Col>
                            </Row>
                          </td>
                          <td className="pb-3">
                            <Row>
                              <Col className="ps-0">
                                {item.quantity &&
                                  persianJs(item.quantity)
                                    .englishNumber()
                                    .toString()}
                              </Col>
                            </Row>
                          </td>
                        </tr>
                      );
                    })
                  : null}
                <tr className="border-top-blue">
                  <td colspan="2" className="pt-4">
                    جمع کل:
                  </td>
                  <td className="fs-6 pt-4">
                    {getTotalPrice(factor.stock) &&
                      persianJs(commaNumber(getTotalPrice(factor.stock)))
                        .englishNumber()
                        .toString()}{" "}
                    <span>تومان</span>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col className="mb-3 me-xl-5 noPrint">
            <div className="notes--factor--page--dektop">
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
                      <label for="r1">
                        {editStatusNotesLoading.loading &&
                        factorId == factor.id ? (
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
                                toggleHanler(e, factor.id);
                                setFactorId(factor.id);
                              }}
                            />
                          </>
                        )}
                        <span className="text-light me-3">خصوصی</span>
                      </label>
                    </Form.Group>
                  </Col>
                </Row>
              </Container>
              <Container
                style={{ height: "calc(100% - 50px)", overflow: "auto" }}
              >
                <Row style={{ height: "100%" }}>
                  {factor.note && factor.note.text ? (
                    <Note note={factor.note} />
                  ) : (
                    <Col className="m-0 p-0 d-flex justify-content-center align-items-center">
                      <span> هنوز یادداشتی برای این فاکتور ثبت نشده است</span>
                    </Col>
                  )}
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </Card.Body>
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
      />
    </Card>
  );
};
