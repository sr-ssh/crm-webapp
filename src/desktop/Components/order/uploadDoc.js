import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Modal, Spinner } from "react-bootstrap";

// Actions
import { orderActions } from "../../../actions";

// Icons
import closeIcon from "../../assets/images/close.svg";
import fileIcon from "../../assets/images/order/file.svg";

export const UploadDocuments = (props) => {
  const [product, setProduct] = useState(null);
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [validated, setValidated] = useState(false);
  const [productnameValidated, setProductNameValidated] = useState(false);
  const addProductLoading = useSelector((state) => state.uploadDoc.loading);
  const dispatch = useDispatch();

  const data = new FormData();

  let formHandler = (e) => {
    e.preventDefault();

    console.log(product);
    if (file && fileName) {
      data.append("file", file);
      data.append("fileName", fileName);
      data.append("orderId", props.order.id);
      dispatch(orderActions.uploadDoc(data));
      setFileName("");
      setFile("");
      setFile(null);
      setProductNameValidated(false);
    } else {
      setProductNameValidated(true);
    }
  };

  useEffect(() => {
    setFileName("");
    setFile("");
  }, []);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="mx-3 order-serach-modal--medium"
    >
      <Modal.Body className="add-product px-4">
        <Button
          className="border-0 customer-modal-close--desktop"
          type="button"
          onClick={(e) => {
            props.onHide(false);
            setProductNameValidated(false);
          }}
        >
          <img
            className="d-flex m-auto customer-modal-close-svg--desktop"
            src={closeIcon}
            alt="close-btn"
          />
        </Button>
        <Form onSubmit={formHandler}>
          <Row className="mt-3">
            <Col className="col-12 order-filter-input">
              <Form.Group controlId="name">
                <Form.Label className="pe-3">اسم فایل</Form.Label>
                <Form.Control
                  name="productname"
                  className="order-input"
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  isInvalid={!product?.name && productnameValidated}
                  isValid={
                    (product?.name && validated) ||
                    (productnameValidated && product?.name && true)
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Button
                className="btn--upload--order w-100 d-flex flex-row align-items-center radius-16 receipt--add--note py-4 pe-3 h-100"
                style={{ position: "relative" }}
              >
                <img
                  className=""
                  src={fileIcon}
                  alt="file-icon"
                  height="40px"
                />
                <span className="pe-4 fs-6-sm file--icon fw-bold">
                  {!file ? "آدرس فایل را مشخص کنید" : file.name}
                </span>
                <input
                  type="file"
                  id="file"
                  name="file"
                  className="btn--upload"
                  accept=".xlsx, .xls, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    setFile(e.target.files[0]);
                  }}
                  title="آدرس فایل را مشخص کنید"
                />
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              {addProductLoading ? (
                <Button
                  className="fw-bold order-submit border-0 w-100 mt-3"
                  size="lg"
                  type="submit"
                  disabled
                >
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  در حال انجام عملیات...
                </Button>
              ) : (
                <Button
                  className="fw-bold receipt--btn--mobile border-0 w-100 mt-3"
                  size="lg"
                  type="submit"
                  block
                >
                  ثبت
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
