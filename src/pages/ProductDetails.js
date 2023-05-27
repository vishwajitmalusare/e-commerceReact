import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { configure } from '../config/configure';
import Button from 'react-bootstrap/Button';
import { addToCart, getCartItems, getProduct } from '../services/services';
import Loader from "../components/Loader";
import Ripples from "react-ripples";
import swal from "sweetalert";
import { Card, Col, Container, InputGroup, Row } from 'react-bootstrap';
import { updateCartList } from '../action/cart.action';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductInfo } from '../action/product.action';


export default function ProductDetails() {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);

  const user_info = localStorage.getItem("userinfo");
  const userinfo2 = JSON.parse(user_info);

  const productState = useSelector(state => state.product.productInfo);
  const [num, setNum] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [cartid, setCartId] = useState(1);

  const prd_id = location.state.id;

  useEffect(() => {
    setLoader(true);
    callApiGetProduct();
    callApiGetCarts();
  }, []);

  const callApiGetProduct = () => {

    // setLoader(true);

    let data = {
      id: prd_id,
    }
    getProduct(data)
      .then((res) => {

        dispatch(updateProductInfo(res.data)); 
        
        if (res.data.cartId) {
          setQuantity(res.data.quantity);
          setNum(res.data.quantity);
          setCartId(res.data.cartId);
        } 
        else {
          setQuantity(1);
          setNum(1);
        }

        setLoader(false)
      })
      .catch((err) => {
        setLoader(false)
        throw err
      })
  }

  const callApiGetCarts = async () => {
    
    // setLoader(true);

    let data = {
      userid: userinfo2.id
    }

    getCartItems(data)
      .then((res) => {
        dispatch(updateCartList(res.data))
        setLoader(false)
      })
      .catch((err) => {
        setLoader(false)
        throw err
      })
  }

  const incNum = () => {
    if (num < 10) {
      setQuantity(Number(num) + 1)
      setNum(Number(num) + 1);
    }
  };

  const decNum = () => {
    if (num > 0) {
      setQuantity(Number(num) - 1)
      setNum(Number(num) - 1);
    }
  };

  const handleChange = (e) => {
    setNum(e.target.value);
  }

  const callApiAddToCart = () => {
    let data = {
      userId: userinfo2.id,
      productId: prd_id,
      quantity: quantity,
      id: cartid
    }
    addToCart(data)
      .then((res) => {
        swal({ title: res.message, icon: "success" })
        navigate('/home')
      })
      .catch((err) => {
        throw err;
      })
  }



  return (
    <div>
      <Container fluid className="row justify-content-center" >
        <div>
          <h3 className="row justify-content-center">Product Details</h3>
        </div>

        {loader ? <Loader /> :
          <Col md="12" xl="10" className='row justify-content-center'>
            <Card className="row justify-content-center shadow-0 border rounded-3 mt-5 mb-3">
              <Card.Body class="centered" style={{ margin: "auto", paddingLeft: "33%" }}>
                <Col md="12" lg="3" className="row justify-content-center mb-4 mb-lg-0">
                  <Ripples
                    rippleColor="light"
                    rippleTag="div"
                    className="bg-image rounded hover-zoom hover-overlay"
                  >

                    <Card.Img
                      src={configure.IMAGE_BASE_URL + "" + productState.photos}
                      fluid
                      className="w-100"
                    />

                    <a href="#!">
                      <div
                        className="mask"
                        style={{
                          backgroundColor: "rgba(251, 251, 251, 0.15)",
                        }}
                      ></div>
                    </a>
                  </Ripples>
                </Col>
                <Col md="6" className="border-sm-start-none border-start">
                  <div className="d-flex flex-row align-items-center mb-1">
                    <h5 className="mb-1 me-1">₹ {productState.price}</h5>
                  </div>
                  <h4>{productState.productName}</h4>
                  <div className="d-flex flex-row">
                    <p>{productState.description}</p>

                  </div>
                  <InputGroup onChange={handleChange}>
                    <Button variant='outline-primary' onClick={decNum} style={{ marginRight: "10px" }}>-</Button>
                    {num}
                    <Button variant='outline-primary' onClick={incNum} style={{ marginLeft: "10px" }}>+</Button>
                  </InputGroup>

                </Col>
                <Col
                  md="6"
                  lg="3"
                  className="border-sm-start-none border-start"
                >

                  <div className="d-flex flex-column mt-4">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => { callApiAddToCart() }}
                    >
                      Add To Cart
                    </Button>
                  </div>
                </Col>
              </Card.Body>
            </Card>
          </Col>
        }

      </Container>
    </div>
  )
}
