import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { getAllCategories, searchProducts } from "../services/services";
import CustomDropdown from "./CustomDropdown";
import CustomSearchBar from "./CustomSearchComponent";
import UserProfile from "./UserProfile";
import { Modal } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { AiFillShopping } from "react-icons/ai";

export default function NavBar() {
  const [categories, setCategories] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    callGetAllCategoriesApi();
  }, []);

  const callGetAllCategoriesApi = () => {
    getAllCategories()
      .then((res) => {
        if (res) {
          setCategories(res);
        }
      })
      .catch((err) => {
        console.log("Error => ", err);
        throw err;
      });
  };

  return (
    <div>
      <Navbar bg="light" variant="">
        <Container>
          <Nav style={{ paddingLeft: "70%" }}>
            <CustomDropdown />
            <CustomSearchBar />
            <Nav>
              <FaUser
                className="ms-4 mx-3 position-absolute top-40 end-0"
                size={30}
                style={{ color: "#3B71CA", fontSize: "1.5em" }}
                onClick={() => {
                  setShow(true);
                }}
              />
              <Modal
                style={{ top: "5%", left: "31.5%" }}
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
              >
                <UserProfile />
              </Modal>
            </Nav>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
