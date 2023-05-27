import React, { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import {
  filterByCategory,
  getAllCategories,
  getAllProducts,
} from "../services/services";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCategoryId,
  updateCategoryInfo,
  updateCategoryName,
} from "../action/category.action";
import { updateProductList } from "../action/product.action";
import Loader from "../components/Loader";
import { useLocation } from "react-router-dom";

export default function CustomDropdown() {
  const [categories, setCategories] = useState();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const authState = useSelector((state) => state.auth.userinfo);
  const location = useLocation();

  useEffect(() => {
    callGetAllCategoriesApi();
    dispatch(updateCategoryId(""));
    dispatch(updateCategoryName(""));
    dispatch(updateCategoryInfo());
  }, []);

  const filterProducts = async (catId) => {
    
    setLoader(true);
    let data = {
      id: catId,
    };

    filterByCategory(data.id)
      .then((res) => {
        dispatch(updateProductList(res));
        setLoader(false);
      })
      .catch((err) => {
        console.log("Error => ", err);
        throw err;
      });
  };

  const callGetAllCategoriesApi = () => {

    getAllCategories()
      .then((res) => {
        if (res) {
          dispatch(updateCategoryInfo(res));
          setCategories(res);
        }
        setLoader(false);
      })
      .catch((err) => {
        console.log("Error => ", err);
        throw err;
      });
  };

  return (
    <>
      <div>
        {loader ? (
          <Loader />
        ) : (
          <div>
            {location.pathname === "/products" ||
            location.pathname === "/home" ? (
              <>
                <NavDropdown
                  style={{ marginRight: "20px" }}
                  title="Categories"
                  id="navbarScrollingDropdown"
                >
                  {categories ? (
                    <>
                      {categories.map((element, index) => (
                        <>
                          <NavDropdown.Item
                            title={element.catName}
                            onClick={(e) => {
                              dispatch(updateCategoryId(element.id));
                              filterProducts(element.id);
                            }}
                          >
                            {element.catName}
                          </NavDropdown.Item>
                        </>
                      ))}
                      <NavDropdown.Divider />
                      {authState.role == "ADMIN" ? (
                        <>
                          <NavDropdown.Item href="/products">
                            All
                          </NavDropdown.Item>
                        </>
                      ) : (
                        <>
                          <NavDropdown.Item href="/home">All</NavDropdown.Item>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <p>Add Categories</p>
                    </>
                  )}
                </NavDropdown>
              </>
            ) : (
              <>
                {" "}
                <NavDropdown
                  disabled
                  style={{ marginRight: "20px" }}
                  title="Categories"
                  id="navbarScrollingDropdown"
                />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
