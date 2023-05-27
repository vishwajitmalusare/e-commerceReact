import React, { useEffect, useState } from "react";
import NavBar from "../components/CustumNavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { getCartItems, getProductPagination } from "../services/services";
import { configure } from "../config/configure";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Col,
  Container,
  ListGroup,
  Pagination,
  Row,
} from "react-bootstrap";
import { updateCartList } from "../action/cart.action";
import Loader from "../components/Loader";
import { updateProductList } from "../action/product.action";
import CustomSideBar from "../components/CustomSideBar";
import swal from "sweetalert";

export default function Home() {
  const productState = useSelector((state) => state.product);
  // console.log("product State in Home : ",productState);
  const user_info = localStorage.getItem("userinfo");
  const userinfo2 = JSON.parse(user_info);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [counter, setCounter] = useState(0);
  // console.log(pageNo, counter);

  let active = pageNo;
  let items = [];
  for (let number = 1; number <= totalPage; number++) {
    items.push(number);
  }

  useEffect(() => {
    setLoader(true);
    callGetAllProductsPagination();
  }, [counter]);

  const callGetAllProductsPagination = () => {
    let data = {
      pageNo: pageNo - 1,
      pageSize: 4,
    };
    getProductPagination(data)
      .then((res) => {
        setTotalPage(res.totalpages);
        dispatch(updateProductList(res.data));
        setLoader(false);
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
            <Container>
              <div className="row justify-content-center">
                {productState.productList.map((element, index) => (
                  <Card
                    className="row shadow p-3 mb-5 bg-body-tertiary rounded"
                    style={{
                      width: "22%",
                      margin: "1%",
                      marginLeft: "1%",
                      padding: "2%",
                      border: "1px solid gray",
                    }}
                    key={index}
                  >
                    <div
                      onClick={() =>
                        navigate("/productdetails", {
                          state: { id: element.id },
                        })
                      }
                    >
                      <Card.Img
                        src={configure.IMAGE_BASE_URL + "" + element.photos}
                        style={{
                          height: "200px",
                          width: "110px",
                          marginLeft: "20%",
                          marginBottom: "20px",
                        }}
                        position="top-50"
                        alt="Product"
                      />
                      <Card.Body>
                        <Card.Title>{element.productName}</Card.Title>
                        <ListGroup.Item> Id: {element.id} </ListGroup.Item>
                        <ListGroup.Item>
                          {" "}
                          Price: {"\u20b9"} {element.price}{" "}
                        </ListGroup.Item>
                      </Card.Body>
                    </div>
                  </Card>
                ))}
              </div>
              <Pagination size="" style={{ marginLeft: "40%" }}>
                {pageNo <= 1 ? (
                  <>
                    <Pagination.Prev disabled />
                  </>
                ) : (
                  <>
                    <Pagination.Prev
                      onClick={() => {
                        setPageNo(pageNo - 1);
                        setCounter(counter + 1);
                      }}
                    />
                  </>
                )}

                {items.map((number, index) => (
                  <Pagination.Item
                    key={index}
                    active={number === active}
                    onClick={() => {
                      setPageNo(number);
                      setCounter(counter + 1);
                    }}
                  >
                    {number}
                  </Pagination.Item>
                ))}
                {pageNo >= totalPage ? (
                  <>
                    <Pagination.Next disabled />
                  </>
                ) : (
                  <>
                    <Pagination.Next
                      onClick={() => {
                        setPageNo(pageNo + 1);
                        setCounter(counter + 1);
                      }}
                    />
                  </>
                )}
              </Pagination>
            </Container>
          )}
        </Col>
      </Row>
    </div>
  );
}
