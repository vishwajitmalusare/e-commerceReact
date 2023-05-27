import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import {
  Row,
  Col,
  Container,
  Accordion,
  Card,
  Button,
  Badge,
  Form,
  OverlayTrigger,
  Popover,
  Tooltip,
} from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import {
  getOrders,
  getOrdersByUserId,
  updateOrder,
} from "../services/services";
import { configure } from "../config/configure";
import NavBar from "../components/CustumNavBar";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderItems } from "../action/order.action";
import { FaPrint } from "react-icons/fa";
import Moment from "react-moment";
import swal from "sweetalert";
import { BsInfoCircle } from "react-icons/bs";
import CustomSideBar from "../components/CustomSideBar";

export default function OrderHistory() {
  const [loader, setLoader] = useState(false);
  const orderState = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const user_info = localStorage.getItem("userinfo");
  const userinfo2 = JSON.parse(user_info);
  const navigate = useNavigate();
  const [counter, setCouter] = useState(0);
  const ref = useRef(null);

  // console.log("Order State => ", orderState);
  // console.log("Role = ", userinfo2.role, "User Id", userinfo2.id);

  useEffect(() => {
    setLoader(true);
    callApiGetOrderByUserId();
  }, [counter]);

  const callApiGetOrderByUserId = () => {
    getOrdersByUserId()
      .then((res) => {
        if (res) {
          // console.log("Order By User ID  Result => ", res.data);
          dispatch(updateOrderItems(res.data));
        }
        setLoader(false);
      })
      .catch((err) => {
        throw err;
      });
  };

  const updateStatus = (Id, Status, Remark) => {
    let data = {
      id: Id,
      status: Status,
      remark: Remark,
    };
    // console.log("Data in Update Status => ", data);
    updateOrder(data)
      .then((res) => {
        // console.log("Result of update: ", res);
        setCouter(counter + 1);
        swal({ title: "Updated Successfully..." });
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
          {" "}
          <CustomSideBar />{" "}
        </Col>

        <Col md={10}>
          {loader ? (
            <Loader />
          ) : (
            <div className="container">
              <CustomSideBar />
              {orderState.orderitem.length === 0 && (
                <h4
                  className="d-flex justify-content-center"
                  style={{ marginTop: 100 }}
                >
                  Order Not Found!
                </h4>
              )}

              <center>
                <h1 className="my-4">Order History</h1>
              </center>
              {orderState.orderitem.map((element, index) => (
                <div className="my-2" key={index}>
                  <Card>
                    <Accordion defaultActiveKey="1" flush>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <Container>
                            <Row>
                              <Col xs={6} md={3}>
                                <p>Order Id: {element.id}</p>
                              </Col>
                              <Col xs={6} md={3}>
                                <p>Total Price: ₹{element.totalPrice}</p>
                              </Col>
                              <Col xs={6} md={3}>
                                {" "}
                                <p>
                                  Order Date:{" "}
                                  <Moment format="DD-MM-YYYY">
                                    {element.lastUpdated}
                                  </Moment>
                                </p>
                              </Col>
                              <Col xs={6} md={3}>
                                {element.status === "Delivered" ||
                                element.status === "Cancelled" ? (
                                  <>
                                    {element.status === "Delivered" ? (
                                      <>
                                        <Badge
                                          pill
                                          bg="success"
                                          style={{ fontSize: "1em" }}
                                        >
                                          {element.status}
                                        </Badge>
                                      </>
                                    ) : (
                                      <>
                                        <Badge
                                          pill
                                          bg="danger"
                                          style={{ fontSize: "1em" }}
                                        >
                                          {element.status}
                                        </Badge>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <Badge
                                      pill
                                      bg="info"
                                      style={{ fontSize: "1em" }}
                                    >
                                      {element.status}
                                    </Badge>
                                  </>
                                )}
                              </Col>
                            </Row>

                            <Row>
                              <Col xs={5} md={3}>
                                <p>Name: {element.customerName}</p>
                              </Col>
                              <Col xs={5} md={3}>
                                <p>Email: {element.customerEmail}</p>
                              </Col>
                              <Col xs={5} md={3}>
                                <p>Mobile: {element.customerMobile}</p>
                              </Col>
                              <Col xs={5} md={3}>
                                {element.status === "Delivered" ||
                                element.status === "Cancelled" ? (
                                  <>
                                    {element.status === "Delivered" ? (
                                      <>
                                        <FaPrint
                                          onClick={() =>
                                            navigate("/invoice", {
                                              state: { id: element.id },
                                            })
                                          }
                                        ></FaPrint>
                                      </>
                                    ) : (
                                      <>
                                        <OverlayTrigger
                                          placement="right"
                                          delay={{ show: 250, hide: 400 }}
                                          overlay={
                                            <Tooltip id="button-tooltip">
                                              {element.remark}
                                            </Tooltip>
                                          }
                                        >
                                          <Button variant="link">
                                            {" "}
                                            <BsInfoCircle />
                                          </Button>
                                        </OverlayTrigger>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <OverlayTrigger
                                      ref={(r) => (ref = r)}
                                      container={ref.current}
                                      trigger="click"
                                      placement="left"
                                      rootClose
                                      overlay={
                                        <Popover
                                          id="popover-basic"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <Popover.Header as="h3">
                                            Reason to Cancel
                                          </Popover.Header>
                                          <Popover.Body>
                                            <textarea
                                              ref={ref}
                                              id="message"
                                              name="message"
                                            />
                                            <Button
                                              onClick={() =>
                                                updateStatus(
                                                  element.id,
                                                  "Cancelled",
                                                  "Cancelled by " +
                                                    userinfo2.role +
                                                    " : " +
                                                    ref.current.value
                                                )
                                              }
                                              variant="outline-danger"
                                            >
                                              <span style={{ fontSize: 12 }}>
                                                Confirm Cancel
                                              </span>
                                            </Button>
                                          </Popover.Body>
                                        </Popover>
                                      }
                                    >
                                      <Button
                                        variant="outline-danger"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <span style={{ fontSize: 12 }}>
                                          Cancel
                                        </span>
                                      </Button>
                                    </OverlayTrigger>
                                  </>
                                )}
                              </Col>
                            </Row>
                          </Container>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Row className="text-center">
                            <Col>Product Image</Col>
                            <Col>Title</Col>
                            <Col>Price</Col>
                            <Col>Quantity</Col>

                            <Col>
                              <Row>
                                <Col md={7}>Sub Total</Col>
                                <Col md={5}></Col>
                              </Row>
                            </Col>
                          </Row>
                          <hr />
                          {element.orderItem.map((item) => (
                            <Row
                              key={item.id}
                              style={{ height: 50 }}
                              className="text-center"
                            >
                              <Col>
                                <img
                                  src={configure.IMAGE_BASE_URL + item.photo}
                                  alt=""
                                  style={{ width: "45px", height: "45px" }}
                                  className="rounded-circle me-3"
                                />
                              </Col>

                              <Col>{item.name}</Col>
                              <Col>
                                {"\u20b9"}
                                {item.price}
                              </Col>
                              <Col>{item.quantity}</Col>
                              <Col>
                                <Row>
                                  <Col md={7}>
                                    {"\u20b9"}
                                    {
                                      (item.totalAmount =
                                        item.quantity * item.price)
                                    }
                                  </Col>
                                  <Col md={5}></Col>
                                </Row>
                              </Col>
                            </Row>
                          ))}
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}
