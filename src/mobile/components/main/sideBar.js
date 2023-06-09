import React from "react";
import { Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { SideBarItem } from "./sideBarItem";
import { List } from "@material-ui/core";

// Icons
import logo from "../../assets/images/crm-dark.svg";
import exitIcon from "../../assets/images/drawer/exit.svg";
import accountIcon from "../../assets/images/drawer/account.svg";
import settingIcon from "../../assets/images/drawer/setting.svg";

export const SideBar = ({ routes, setShowLogout }) => {
  let user_type = JSON.parse(localStorage.getItem("type"));

  return (
    <>
      <div className="sidebar sidebar--mobile noPrint">
        <Row className="m-0 p-0 py-3 d-flex flex-row">
          <Col className="d-flex justify-content-center">
            <img
              className=" noPrint"
              height="50px"
              src={logo}
              alt="crmx-logo"
            />
          </Col>
        </Row>
        <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className="flex-column sideBar--item--mobile"
                >
                    <Row className="m-0 p-0 ">
                    {routes.map((prop, key) => {
                        return (
                            <SideBarItem key={key} route={prop} />
                        );
                    })}
                    </Row>      
                </List>

        <Row
          className="m-0 p-0 d-flex justify-content-center align-items-center mt-auto dashboardIcons--desktop noPrint"
          style={{ position: "relative" }}
        >
          <Col className=" col-4">
            <Col onClick={(e) => setShowLogout(true)}>
              <img
                className="m-auto d-block exit--icon--desktop noPrint"
                src={exitIcon}
                height="40px"
                alt="exit-icon"
              />
            </Col>
          </Col>
          {user_type === 1 && (
            <Col className=" col-4">
              <NavLink to="/setting">
                <img
                  className="m-auto d-block noPrint"
                  src={settingIcon}
                  height="40px"
                  alt="setting-icon"
                />
              </NavLink>
            </Col>
          )}
          <Col xs={4} sm={4} md={4} lg={4} className=" col-4">
            <NavLink to="/account">
              <img
                className="m-auto d-block noPrint"
                src={accountIcon}
                height="40px"
                alt="acount-icon"
              />
            </NavLink>
          </Col>
        </Row>
      </div>
    </>
  );
};
