import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { removeProductFromCompare, clearCompareProducts, addProductToCompare } from '../Features/compare/compareSlice.js';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const CompareProduct = () => {
  const compareProducts = useSelector((state) => state?.compare?.compareProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedCompareProducts = JSON.parse(localStorage.getItem('compareProducts')) || [];
    savedCompareProducts.forEach(product => dispatch(addProductToCompare(product)));
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeProductFromCompare(productId));
  };

  const handleClear = () => {
    dispatch(clearCompareProducts());
  };

  return (
    <div id="mainbody" className="mainbody">
      <div className="breadcrumb" id="breadcrumb_static">
        <div className="mainwrap container-fluid">
          <a href="https://www.fos-lighting.eu" className="headerNavigation">Home</a>
          <i>/</i>
          <a href="https://www.fos-lighting.eu/wishlist.php" className="headerNavigation">Order List</a>
        </div>
      </div>
      <div id="maincontent" className="maincontent">
        <div className="container-fluid">
          <div className="section-bg-w-br-30">
            <div id="wishlist_dynamic_content" className="mainwrap wishlist_dynamic_content mt-3 mb-5">
              <div className="headingtitle">
                <h1>Order List</h1>
              </div>
              <div className="compare-product-wrapper py-5 home-wrapper-2">
                <div className="row justify-content-center">
                  {compareProducts.length > 0 ? (
                    compareProducts.map((product, index) => (
                      <div
                        key={`${product.id}-${index}`}
                        className="col-12 col-md-6 col-lg-4 mb-4"
                        style={{ minWidth: compareProducts.length === 1 || 2 ? "400px" : "" }}
                      >
                        <div className="compare-product-card position-relative">
                          <img
                            src="/images/categ.png"
                            alt="cross"
                            className="position-absolute cross img-fluid"
                            onClick={() => handleRemove(product.id)}
                          />
                          <div className="product-card-image">
                            <img
                              src={product.image}
                              alt="product"
                              className="img-fluid"
                              style={{ maxWidth: "100%", height: "auto" }}
                            />
                          </div>
                          <div className="compare-product-details">
                            <h5 className="title">{product.title}</h5>
                            <h6 className="price mb-3 mt-3">{product.price}</h6>
                            <div className="product-detail">
                              <h5>Brand:</h5>
                              <p>{product.brand}</p>
                            </div>
                            <div className="product-detail">
                              <h5>Type:</h5>
                              <p>{product.type}</p>
                            </div>
                            <div className="product-detail">
                              <h5>Availability:</h5>
                              <p>{product.availability}</p>
                            </div>
                            <div className="product-detail">
                              <h5>Color:</h5>
                              <p>{product.color}</p>
                            </div>
                            <div className="product-detail">
                              <h5>Size:</h5>
                              <div className="d-flex gap-10">
                                <p>S</p>
                                <p>M</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center">
                      <p>No products to compare.</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="container d-lg-block d-none">
                <div className="row">
                  <div className="col text-center mt-4 mb-5">
                    <button
                      className="btn shop-btn has-icon right add-all-to-cart-wishlist update-shopping-cart"
                      onClick={handleClear}
                    >
                      Clear All <ExpandMoreIcon />
                    </button>
                  </div>
                </div>
              </div>
              <div className="container d-lg-none d-block mobile-add-all">
                <div className="row">
                  <div className="col text-center mt-4 mb-1">
                    <button
                      className="btn shop-btn has-icon right add-all-to-cart-wishlist update-shopping-cart"
                      onClick={handleClear}
                    >
                      Clear All <ExpandMoreIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareProduct;
