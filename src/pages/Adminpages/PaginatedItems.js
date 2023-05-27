import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Cart from '../Cart';
import { Card, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { configure } from '../../config/configure';

function Items({ currentItems }) {

  return (
    <>
      {currentItems &&
        currentItems.map((element, index) => (
          <div key={index}>

            <Card className="shadow-0 border rounded-3 mt-5 mb-3">

              <Card.Body>
                <Row>
                  <Col md="12" lg="3" className="text-center mb-4 mb-lg-0">

                    <Card.Img
                      src={configure.IMAGE_BASE_URL + "" + element.photos}
                      // onClick={() => navigate('/productdetails', { state: { "id": element.id } })}
                      style={{ width: "30%" }}
                    />
                    <Card.Text> <h3>{element.productName}</h3></Card.Text>
                    <a href="#!">
                      <div
                        className="mask"
                        style={{
                          backgroundColor: "rgba(251, 251, 251, 0.15)",
                        }}
                      ></div>
                    </a>
                  </Col>

                  <Col md="6" className="border-sm-start-none border-start">
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

                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        ))}
    </>
  );
}

function PaginatedItems() {

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;
  const productState = useSelector(state => state.product.productList);

  // const endOffset = itemOffset + itemsPerPage;
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = productState.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(productState.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % productState.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <div className='fixed-bottom' style={{ marginLeft: "38%" }}>
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}

export default PaginatedItems;