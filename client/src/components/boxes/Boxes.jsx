import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetMarkets, GetAllProducts } from '../../Features/Product/ProductSlice';
import { addProductToCompare } from '../../Features/compare/compareSlice';
import { toast } from 'react-toastify';

const CategoryBox = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const dispatch = useDispatch();
  const MarketState = useSelector((state) => state.product.Markets);
  const ProductState = useSelector((state) => state.product.Products);
  const compareProducts = useSelector((state) => state?.compare?.compareProducts);



  useEffect(() => {
    dispatch(GetMarkets());
    dispatch(GetAllProducts());
  }, [dispatch]);

  const handleAddToCompare = (product) => {
    
  if (compareProducts.some((item) => item.id === product.id)) {
    toast.error('Product is already in the comparison list');
    return;
  }
    if (compareProducts.length<3){
    dispatch(addProductToCompare(product));
    toast.success('Product added to comparison list');}
    else{
      toast.error('caomparaison is full')
    }
     // Show success toast

  };

  const handleMouseEnter = (product) => {
    setHoveredProduct(product.id);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1445,
        settings: {
          dots: false,
        },
      },
      {
        breakpoint: 1380,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          dots: false,
        },
      },
    ],
  };

  return (
    <section className="section-categories-boxes">
      <div className="container-fluid">
        <div className="row">
          {MarketState?.slice(0, 4).map((market) => (
            <div key={market.id} className="col-xl-6 mb-4">
              <div className="category-box">
                <div className="category-box__left">
                  <Link to={`/explore/${market.id}`} className="category-box__image-wrapper">
                    <img
                      className="category-box__image"
                      src="https://www.fos-lighting.eu/uploads/categories_0_cat_image_172.png"
                      alt="Intelligent Lighting Technology"
                    />
                  </Link>
                  <h2 className="category-box__title">{market.name}</h2>
                  <div className="category-box__text">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                    totam rem aperiam
                  </div>
                  <Link to={`/explore/${market.id}`} className="btn btn-primary-gray btn-big-fn18 category-box__btn">
                    Explore
                  </Link>
                </div>
                <div className="category-box__right">
                  <Slider {...settings}>
                    {ProductState?.map(
                      (product) =>
                        product?.MarketId === market?.id && (
                          <div key={product.id}>
                            <div className="product-box">
                              <div className="compare-icon-container" style={{ position: 'relative' }}>
                                <svg
                                  onClick={() => handleAddToCompare(product)}
                                  onMouseEnter={() => handleMouseEnter(product)}
                                  onMouseLeave={handleMouseLeave}
                                  cursor="pointer"
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="24px"
                                  viewBox="0 0 24 24"
                                  width="24px"
                                  fill="#5f6368"
                                >
                                  <path d="M0 0h24v24H0z" fill="none" />
                                  <path d="M10 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h5v2h2V1h-2v2zm0 15H5l5-6v6zm9-15h-5v2h5v13l-5-6v9h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                                </svg>
                                {hoveredProduct === product.id && (
                                  <div className="compare-alert">Compare products</div>
                                )}
                              </div>
                              <div className="product-box__img">
                                <Link to={`/ProductDetail/${product.id}`}>
                                  <img src={product?.image} alt={product?.title} />
                                </Link>
                              </div>
                              <div className="product-box__title">
                                <span>{product?.title}</span>
                              </div>
                              <p className="product-box__desc">{product.description}</p>
                            </div>
                          </div>
                        )
                    )}
                  </Slider>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBox;
