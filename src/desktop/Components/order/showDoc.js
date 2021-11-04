import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Modal, Card } from "react-bootstrap";

// Components
import CircularProgress from "@material-ui/core/CircularProgress";
// Actions
import { orderActions } from "../../../actions";

// Icons
import closeIcon from "../../assets/images/close.svg";
import fileIcon from "../../assets/images/order/file-blue.svg";
import { history } from "../../../helpers";

export const ShowDocuments = (props) => {
  const [docs, setDocs] = useState(useSelector((state) => state.showDoc.data));
  const [productnameValidated, setProductNameValidated] = useState(false);
  const documents = useSelector((state) => state.showDoc.data);
  const documentsLoading = useSelector((state) => state.showDoc.loading);

  props.show && console.log(documents, documentsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.show == true) {
      dispatch(orderActions.showDoc({ orderId: props.order.id }));
      setDocs(documents);
    }
  }, [props.order, props.show]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      className="mx-3 order-serach-modal--large"
    >
      <Modal.Body
        className="add-product px-4"
        style={{ maxHeight: documents?.length == 0 ? null : "80vh" }}
      >
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
        <Card
          className="m-auto mt-2 mb-2 bg-light productCard lh-lg "
          style={{ maxHeight: "70vh" }}
        >
          <Card.Body
            className={`card--body--show--doc--mobile p-3 px-4 mx-2 rounded-3 fs-6-sm ${
              documentsLoading && "d-flex justify-content-center"
            } `}
          >
            {props.show && !documentsLoading && documents?.length == 0 && (
              <>
                <h6 className="mt-5 text-center">
                  هنوز مدرکی برای این سفارش اضافه نشده است
                </h6>
                <br />{" "}
                <h6
                  className="mb-5 text-center text--dark--blue"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    props.onHide(false);
                    setProductNameValidated(false);
                    props.setActiveOrder(props.order);
                    props.UploadModalShow();
                  }}
                >
                  بارگذاری مدرک
                </h6>{" "}
              </>
            )}
            {documentsLoading ? (
              <CircularProgress className="my-5 text-center" />
            ) : null}

            <Row>
              {props.show
                ? documents?.length > 0 &&
                  documents?.map((doc, index) => {
                    const filetypes =
                      /apng|avif|gif|jpg|jpeg|jfif|pjpeg|pjp|png|svg|webp/;
                    const extname = filetypes.test(doc.fileType);
                    return (
                      <Col key={index} xs={4} className="pb-3 px-4">
                        <Col>{doc.name}</Col>
                        <Col>
                          <Card
                            className="productCard bg-light lh-lg border--blue"
                            style={{ height: "106px" }}
                            onClick={() => {
                              window.open(doc.location, "_blank");
                            }}
                          >
                            <Card.Body
                              className={`rounded-3 ${
                                !extname
                                  ? "d-flex flex-column justify-content-center align-items-center"
                                  : null
                              }  `}
                            >
                              {extname ? (
                                doc.location && (
                                  <img
                                    src={doc.location}
                                    alt="document-picc"
                                    className="doc--img img-fluid"
                                  />
                                )
                              ) : (
                                <>
                                  <img
                                    src={fileIcon}
                                    alt="document-pic"
                                    className="w-100"
                                    height="35px"
                                  />
                                  <span className="fw-bold mt-1">
                                    {doc.fileType}
                                  </span>
                                </>
                              )}
                            </Card.Body>
                          </Card>
                        </Col>
                      </Col>
                    );
                  })
                : null}
            </Row>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
};
