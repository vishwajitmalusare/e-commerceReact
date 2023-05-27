import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { deleteCartByProdId, getCartItems } from "../services/services";
import { useNavigate } from "react-router-dom";
import Ripples from "react-ripples";
import swal from "sweetalert";
import { configure } from "../config/configure";
import NavBar from "../components/CustumNavBar";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { MDBTypography } from "mdb-react-ui-kit";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { updateCartList } from "../action/cart.action";
import CustomSideBar from "../components/CustomSideBar";
import Loader from "../components/Loader";

export default function Cart() {
  const navigate = useNavigate();
  const user_info = localStorage.getItem("userinfo");
  const userinfo = JSON.parse(user_info);
  const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const cartState = useSelector((state) => state.cart.cartlist);
  console.log("Cart List --> ",cartState);

  const totalAmout = () => {
    const sum = cartState.reduce(
      (total, element) => total + element.price * element.quantity,
      0
    );
    return sum;
  };

  const totalProducts = () => {
    const sum = cartState.reduce(
      (total, element) => total + element.quantity,
      0
    );
    return sum;
  };

  useEffect(() => {
    setLoader(true);
    callApiGetCarts();
  }, [counter]);

  const callApiGetCarts = async () => {

    const result = await getCartItems();
    // console.log("Result in getCart Items: ",result);
    if(result){
      dispatch(updateCartList(result.data.data));
      setLoader(false);
    } else {
      swal({title:"Not Get Any Response", icon:"error"});
    }
}

  const removeCartItem = (proId) => {
    deleteCartByProdId(proId)
      .then((res) => {
        setCounter(counter + 1);
        swal({ title: "Cart Item Removed Successfully" });
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <div>
      <NavBar />

      <Row>
        <Col md={2}>
          <CustomSideBar />
        </Col>

        <Col md={10}>
          {loader ? (
            <Loader />
          ) : (
            <section className="h-100 gradient-custom">
              <Container className="py-5 h-100">
                <CustomSideBar />
                {cartState && cartState.length > 0 ? (
                  <>
                    <Row className="justify-content-center my-4">
                      <Col md="8">
                        {cartState.map((element, index) => (
                          <Card className="mb-4" key={element.id}>
                            <CardHeader className="py-3">
                              <MDBTypography tag="h5" className="mb-0">
                                {element.name}
                              </MDBTypography>
                            </CardHeader>
                            <Card.Body>
                              <Row>
                                <Col lg="3" md="12" className="mb-4 mb-lg-0">
                                  <Ripples
                                    rippleTag="div"
                                    rippleColor="light"
                                    className="bg-image rounded hover-zoom hover-overlay"
                                  >
                                    <img
                                      src={
                                        configure.IMAGE_BASE_URL +
                                        "" +
                                        element.photo
                                      }
                                      className="w-50"
                                    />
                                    <a href="#!">
                                      <div
                                        className="mask"
                                        style={{
                                          backgroundColor:
                                            "rgba(251, 251, 251, 0.2)",
                                        }}
                                      ></div>
                                    </a>
                                  </Ripples>
                                </Col>

                                <Col lg="5" md="8" className=" mb-4 mb-lg-0">
                                  <p>
                                    <strong>{element.category}</strong>
                                  </p>
                                  <p>{element.catName}</p>

                                  <Button
                                    variant="outline-danger"
                                    onClick={() => {
                                      removeCartItem(element.productId);
                                    }}
                                  >
                                    <AiFillDelete
                                      size={25}
                                      title="Delete"
                                      wrapperProps={{ size: "sm" }}
                                      wrapperClass="me-1 mb-2"
                                      style={{ paddingRight: "10%" }}
                                    />
                                    Delete
                                  </Button>
                                </Col>
                                <Col lg="4" md="6" className="mb-4 mb-lg-0">
                                  <div
                                    className="d-flex mb-4"
                                    style={{ maxWidth: "300px" }}
                                  ></div>

                                  <p className="text-start text-md-center">
                                    <strong>
                                      Quantity: {element.quantity}
                                    </strong>
                                  </p>
                                  <p className="text-start text-md-center">
                                    <strong>
                                      Price: {element.price} {"\u20b9"}
                                    </strong>
                                  </p>
                                </Col>
                              </Row>
                              <hr className="my-4" />
                            </Card.Body>
                          </Card>
                        ))}
                      </Col>
                      <Col md="4">
                        <Card className="mb-4">
                          <CardHeader>
                            <MDBTypography tag="h5" className="mb-0">
                              Summary
                            </MDBTypography>
                          </CardHeader>
                          <Card.Body>
                            <ListGroup flush>
                              <ListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                Total Items in Cart
                                <span>{totalProducts()}</span>
                              </ListGroupItem>

                              <ListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                <div>
                                  <strong>Total amount</strong>
                                </div>
                                <span>
                                  <strong>{totalAmout()}</strong>
                                </span>
                              </ListGroupItem>
                            </ListGroup>

                            <center>
                              <Button
                                block
                                size="lg"
                                onClick={() => navigate("/checkout")}
                              >
                                Checkout
                              </Button>
                            </center>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <>
                    <center>
                      <h1>Add Items into Cart</h1>
                    </center>
                    <center>
                      <Button onClick={() => navigate("/home")}>HOME</Button>
                    </center>
                  </>
                )}
              </Container>
            </section>
          )}
        </Col>
      </Row>
    </div>
  );
}
