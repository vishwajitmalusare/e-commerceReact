import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { Button, Col, Container, Form, Overlay, Row } from "react-bootstrap";
import { BiFilterAlt } from "react-icons/bi";
import { filterOrder, getOrders } from "../services/services";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderItems } from "../action/order.action";

export default function CustomFilter() {
  const [show, setShow] = useState();
  const target = useRef(null);
  const orderState = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [userData, setUserData] = useState("");

  console.log("Order Status ", orderState);

  const callApiGetOrderHistory = () => {

    setLoader(true);

    getOrders()
      .then((res) => {
        if (res) {
          dispatch(updateOrderItems(res.data));
        }
        setLoader(false);
      })
      .catch((err) => {
        // console.log(err);
        throw err;
      });
  };
  const callFilterOrders = () => {
    let data = {
      userId:userData,
      status: status,
      date:fromDate,
      fromDate: fromDate,
      toDate: toDate
    };
    console.log(data);
    if (data.status === "All") {
      callApiGetOrderHistory();
    } else {
      filterOrder(data)
        .then((res) => {
          console.log("Result of Filter: ",res)
          dispatch(updateOrderItems(res.data));
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const clearAll = () => {
    setFromDate("");
    setToDate("");
    setStatus("");
    setUserData("");
    }

  return (
      <>
        <Button variant="link" ref={target} onClick={() => setShow(!show)}>
          <BiFilterAlt size={25} color="purple" />
        </Button>

        <Overlay target={target.current} show={show} placement="left">
          {({
            placement: _placement,
            arrowProps: _arrowProps,
            show: _show,
            popper: _popper,
            hasDoneInitialMeasure: _hasDoneInitialMeasure,
            ...props
          }) => (
            <div
              {...props}
              className="d-flex flex-row-reverse bd-highlight"
              style={{
                backgroundColor: "#fff",
                ...props.style,
              }}
            >
              <div  className="p-2 bd-highlight" style={{paddingRight:"1%"}}>
                  <Button
                  variant="secondary"
                  onClick={() => callFilterOrders()}
                  >Filter</Button>
                  <Button
                  variant="primary"
                  onClick={() => clearAll()}
                  >ClearAll</Button>
                </div>
              <div className="p-2 bd-highlight">
                <select
                  class="form-select"
                  //   style={{ width: "58%" }}
                  aria-label="Default select example"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option selected >Order Status</option>
                  <option value="InProgress">InProgress</option>
                  <option value="Packaged">Packaged</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="All">All</option>
                </select>
                </div>

                <div className="p-2 bd-highlight">
                  <Form.Group controlId="dob" title="To">
                    <Form.Control
                      type="date"
                      name="dob"
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </Form.Group>
                </div>
                    <div className="p-2 bd-highlight mt-1">To:</div>
                <div className="p-2 bd-highlight">
                  <Form.Group controlId="dob" title="From">
                    <Form.Control
                      type="date"
                      name="dob"
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="p-2 bd-highlight mt-1">From:</div>
                <div className="p-2 bd-highlight">
                  <Form>
                    <input
                      type="text"
                      placeholder="Search User"
                      aria-label="Search"
                      onChange={(e)=> setUserData(e.target.value)}
                    />
                  </Form>
                </div>
                
              </div>
          )}
        </Overlay>
      </>
  );
}
