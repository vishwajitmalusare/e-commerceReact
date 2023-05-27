import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
 import Loader from "../components/Loader";
import NavBar from "../components/CustumNavBar";
import { Row, Button, Col } from 'react-bootstrap'
import { useEffect, useState } from "react";
import { deleteAllCarts, getCart, getCartItems, placeOrder } from "../services/services";
import { useDispatch, useSelector } from "react-redux";

export default function Checkout() {

  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  const user_info = localStorage.getItem("userinfo");
  const userinfo2= JSON.parse(user_info);


  const [carts, setCarts] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    callApiGetCarts();
  }, []);

  const callApiPlaceOrder = () => {

    setLoader(true);

     let data = {
        userId:userinfo2.id,
        totalQuantity:"10",
        totalPrice:totalAmt(),
        status:"Active",
        customerName:name,
        customerEmail:email,
        customerMobile:mobile,
        customerAddress:address,
        orderItem: carts,
     }
     placeOrder(data)
     .then((res)=>{
      setLoader(false);
      console.log(res)
      swal({title:res.message, icon:"success"});
      deleteAllCartItemsByUserId(res.data.userId);
      // navigate("/invoice", {state:{id:res.data.id}});
      navigate("/order-history")
     })
     .catch((err)=>{
      setLoader(false);
      throw err
     })
  }

  const callApiGetCarts = async () => {
    setLoader(true);

    let data = {
      userid: userinfo2.id
    }
    getCartItems(data)
      .then((res) => {
        if (res) {
          setCarts(res.data)
        }
        setLoader(false)
      })
      .catch((err) => {
        setLoader(false)
        throw err
      }
      )
  }
 ;

  const totalAmt = () => {
    const sum = carts.reduce((total, element) => total + element.price * element.quantity, 0);
    return sum;
  };

  const deleteAllCartItemsByUserId = (userid) => {
   
    deleteAllCarts(userid)
      .then((res)=>{
        console.log("Delete result",res)
        return res;
      })
      .catch((err)=>{
        throw err
      })
  }

  return (
    <div>
    <div style={{ margin: 20 }} className="justify-content-center">
      <h3 class="d-flex justify-content-center">Checkout</h3>
      <hr />
      {loader ? (
          <Loader />
          ) : (
              <>
          {carts && carts.length > 0 ? (
              <>
              <Row>
                <Col>Title</Col>
                <Col>Price</Col>
                <Col>Quantity</Col>
                <Col>Sub Total</Col>
              </Row>
              <hr />
              {carts.map((element, index) => (
                  <Row key={index} style={{ height: 50 }}>
                  <Col>{element.name}</Col>
                  <Col>
                    {"\u20b9"}
                    {element.price}
                  </Col>
                  <Col>{element.quantity}</Col>
                  <Col>
                    {"\u20b9"}
                    {element.quantity * element.price}
                  </Col>
                </Row>
              ))}

              <hr />
              <Row style={{ height: 50 }}>
                <Col md={9} sm={9} xl={9}></Col>

                <Col
                  md={3}
                  sm={3}
                  xl={3}
                  className="d-flex justify-content-start"
                  >
                  Total:{" "}
                  <b>
                    {" "}
                    {"\u20b9"}
                    {totalAmt()}
                  </b>
                </Col>
              </Row>
              <p>Delivey Information</p>
              <hr />
              <Row style={{ marginBottom: 20 }}>
                <Col md={6}>
                  <label>Name</label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                    style={{ width: "100%" }}
                    />
                </Col>
                <Col md={6}>
                  <label>Mobile</label>
                  <input
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter Mobile"
                    style={{ width: "100%" }}
                    />
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <label>Email Id</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email Id"
                    multiple={true}
                    style={{ width: "100%" }}
                    />
                </Col>
                <Col md={6}>
                  <label>Delivery Address</label>
                  <input
                    // value={orderState.address}
                    // onChange={(e) => onChangeInputValue(e, "ADDRESS")}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter Delivery Address"
                    multiple={true}
                    style={{ width: "100%" }}
                    />
                </Col>
              </Row>

              <center>
                <Button
                  onClick={()=>callApiPlaceOrder()}
                  style={{
                      color: "#FFF",
                      width: 200,
                      marginTop: 30,
                      marginBottom: 30,
                    }}
                    >Place Order</Button>
              </center>
            </>
          ) : (
              <p class="d-flex justify-content-center">No Orders Found For User You Given</p>
              )}
        </>
     )}
    </div>
</div>
  );
}