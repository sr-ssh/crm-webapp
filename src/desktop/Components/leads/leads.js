import React, { useEffect, useState, useRef } from "react";
import { Container, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../../helpers";

// Actions
import { productActions, employeeActions, leadActions } from "../../../actions";
// Components
import { AddLead } from "./addLead";
import { Header } from "../base/headerExcel2";
import { Lead } from "./lead";

export const Leads = (props) => {
  const refLead = useRef(null);

  const [addModalShow, setAddModalShow] = useState(false);
  const [glowingCard, setglowingCard] = useState(false);
  const dispatch = useDispatch();
  const { leads: leads, loading: loading } = useSelector(
    (state) => state.getLeads
  );
  const addloading = useSelector((state) => state.addLead.loading);
  const uploadloading = useSelector((state) => state.uploadExcel.loading);
  const { user: userInfo, loading: userInfoLoading } = useSelector(
    (state) => state.appInfo
  );

  const sideBar = useSelector((state) => state.sideBar);
  const [activeId, setActiveId] = useState({});

  useEffect(() => {
    if (!addModalShow) dispatch(leadActions.getLeads());
  }, [dispatch, addModalShow, addloading, uploadloading]);

  let acceptLead = (e, id) => {
    e.preventDefault();
    setActiveId(id);
    dispatch(leadActions.editLeadStatus({ leadId: id, status: 0 }));
  };

  let failLead = (e, id) => {
    e.preventDefault();
    setActiveId(id);
    dispatch(leadActions.editLeadStatus({ leadId: id, status: 1 }));
  };

  let addOrder = (e, id, family, mobile) => {
    history.push({
      pathname: "/order/add",
      state: { id, family, mobile },
    });
  };

  let uploadHandler = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("excel", e.target.files[0]);
    dispatch(leadActions.uploadExcel(formData));
  };

  useEffect(() => {
    if (
      loading == false &&
      leads &&
      leads.length > 0 &&
      props.location.state != null &&
      refLead.current != null &&
      glowingCard == false
    ) {
      setglowingCard(true);
      refLead.current.scrollIntoView();
      setTimeout(() => {
        setglowingCard(false);
      }, 5000);
    }
  }, [props.location.state, loading]);


  return (
    <>
      <Header
        isBTNSearch={false}
        userPermission={userInfo?.data?.permission.uploadExcelLeads}
        isGetExcel={true}
        getExcel={uploadHandler}
        isBtnAdd={"اضافه سرنخ"}
        btnAdd={() => setAddModalShow(true)}
      />
      <div
        className="product-page d-flex flex-column align-items-center margin--top--header"
        style={{ paddingRight: sideBar.open ? "250px" : 0 }}
      >
        <Container
          fluid
          className="m-0 px-4 w-100 d-flex justify-content-evenly flex-wrap "
        >
          {!loading && leads && leads.length > 0
            ? leads.map((item, index) => (
                <Col
                  key={index}
                  xs={4}
                  ref={item._id == props?.location?.state?.id ? refLead : null}
                >
                  <Lead
                    addOrder={addOrder}
                    acceptLead={acceptLead}
                    sideBar={sideBar.open}
                    item={item}
                    activeId={activeId}
                    failLead={failLead}
                    glowingCard={glowingCard}
                    keyRef={props.location?.state?.id}
                  />
                </Col>
              ))
            : null}
          <AddLead show={addModalShow} onHide={() => setAddModalShow(false)} />
        </Container>
      </div>
    </>
  );
};
