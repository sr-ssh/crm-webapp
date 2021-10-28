import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import teamxLogo from "../../assets/images/crm-dark.svg";
import accountIcon from "../../assets/images/drawer/account.svg";
import settingIcon from "../../assets/images/drawer/setting.svg";
import exitIcon from "../../assets/images/drawer/exit.svg";

import { userActions } from "../../../actions";
import { useDispatch } from "react-redux";
import { employeeActions } from "../../../actions/employeeActions";
import { isPermitted } from '../../../helpers/permission'


export const SidebarItems = () => {
  let permissions = JSON.parse(localStorage.getItem("permissions"));
  let user_type = JSON.parse(localStorage.getItem("type"));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!permissions) dispatch(employeeActions.getPermissions());
  }, [dispatch, permissions]);

  return (
    <Container fluid className="d-flex flex-column h-100">
      <Row className="my-2">
        <Col>
          <img
            src={teamxLogo}
            height="55px"
            className="m-auto d-block pt-2"
            alt="logo"
          />
        </Col>
      </Row>
      <Row>
        {
          isPermitted("/lead") && <Col
          xs={10}
          sm={10}
          md={10}
          lg={10}
          className="py-3 mx-3 fw-bold sidebarItem"
        >
          <Link to="/lead">سرنخ</Link>
        </Col>}
        {isPermitted("/order/add") && (
          <Col
            xs={10}
            sm={10}
            md={10}
            lg={10}
            className="py-3 mx-3 fw-bold sidebarItem"
          >
            <Link to="/order/add">ثبت سفارش</Link>
          </Col>
        )}
        {isPermitted("/saleopprotunity") && (
          <Col
            xs={10}
            sm={10}
            md={10}
            lg={10}
            className="py-3 mx-3 fw-bold sidebarItem"
          >
            <Link to="/saleopprotunity">فرصت فروش</Link>
          </Col>
        )}
        {isPermitted("/orders") && (
          <Col
            xs={10}
            sm={10}
            md={10}
            lg={10}
            className="py-3 mx-3 fw-bold sidebarItem"
          >
            <Link to="/orders">سفارش ها</Link>
          </Col>
        )}
        {isPermitted("/reminders") && (
          <Col
            xs={10}
            sm={10}
            md={10}
            lg={10}
            className="py-3 mx-3 fw-bold sidebarItem"
          >
            <Link to="/reminders">یادآوری</Link>
          </Col>
        )}
        {isPermitted("/products") && (
          <Col
            xs={10}
            sm={10}
            md={10}
            lg={10}
            className="py-3 mx-3 fw-bold sidebarItem"
          >
            <Link to="/products">محصولات</Link>
          </Col>
        )}
        {isPermitted("/finance") && (
          <Col
            xs={10}
            sm={10}
            md={10}
            lg={10}
            className="py-3 mx-3 fw-bold sidebarItem"
          >
            <Link to="/finance">مالی</Link>
          </Col>
        )}
        {isPermitted("/customers") && (
          <Col
            xs={10}
            sm={10}
            md={10}
            lg={10}
            className="py-3 mx-3 fw-bold sidebarItem"
          >
            <Link to="/customers">مشتریان</Link>
          </Col>
        )}
        {isPermitted("/employees") && (
          <Col
            xs={10}
            sm={10}
            md={10}
            lg={10}
            className="py-3 mx-3 fw-bold sidebarItem"
          >
            <Link to="/employees">کارمندان</Link>
          </Col>
        )}
        {/* {isPermitted("/discounts") && (
          <Col
            xs={10}
            sm={10}
            md={10}
            lg={10}
            className="py-3 mx-3 fw-bold sidebarItem"
          >
            <Link to="/discounts">تخفیف ها</Link>
          </Col>
        )} */}
        {isPermitted("/factor/add") && <Col
          xs={10}
          sm={10}
          md={10}
          lg={10}
          className="py-3 mx-3 fw-bold sidebarItem"
        >
          <Link to="/factor/add">ثبت فاکتور</Link>
        </Col>}
        {isPermitted("/factor") && <Col
          xs={10}
          sm={10}
          md={10}
          lg={10}
          className="py-3 mx-3 fw-bold sidebarItem"
        >
          <Link to="/factor">فاکتورها</Link>
        </Col>}
        {isPermitted("/suppliers") && <Col
          xs={10}
          sm={10}
          md={10}
          lg={10}
          className="py-3 mx-3 fw-bold sidebarItem"
        >
          <Link to="/suppliers">تامین کننده ها</Link>
        </Col>}
        {isPermitted("/stock") && <Col
          xs={10}
          sm={10}
          md={10}
          lg={10}
          className="py-3 mx-3 fw-bold sidebarItem"
        >
          <Link to="/stock">لیست مواد خام</Link>
        </Col>}
      </Row>

      <Row className="d-flex justify-content-center align-items-center mt-auto dashboardIcons">
        <Col className="my-3 col-4">
          <Col onClick={(e) => userActions.logout()}>
            <img
              className="m-auto d-block"
              src={exitIcon}
              height="40px"
              alt="exit-icon"
            />
          </Col>
        </Col>
        {user_type === 1 && (
          <Col className="my-3 col-4">
            <Link to="/setting">
              <img
                className="m-auto d-block"
                src={settingIcon}
                height="40px"
                alt="setting-icon"
              />
            </Link>
          </Col>
        )}
        <Col xs={4} sm={4} md={4} lg={4} className="my-3">
          <Link to="/account">
            <img
              className="m-auto d-block"
              src={accountIcon}
              height="40px"
              alt="acount-icon"
            />
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
