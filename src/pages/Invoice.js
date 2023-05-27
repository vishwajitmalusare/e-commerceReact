import React, { useEffect, useState } from "react";
import { MDBTypography } from "mdb-react-ui-kit";
import { BsFillCircleFill, BsFillTelephoneFill } from "react-icons/bs";
import { AiFillMail } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { getOrderByUserIdAndId, getOrdersById, getOrdersByUserId } from "../services/services";
import { updateOrderInfo } from "../action/order.action";
import { useLocation, useNavigate } from "react-router-dom";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";

export default function Invoice() {
  const orderList = useSelector((state) => state.order.orderlist);
  const orderItems = useSelector((state) => state.order.orderlist.orderItem);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  console.log("orderItems => ", orderItems);
  console.log("orderList => ", orderList);

  useEffect(() => {
    setLoader(true);
    callgetOrderByUserIdAndId();

    // setTimeout(() => {
    //   printout();
    //   navigate("/order-history");
    // }, 1000);
  }, []);

  const printout = () => {
    window.print();
  };

  const callgetOrderByUserIdAndId = () => {
    // setLoader(true);
    let data = {
      //   userId: authState.id,
      id: location.state.id,
    };

    getOrdersById(data)
      .then((res) => {
        dispatch(updateOrderInfo(res.data));
        // console.log("Result in Invoice = ",res)
        setLoader(false);

        //Download PDF
        // htmlToImage
        //   .toPng(document.getElementById("myPage"), {
        //     quality: 0.95,
        //     height: 1980,
        //   })
        //   .then(function (dataUrl) {
        //     var link = document.createElement("a");
        //     link.download = "my-image-name.jpeg";
        //     const pdf = new jsPDF();
        //     const imgProps = pdf.getImageProperties(dataUrl);
        //     const pdfWidth = pdf.internal.pageSize.getWidth();
        //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        //     pdf.addImage(
        //       dataUrl,
        //       "PNG",
        //       0,
        //       0,
        //       pdfWidth,
        //       pdfHeight,
        //       " ",
        //       "SLOW"
        //     );
        //     pdf.save("Invoice" + res.id + ".pdf");
        //   });

        return res;
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <div id="myPage">
      <Container className="py-5">
        <Card className="p-4">
          <Card.Body>
            <Container className="mb-2 mt-3">
              <Row className="d-flex align-items-baseline">
                <Col xl="9">
                  <p style={{ color: "#7e8d9f", fontSize: "20px" }}>
                    Invoice &gt; &gt; <strong>ID: {orderList.id}</strong>
                  </p>
                </Col>
              </Row>
            </Container>
            <Container>
              <Col md="12" className="text-center">
                <h2 className="pt-0">Invoice</h2>
              </Col>
            </Container>
            <Row>
              <Col xl="8">
                <MDBTypography listUnStyled>
                  <li className="text-muted">
                    To:{" "}
                    <span style={{ color: "#5d9fc5" }}>
                      {orderList.customerName}
                    </span>
                  </li>
                  <li className="text-muted">
                    <AiFillMail /> {orderList.customerEmail}
                  </li>
                  <li className="text-muted">
                    {" "}
                    <MdLocationOn /> {orderList.customerAddress}
                  </li>
                  <li className="text-muted">
                    <BsFillTelephoneFill /> {orderList.customerMobile}
                  </li>
                </MDBTypography>
              </Col>
              <Col xl="4">
                <p className="text-muted">Invoice</p>
                <MDBTypography listUnStyled>
                  <li className="text-muted">
                    <BsFillCircleFill style={{ color: "#84B0CA" }} />
                    <span className="fw-bold ms-1">ID:</span> {orderList.id}
                  </li>
                  <li className="text-muted">
                    <BsFillCircleFill style={{ color: "#84B0CA" }} />
                    <span className="fw-bold ms-1">Creation Date:</span>{" "}
                    <Moment format="DD-MM-YYYY">{orderList.dateCreated}</Moment>
                  </li>
                </MDBTypography>
              </Col>
            </Row>
            <Row className="my-2 mx-1 justify-content-center">
              <Table striped borderless>
                <thead
                  className="text-white"
                  style={{ backgroundColor: "#84B0CA" }}
                >
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems ? (
                    <>
                      {orderItems.map((element, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{element.name}</td>
                          <td>{element.qty}</td>
                          <td>₹ {element.price}</td>
                          <td>₹ {element.totalAmount}</td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <>
                      <tr>Add Order Items</tr>
                    </>
                  )}
                </tbody>
              </Table>
            </Row>
            <Row>
              <Col xl="8">
                <p className="ms-3">
                  Add additional notes and payment information
                </p>
              </Col>
              <Col xl="3">
                <p className="text-black float-start">
                  <span className="text-black me-3"> Total Amount</span>
                  <span style={{ fontSize: "25px" }}>
                    ₹ {orderList.totalPrice}
                  </span>
                </p>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col className="text-center ms-5" xl="10">
                <p>Thank you for your purchase</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
