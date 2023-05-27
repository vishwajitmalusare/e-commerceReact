import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateProductList } from "../action/product.action";
import { searchProducts } from "../services/services";
import Loader from "../components/Loader";
import { useLocation } from "react-router-dom";

export default function SearchBar() {
  const dispatch = useDispatch();
  const location = useLocation();

  const callApiSearch = (value) => {
    let data = {
      searchquery: value,
    };

    console.log("Search key from input ", data);
    searchProducts(data)
      .then((res) => {
        console.log("Result in Search --> ", res);
        dispatch(updateProductList(res));
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <>
      {location.pathname === "/products" || location.pathname === "/home" ? (
        <>
          <Col md="12">
            <Form.Control
              style={{ width: "75%" }}
              type="text"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => callApiSearch(e.target.value)}
            />
          </Col>
        </>
      ) : (
        <>
          <Col md="12"></Col>
        </>
      )}
    </>
  );
}
