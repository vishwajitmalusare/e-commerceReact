import React, { useEffect, useState } from "react";
import NavBar from "../Adminpages/CustumNavBarAdmin";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import swal from "sweetalert";
import {
  createProduct,
  getAllCategories,
  getProduct,
  updateProduct,
} from "../../services/services";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateDescription,
  updatePrice,
  updateProductName,
} from "../../action/product.action";
import {
  updateCategoryId,
  updateCategoryInfo,
} from "../../action/category.action";
import CustomSideBarAdmin from "../../components/CustomSideBarAdmin";

function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productState = useSelector((state) => state.product);
  console.log("Product State in Add Product => ", productState);
  const categoryState = useSelector((state) => state.category);
  console.log("Category State in Add Product => ", categoryState);

  const [file, setImage] = useState();
  const location = useLocation();
  // const [categories, setCategories] = useState();

  const prdctId = location.state;
  // console.log("Product id in Add Product : ",prdctId)
  const user_info = localStorage.getItem("userinfo");
  const userinfo2 = JSON.parse(user_info);

  useEffect(() => {
    callGetAllCategoriesApi();
    dispatch(updateProductName(""));
    dispatch(updateDescription(""));
    dispatch(updatePrice(""));
    // dispatch(updateCategoryId());
    if (prdctId) {
      callApiGetProductById();
    }
  }, []);

  const callCreateProductApi = () => {
    const formData = new FormData();
    formData.append("productName", productState.productName);
    formData.append("price", productState.price);
    formData.append("description", productState.description);
    formData.append("catId", categoryState.catId);
    formData.append("file", file);

    createProduct(formData)
      .then((res) => {
        if (res.data == null) {
          swal({ title: res.message, icon: "error" });
        } else {
          swal({ title: res.message, icon: "success" });
          navigate("/products");
        }
      })
      .catch((err) => {
        swal({ title: "Some Error in Create Product", icon: "error" });
        throw err;
      });
  };

  const callUpdateProductApi = async () => {
    const formData = new FormData();
    formData.append("productName", productState.productName);
    formData.append("price", productState.price);
    formData.append("description", productState.description);
    formData.append("catId", categoryState.catId);
    formData.append("file", file);

    let dataId = {
      id: prdctId.id,
    };
    updateProduct(formData, dataId)
      .then((res) => {
        swal({ title: "Product Updated Successfully!!!" });
        navigate("/products");
        // console.log("Update Product => ",res)
      })
      .catch((err) => {
        console.log(err);
        swal({ title: "Uable to Update Product!!!" });
      });
  };

  const callApiGetProductById = () => {
    let data = {
      userid: userinfo2.id,
      id: prdctId.id,
    };
    getProduct(data)
      .then((res) => {
        dispatch(updateCategoryId(res.data.catId));
        dispatch(updateDescription(res.data.description));
        dispatch(updatePrice(res.data.price));
        dispatch(updateProductName(res.data.productName));
      })
      .catch((err) => console.log(err));
  };
  const callGetAllCategoriesApi = () => {
    getAllCategories()
      .then((res) => {
        console.log("Get All Categories Info => ", res);
        if (res) {
          dispatch(updateCategoryInfo(res));
        }
      })
      .catch((err) => {
        console.log("Error => ", err);
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
          <div>
            <Container fluid>
              <Card className="mx-5 mb-5 p-2 shadow-5">
                <Card.Body className=" text-center">
                  {prdctId ? (
                    <>
                      {" "}
                      <h2 className="fw-bold mb-5">Update Product</h2>{" "}
                    </>
                  ) : (
                    <>
                      <h2 className="fw-bold mb-5">Add Product</h2>
                    </>
                  )}

                  {prdctId ? (
                    <>
                      <Row>
                        <Col col="6">
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Product Name"
                            className="mb-4"
                          >
                            <Form.Control
                              wrapperclass="mb-4"
                              type="text"
                              placeholder="Product Name"
                              value={productState.productName}
                              onChange={(e) =>
                                dispatch(updateProductName(e.target.value))
                              }
                            />
                          </FloatingLabel>
                        </Col>

                        <Col col="6">
                          <div class="form-floating">
                            <select
                              class="form-select"
                              id="floatingSelect"
                              value={categoryState.catId}
                              onChange={(e) => {
                                dispatch(updateCategoryId(e.target.value));
                              }}
                            >
                              {categoryState.catlist ? (
                                <>
                                  {categoryState.catlist.map(
                                    (element, index) => (
                                      <>
                                        <option
                                          key={index}
                                          value={element.id}
                                          title={element.catName}
                                          onChange={(e) => {
                                            dispatch(
                                              updateCategoryId(e.target.value)
                                            );
                                            // filterProducts(element.id);
                                          }}
                                        >
                                          {element.catName}
                                        </option>
                                      </>
                                    )
                                  )}
                                </>
                              ) : (
                                <>
                                  <h3>Add Some Categories</h3>
                                </>
                              )}
                            </select>
                            <label for="floatingSelect">
                              Select Categories
                            </label>
                          </div>
                        </Col>
                      </Row>

                      <FloatingLabel
                        controlId="floatingInput"
                        label="Product Description"
                        className="mb-4"
                      >
                        <Form.Control
                          wrapperclass="mb-4"
                          type="text"
                          placeholder="Product Description"
                          value={productState.description}
                          onChange={(e) =>
                            dispatch(updateDescription(e.target.value))
                          }
                        />
                      </FloatingLabel>

                      <FloatingLabel
                        controlId="floatingInput"
                        label="Product Price"
                        className="mb-4"
                      >
                        <Form.Control
                          wrapperclass="mb-4"
                          type="text"
                          placeholder="Product Price"
                          value={productState.price}
                          onChange={(e) =>
                            dispatch(updatePrice(e.target.value))
                          }
                        />
                      </FloatingLabel>

                      <Form.Group controlId="formFile" className="mb-4">
                        <Form.Control
                          type="file"
                          // value={} while image stored in redux
                          onChange={(e) => {
                            setImage(e.target.files[0]);
                          }}
                        />
                      </Form.Group>
                    </>
                  ) : (
                    <>
                      <Row>
                        <Col col="6">
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Product Name"
                            className="mb-4"
                          >
                            <Form.Control
                              wrapperclass="mb-4"
                              type="text"
                              placeholder="Product Name"
                              value={productState.productName}
                              onChange={(e) =>
                                dispatch(updateProductName(e.target.value))
                              }
                            />
                          </FloatingLabel>
                        </Col>

                        <Col col="6">
                          <div class="form-floating">
                            <select
                              class="form-select"
                              id="floatingSelect"
                              // value={productState.catId}
                              onChange={(e) => {
                                dispatch(updateCategoryId(e.target.value));
                              }}
                            >
                              {categoryState.catlist ? (
                                <>
                                  {categoryState.catlist.map(
                                    (element, index) => (
                                      <>
                                        <option
                                          key={index}
                                          value={element.id}
                                          title={element.catName}
                                          onChange={(e) => {
                                            dispatch(
                                              updateCategoryId(e.target.value)
                                            );
                                            // filterProducts(element.id);
                                          }}
                                        >
                                          {element.catName}
                                        </option>
                                      </>
                                    )
                                  )}
                                </>
                              ) : (
                                <>
                                  <h3>Add Some Categories</h3>
                                </>
                              )}
                            </select>
                            <label for="floatingSelect">
                              Select Categories
                            </label>
                          </div>
                        </Col>
                      </Row>

                      <FloatingLabel
                        controlId="floatingInput"
                        label="Product Description"
                        className="mb-4"
                      >
                        <Form.Control
                          wrapperclass="mb-4"
                          type="text"
                          placeholder="Product Description"
                          value={productState.description}
                          onChange={(e) =>
                            dispatch(updateDescription(e.target.value))
                          }
                        />
                      </FloatingLabel>

                      <FloatingLabel
                        controlId="floatingInput"
                        label="Product Price"
                        className="mb-4"
                      >
                        <Form.Control
                          wrapperclass="mb-4"
                          type="text"
                          placeholder="Product Price"
                          value={productState.price}
                          onChange={(e) =>
                            dispatch(updatePrice(e.target.value))
                          }
                        />
                      </FloatingLabel>

                      <Form.Group controlId="formFile" className="mb-4">
                        <Form.Control
                          type="file"
                          // value={} while image stored in redux
                          onChange={(e) => {
                            setImage(e.target.files[0]);
                          }}
                        />
                      </Form.Group>
                    </>
                  )}

                  {prdctId ? (
                    <>
                      <Button
                        variant="outline-success"
                        class="btn btn-primary btn-sm"
                        style={{
                          width: "13%",
                        }}
                        onClick={() => callUpdateProductApi()}
                      >
                        {" "}
                        Update Product
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline-success"
                        class="btn btn-primary btn-sm"
                        style={{
                          width: "13%",
                        }}
                        onClick={() => callCreateProductApi()}
                      >
                        {" "}
                        Save Product
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Container>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AddProduct;
