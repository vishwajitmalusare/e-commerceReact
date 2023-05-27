import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Products.css";
import NavBar from "../Adminpages/CustumNavBarAdmin";
import Container from "react-bootstrap/esm/Container";
import { Button, Card } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Ripples from "react-ripples";
import { useNavigate } from "react-router-dom";
import { configure } from "../../config/configure";
import {
  deleteProduct,
  getAllProducts,
  getProductPagination,
} from "../../services/services";
import swal from "sweetalert";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { updateProductList } from "../../action/product.action";
import Pagination from "react-bootstrap/Pagination";
import CustomSideBar from "../../components/CustomSideBar";
import CustomSideBarAdmin from "../../components/CustomSideBarAdmin";

function Products() {
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const productState = useSelector((state) => state.product.productList);
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState();

  let active = pageNo;
  let items = [];
  for (let number = 1; number <= totalPage; number++) {
    items.push(number);
  }

  useEffect(() => {
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
      })
      .catch((err) => {
        throw err;
      });
  };

  const callDeleteProduct = async (elementId) => {
    let data = {
      id: elementId,
    };

    deleteProduct(data)
      .then((res) => {
        setCounter(counter + 1);
        swal({ title: res, icon: "success" });
      })
      .catch((err) => {
        setLoader(false);
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
            <Container fluid className="row justify-content-center">
              <div>
                <h3 className="row justify-content-center">Products</h3>
              </div>

              <Row className="justify-content-center mb-0">
                <Col md="12" xl="10">
                  {productState ? (
                    productState.map((element, index) => (
                      <Card
                        key={element.id}
                        className="shadow-0 border rounded-3 mt-5 mb-3"
                      >
                        <Card.Body>
                          <Row>
                            <Col
                              md="12"
                              lg="3"
                              className="text-center mb-4 mb-lg-0"
                            >
                              <Ripples
                                rippleColor="light"
                                rippleTag="div"
                                className="bg-image rounded hover-zoom hover-overlay"
                              >
                                <Card.Img
                                  src={
                                    configure.IMAGE_BASE_URL +
                                    "" +
                                    element.photos
                                  }
                                  onClick={() =>
                                    navigate("/productdetails", {
                                      state: { id: element.id },
                                    })
                                  }
                                  className="w-50"
                                />
                                <a href="#!">
                                  <div
                                    className="mask"
                                    style={{
                                      backgroundColor:
                                        "rgba(251, 251, 251, 0.15)",
                                    }}
                                  ></div>
                                </a>
                              </Ripples>
                            </Col>

                            <Col
                              md="6"
                              className="border-sm-start-none border-start"
                            >
                              <h5>{element.productName}</h5>
                              <div className="d-flex flex-row">
                                <p>{element.description}</p>
                              </div>
                            </Col>
                            <Col
                              md="6"
                              lg="3"
                              className="border-sm-start-none border-start"
                            >
                              <div className="d-flex flex-row align-items-center mb-1">
                                <h4 className="mb-1 me-1">₹ {element.price}</h4>
                              </div>
                              <div className="d-flex flex-column mt-4">
                                <Button
                                  size="sm"
                                  variant="outline-primary"
                                  onClick={() =>
                                    navigate("/add-product", {
                                      state: { id: element.id },
                                    })
                                  }
                                >
                                  Edit
                                </Button>
                                <Button
                                  outline
                                  variant="danger"
                                  size="sm"
                                  className="mt-2"
                                  onClick={() => {
                                    callDeleteProduct(element.id);
                                  }}
                                >
                                  Delete
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    ))
                  ) : (
                    <>
                      <h3>Add Product</h3>
                    </>
                  )}
                </Col>
              </Row>

              <Pagination size="" style={{ marginLeft: "85%" }}>
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
                    key={number}
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

              <Button
                variant="outline-success"
                class="btn btn-primary btn-sm"
                style={{
                  width: "11%",
                }}
                onClick={() => navigate("/add-product")}
              >
                {" "}
                Add Product
              </Button>
            </Container>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Products;
