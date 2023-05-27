import React from "react";
import {
  Button,
  Col,
  Container,
  Drawer,
  Nav,
  Navbar,
  Offcanvas,
  Row,
  Tab,
} from "react-bootstrap";
import Home from "../pages/Home";
import NavBarAdmin from "../pages/Adminpages/CustumNavBarAdmin";
import OrderManagement from "../pages/Adminpages/OrderManagement";
import Categories from "../pages/Adminpages/Categories";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillShopping, AiOutlineMenu } from "react-icons/ai";
import "../styles/Products.css";
import CustomDropdown from "./CustomDropdown";
import CustomSearchBar from "./CustomSearchComponent";

export default function CustomSideBar() {
  // const [show, setShow] = useState(true);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" 
        onClick={handleShow}>
          <AiOutlineMenu />
        </Button> */}

      <Offcanvas
        show={true}
        backdrop={false}
        className="text-bg-light"
        // onHide={handleClose}
      >
        <Offcanvas.Header
        // closeButton
        >
          <Offcanvas.Title>
              <Navbar.Brand
                style={{ margin: "0.5%" }}
                className="fs-1 fw-semibold text-primary text-opacity-75 shadow-sm rounded"
                as={Link}
                to="/home"
              >
                <AiFillShopping />
                V-Shop
              </Navbar.Brand>
            </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Col sm={10}>
            <Nav className="flex-column">

              <Nav.Item>
                <Nav.Link as={Link} to="/home">
                  Home
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link as={Link} to="/order-history">
                  Order History
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link as={Link} to="/cart">
                  My Cart
                </Nav.Link>
              </Nav.Item>

              {/* <Nav.Item>
            <CustomDropdown />
                </Nav.Item> */}
            </Nav>
          </Col>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
