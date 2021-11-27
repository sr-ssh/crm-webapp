import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Spinner, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../../helpers";
// Actions
import { leadActions, employeeActions } from "../../../actions";
// Components
import { Header } from "../base/productsExcelHeader2";
import { AddLead } from "./addLead";
import { Lead } from "./lead";
import { AddReminder } from "../reminder/addReminder";

export const Leads = (props) => {
  const refLead = useRef(null);
  const [addModalShow, setAddModalShow] = useState(false);
  const [lead, setLead] = useState({});
  const [activeId, setActiveId] = useState({});
  const dispatch = useDispatch();
  const { leads: leads, loading: leadsLoading } = useSelector(
    (state) => state.getLeads
  );
  const editLoading = useSelector((state) => state.editLeadStatus.loading);
  const addloading = useSelector((state) => state.addLead.loading);
  const uploadLoading = useSelector((state) => state.uploadExcel.loading);
  const userPermissions = useSelector(
    (state) => state.getPermissions.permissions
  );
  const [addReminderModal, setAddReminderModal] = useState(false);

  let uploadHandler = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("excel", e.target.files[0]);
    dispatch(leadActions.uploadExcel(formData));
  };

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

  useEffect(() => {
    if (leadsLoading == false && refLead && refLead.current != null) {
      refLead.current.scrollIntoView();
    }
    return () => {
      window.history.replaceState({}, document.title);
    };
  }, [leadsLoading, refLead]);

  useEffect(() => {
    if (!addModalShow) dispatch(leadActions.getLeads());
  }, [dispatch, addModalShow, addloading, editLoading, uploadLoading]);

  return (
    <div className="product-page">
      <Header
        title="سرنخ"
        uploadHandler={uploadHandler}
        setModalShow={setAddModalShow}
        userPermission={true}
      />
      <Container className="m-auto">
        {!leadsLoading && editLoading === false && (
          <Row>
            <Col className="col-3 mt-2 m-auto ">
              <Spinner className="m-auto d-block" animation="border" />
            </Col>
          </Row>
        )}
        {!leadsLoading && leads && leads.length > 0
          ? leads.map((item, index) => (
              <Lead
                key={index}
                item={item}
                acceptLead={acceptLead}
                activeId={activeId}
                addOrder={addOrder}
                failLead={failLead}
                setAddReminderModal={(e, title) => {
                  setAddReminderModal(true);
                  setActiveId({ idLead: e, title: title });
                }}
                leadRef={refLead}
                refKey={
                  props.history.location.state &&
                  props.history.location.state.id
                }
              />
            ))
          : null}

        <AddLead show={addModalShow} onHide={() => setAddModalShow(false)} />
        <AddReminder
          show={addReminderModal}
          onHide={() => setAddReminderModal(false)}
          isPersonal={false}
          aditional={{ typeReminder: 1, referenceId: activeId.idLead }}
          title={activeId.title}
        />
      </Container>
    </div>
  );
};
