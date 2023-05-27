import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import {
  Row,
  Col,
  Container,
  Accordion,
  Card,
  Button,
  Badge,
  OverlayTrigger,
  Popover,
  Form,
  Tooltip,
  Overlay,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  getOrders,
  getOrdersByUserId,
  updateOrder,
} from "../../services/services";
import NavBar from "../Adminpages/CustumNavBarAdmin";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import swal from "sweetalert";
import { updateOrderItems } from "../../action/order.action";
import { configure } from "../../config/configure";
import { BsInfoCircle } from "react-icons/bs";
import { useRef } from "react";
import CustomFilter from "../../components/CustomFilter";
import CustomSideBarAdmin from "../../components/CustomSideBarAdmin";

export default function OrderManagement() {
  const [loader, setLoader] = useState(false);
  const orderState = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const user_info = localStorage.getItem("userinfo");
  const userinfo2 = JSON.parse(user_info);
  const navigate = useNavigate();
  const [counter, setCouter] = useState(0);
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  // console.log("Order State => ", orderState);
  // console.log("Role = ", userinfo2.role, "User Id", userinfo2.id);

  useEffect(() => {
    setLoader(true);
    callApiGetOrderHistory();
  }, [counter]);

  const callApiGetOrderHistory = () => {
    getOrders()
      .then((res) => {
        if (res) {
          dispatch(updateOrderItems(res.data));
        }
        setLoader(false);
      })
      .catch((err) => {
        // setLoader(false);
        throw err;
      });
  };

  const updateStatus = (Id, Status, Remark) => {
    // let data;
    // if(Remark){
    //    data = {
    //     id: Id,
    //     status: Status,
    //     remark: "",
    //   }
    //   }
    //   else{
        let data = {
          id: Id,
          status: Status,
          remark: Remark,
        };
      // }
   
    console.log("Data in updateStatus: ",data)
    updateOrder(data)
      .then((res) => {
        console.log("Result of update: ", res);
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
          <CustomSideBarAdmin />{" "}
        </Col>
        <Col md={10}>
          {loader ? (
            <Loader />
          ) : (
            <div className="container">
              {orderState.orderitem.length === 0 && (
                <h4
                  className="d-flex justify-content-center"
                  style={{ marginTop: 100 }}
                >
                  Order Not Found!
                </h4>
              )}

              <center>
                <h1 className="my-4">Order Management</h1>
              </center>

              <div className="d-flex flex-row-reverse bd-highlight">
                <CustomFilter />
              </div>
              {orderState.orderitem.map((element, index) => (
                <div className="my-2" key={index}>
                  <Card>
                    <Accordion defaultActiveKey="1" flush>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <Container>
                            <Row>
                              <Col xs={5} md={3}>
                                <p>Order Id: {element.id}</p>
                              </Col>
                              <Col xs={5} md={3}>
                                <p>Total Price: ₹{element.totalPrice}</p>
                              </Col>
                              <Col xs={5} md={3}>
                                {" "}
                                <p>
                                  Order Date:{" "}
                                  <Moment format="DD-MM-YYYY">
                                    {element.lastUpdated}
                                  </Moment>
                                </p>
                              </Col>

                              <Col xs={5} md={3}>
                                {element.status === "Cancelled" ||
                                element.status === "Delivered" ? (
                                  <>
                                    {element.status === "Delivered" ? (
                                      <>
                                        <Badge
                                          pill
                                          bg="success"
                                          style={{ fontSize: "1.1em" }}
                                        >
                                          {element.status}
                                        </Badge>
                                      </>
                                    ) : (
                                      <>
                                        <Badge
                                          style={{ fontSize: "1em" }}
                                          pill
                                          bg="danger"
                                        >
                                          {element.status}
                                        </Badge>{" "}
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <Row>
                                      <Col xs={6} md={6}>
                                        <Badge
                                          style={{ fontSize: "1em" }}
                                          pill
                                          bg="info"
                                        >
                                          {element.status}
                                        </Badge>
                                      </Col>
                                      <Col xs={6} md={6}>
                                        <OverlayTrigger
                                          ref={(r) => (ref = r)}
                                          container={ref.current}
                                          trigger="click"
                                          placement="auto"
                                          rootClose
                                          overlay={
                                            <Popover id="popover-basic">
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
                                                  variant="outline-danger"
                                                  onClick={(e) =>
                                                    updateStatus(
                                                      element.id,
                                                      "Cancelled",
                                                      "Cancelled by " +
                                                        userinfo2.role +
                                                        " : " +
                                                        ref.current.value
                                                    )
                                                  }
                                                >
                                                  <span
                                                    style={{ fontSize: 12 }}
                                                  >
                                                    Confirm Cancel
                                                  </span>
                                                </Button>
                                              </Popover.Body>
                                            </Popover>
                                          }
                                        >
                                          <Button
                                            variant="outline-danger"
                                            style={{
                                              width: "58%",
                                              height: "77%",
                                              paddingBottom: "17%",
                                            }}
                                          >
                                            <span style={{ fontSize: 12 }}>
                                              Cancel
                                            </span>
                                          </Button>
                                        </OverlayTrigger>
                                      </Col>
                                    </Row>
                                  </>
                                )}
                              </Col>
                            </Row>

                            <Row>
                              <Col xs={3} md={3}>
                                <p>Name: {element.customerName}</p>
                              </Col>
                              <Col xs={3} md={3}>
                                <p>Email: {element.customerEmail}</p>
                              </Col>
                              <Col xs={3} md={3}>
                                Mobile: {element.customerMobile}{" "}
                              </Col>
                              <Col xs={3} md={3}>
                                {element.status === "Cancelled" ||
                                element.status === "Delivered" ? (
                                  <>
                                    {element.status === "Cancelled" ? (
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
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <select
                                      class="form-select"
                                      style={{ width: "61%" }}
                                      aria-label="Default select example"
                                      onChange={(e) =>
                                        updateStatus(element.id, e.target.value,"")
                                      }
                                    >
                                      <option selected>Order Status</option>
                                      <option value="InProcess">InProcess</option>
                                      <option value="Packaged">Packaged</option>
                                      <option value="Dispatched">Dispatched</option>
                                      <option value="Delivered">Delivered</option>
                                      <option value="Cancelled">Cancel</option>
                                    </select>
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
