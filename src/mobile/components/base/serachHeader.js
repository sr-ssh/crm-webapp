import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { history } from "../../../helpers/history";

//icons
import backIcon from "./../../assets/images/back.svg";
import searchIcon from "./../../assets/images/search-light.svg";
import registerDateIcon from "./../../assets/images/order/sort/Registered-date-white.svg";
import trackingDateIcon from "./../../assets/images/order/sort/Follow-up-date-white.svg";
import priorityIcon from "./../../assets/images/order/sort/attention-white.svg";

export const Header = ({
  title,
  modalShow,
  setModalShow,
  sort,
  setSortModalShow = {},
  isSort = false,
}) => {
  return (
    <>
      <Navbar variant="dark" sticky="top" className="py-2 my-nav noPrint">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="align-items-center w-100">
            {isSort && (
              <Nav.Link
                className="ms-4 px-1 py-1 me-4 backgound--dark--blue radius-10"
                onClick={() => setSortModalShow(true)}
              >
                <img
                  src={
                    sort == 1
                      ? registerDateIcon
                      : sort == 2
                      ? priorityIcon
                      : trackingDateIcon
                  }
                  height="30px"
                  alt="plus-icon"
                  className="noPrint"
                />
              </Nav.Link>
            )}

            <Nav.Link
              className={`${isSort ? "ms-4  me-2" : "ms-auto"} pe-4`}
              onClick={() => setModalShow(true)}
            >
              <img
                src={searchIcon}
                height="40px"
                alt="plus-icon"
                className="noPrint"
              />
            </Nav.Link>
            <Navbar.Text className="fs-6 fw-normal text-light noPrint ms-4">
              {title}
            </Navbar.Text>
            <Nav.Link
              onClick={() => history.push("/dashboard")}
              className="me-auto ps-4"
            >
              <img src={backIcon} height="30px" alt="back-icon" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
