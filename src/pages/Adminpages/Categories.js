import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { deleteCategory, getAllCategories } from "../../services/services";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { updateCategoryInfo } from "../../action/category.action";
import NavBar from "./CustumNavBarAdmin";
import CustomSideBarAdmin from "../../components/CustomSideBarAdmin";

export default function Categories() {
  const catStates = useSelector((state) => state.category.catlist);
  const [loader, setLoader] = useState(false);
  const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true);
    callGetAllCategories();
    dispatch(updateCategoryInfo([]));
  }, [counter]);

  const callGetAllCategories = () => {
    getAllCategories()
      .then((res) => {
        dispatch(updateCategoryInfo(res));
        setLoader(false);
      })
      .catch((err) => {
        // setLoader(false);
        throw err;
      });
  };

  const callDeleteCategoryApi = async (elementId) => {
    // setLoader(true);

    let data = {
      id: elementId,
    };

    deleteCategory(data)
      .then((res) => {
        setCounter(counter + 1);
        swal({ title: res, icon: "success" });
        setLoader(false);
      })

      .catch((err) => {
        // setLoader(false);
        throw err;
      });
  };

  return (
    <>
      <NavBar />
      <Row>
        <Col md={2}> <CustomSideBarAdmin /> </Col>
        <Col md={10}>
          <div className="row justify-content-center">
            <center>
              <h2 className="row justify-content-center">Categories</h2>
            </center>
            {loader ? (
              <Loader />
            ) : (
              <div>
                {catStates.length === 0 && (
                  <h4
                    className="d-flex justify-content-center"
                    style={{ marginTop: 100 }}
                  >
                    Category Not Found!
                  </h4>
                )}

                <Row className="mt-3">
                  <Col>
                    <p>Category Id :</p>
                  </Col>
                  <Col>
                    <p>Category Name :</p>
                  </Col>
                  <Col>
                    {" "}
                    <p>Category Created At:</p>
                  </Col>
                  <Col>
                    {" "}
                    <p>Category Updated At:</p>
                  </Col>
                  <Col>
                    <p>Is Active:</p>
                  </Col>
                  <Col />
                  <Col />
                </Row>
                <hr />
                <hr />

                {catStates.map((element, index) => (
                  <div style={{ marginBottom: 30 }}>
                    <Row>
                      <Col>
                        <p>{element.id}</p>
                      </Col>
                      <Col>
                        <p>{element.catName}</p>
                      </Col>
                      <Col>
                        {" "}
                        <p>{element.created_date}</p>
                      </Col>
                      <Col>
                        {" "}
                        <p>{element.updated_date}</p>
                      </Col>
                      <Col>
                        <p>{element.isActive}</p>
                      </Col>

                      <Col>
                        <Button
                          variant="outline-primary"
                          class="btn btn-primary btn-sm"
                          style={{
                            width: "3 0%",
                          }}
                          onClick={() =>
                            navigate("/add-category", {
                              state: { id: element.id },
                            })
                          }
                        >
                          Edit
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant="danger"
                          class="btn btn-primary btn-sm"
                          style={{
                            width: "55%",
                          }}
                          onClick={() => callDeleteCategoryApi(element.id)}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                    <hr />
                  </div>
                ))}
              </div>
            )}
            <Button
              variant="primary"
              class="btn btn-primary btn-sm"
              style={{
                width: "10%",
              }}
              onClick={() => navigate("/add-category")}
            >
              {" "}
              Add Category
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}
