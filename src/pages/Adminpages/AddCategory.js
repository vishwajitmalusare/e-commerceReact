import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  createCategory,
  getCategory,
  updateCategory,
} from "../../services/services";
import swal from "sweetalert";
import backgorund1 from "../../assets/techno1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { updateCategoryName } from "../../action/category.action";
import NavBar from "./CustumNavBarAdmin";
import CustomSideBarAdmin from "../../components/CustomSideBarAdmin";

export default function AddCategory() {
  const [catName, setCategoryName] = useState();
  const location = useLocation();
  const dispatch = useDispatch();
  const catState = useSelector((state) => state.category);

  const catId = location.state;

  console.log(catId);

  useEffect(() => {
    dispatch(updateCategoryName(""));
    if (catId) {
      callApiGetCategoryById();
    } else {
      console.log("No need To Get Category");
    }
  }, []);

  const callApiGetCategoryById = () => {
    let data = {
      id: catId,
    };

    getCategory(data)
      .then((res) => {
        dispatch(updateCategoryName(res.catName));
      })
      .catch((err) => {
        throw err;
      });
  };
  const callUpdateCategory = async () => {
    let formdata = new FormData();
    formdata.append("catName", catState.catName);

    let dataId = {
      id: catId,
    };
    updateCategory(formdata, dataId)
      .then((res) => {
        swal({ title: "Category Updated Successfully!!!" });
        console.log("Update category Result => ", res);
      })
      .catch((err) => {
        swal({ title: "Category Updated Has Some Issues!!!" });
        console.log(err);
      });
  };

  const callCreateCategoryApi = () => {
    let data = {
      catName: catName,
    };

    createCategory(data)
      .then((res) => {
        if (res) {
          swal({ title: res.message, icon: "success" });
        }
      })
      .catch((err) => {
        console.log(err);
        swal({ title: "Not Getting Response ", icon: "error", text: err });
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
        <Col md={11}>
          <div
            className="Auth-form-container"
            style={{
              backgroundImage: `url(${backgorund1})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <form className="Auth-form">
              <div className="Auth-form-content">
                {catId ? (
                  <>
                    <h3
                      className="Auth-form-title"
                      style={{
                        color: "Black",
                        padding: "10px",
                        fontFamily: "Sans-serif",
                        textShadow: "Red 2px 2px 5px",
                      }}
                    >
                      Update Category
                    </h3>
                  </>
                ) : (
                  <h3
                    className="Auth-form-title"
                    style={{
                      color: "Black",
                      padding: "10px",
                      fontFamily: "Sans-serif",
                      textShadow: "Red 2px 2px 5px",
                    }}
                  >
                    Add Category
                  </h3>
                )}

                {catId ? (
                  <>
                    <div className="form-group mt-3">
                      <label>Category Name</label>
                      <input
                        className="form-control mt-1"
                        value={catState.catName}
                        placeholder="Enter Category Name"
                        onChange={(e) =>
                          dispatch(updateCategoryName(e.target.value))
                        }
                      />
                    </div>
                  </>
                ) : (
                  <div className="form-group mt-3">
                    <label>Category Name</label>
                    <input
                      className="form-control mt-1"
                      placeholder="Enter Category Name"
                      onChange={(e) =>
                        dispatch(updateCategoryName(e.target.value))
                      }
                    />
                  </div>
                )}

                {catId ? (
                  <>
                    <div className="d-grid gap-2 mt-3">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={() => callUpdateCategory()}
                      >
                        Update Category
                      </button>
                      <button type="reset" className="btn btn-danger">
                        Reset
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="d-grid gap-2 mt-3">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={() => callCreateCategoryApi()}
                      >
                        Create Category
                      </button>
                      <button type="reset" className="btn btn-danger">
                        Reset
                      </button>
                    </div>
                  </>
                )}
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </div>
  );
}
