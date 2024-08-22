import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetFeaturedProduct } from '../../Features/Newsroom/newsSlices';
import { GetAllProducts, GetMarkets , GetAll  } from '../../Features/Product/ProductSlice';
import { Typography } from '@mui/material'; // Importing Material-UI components
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTranslation } from 'react-i18next';

const ProductBox = () => {
  const dispatch = useDispatch();
  const FeaturedP = useSelector((state) => state?.news?.FeaturedP);
  const MarketState = useSelector((state) => state?.product?.Markets);
  const ProductState = useSelector((state) => state?.product?.Products);
  
  const { t } = useTranslation();

  const [activeMarket, setActiveMarket] = useState(MarketState[0]?.id);

  useEffect(() => {
    dispatch(GetFeaturedProduct());
    dispatch(GetMarkets());
    dispatch(GetAllProducts());
    dispatch(GetAll());  
  }, [dispatch]);

  const handleMarketClick = (market) => {
    setActiveMarket(market?.id);
  };

  const settings = {  
    dots: true,
    arrows: true,
    prevArrow: (
      <ArrowBackIcon
        sx={{
          fontSize: 32,
          color: 'black',
          '&:hover': {
            color: 'black', 
            cursor: 'pointer', 
          },
        }}
      />
    ),
    nextArrow: (
      <ArrowForwardIcon
        sx={{
          fontSize: 32,
          color: 'black',
          '&:hover': {
            color: 'black', 
            cursor: 'pointer', 
          },
        }}
      />
    ),
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    rows:2,
    
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const carouselSettings = {
    prevArrow: (
      <ArrowBackIcon
        sx={{
          fontSize: 32,
          color: 'white',
          '&:hover': {
            color: 'white', 
            cursor: 'pointer', 
          },
        }}
      />
    ),
    nextArrow: (
      <ArrowForwardIcon
        sx={{
          fontSize: 32,
          color: 'white',
          '&:hover': {
            color: 'white', 
            cursor: 'pointer', 
          },
        }}
      />
    ),
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: 'linear',
  };

  const filteredProducts = ProductState?.filter(product => product.MarketId === activeMarket).slice(0, 4) || [];

  console.log("ok",ProductState)

  return (
    <section className="new-in-featured mb-4">
      <div className="new-in-featured__wrapper">
        <div className="container-fluid">
          <div className="row no-gutters">
            <div className="col-xl-6">
              <div className="new-in new-in-featured__box">
                <h2 className="new-in-featured__title">{t('newIn')}</h2>
                <div className="ajax-carousel-container">
                  <div className="actions">
                    {MarketState?.map((market) => (
                      <div
                        key={market.id}
                        className={`action-button ${activeMarket === market.id ? 'active' : ''}`}
                        onClick={() => handleMarketClick(market)}
                      >
                        {market.name}
                      </div>
                    ))}
                  </div>
                  <div className="ajax-carousel">
                    <div className="container-fluid carousel-container new">
                      <div className="row productboxwrap pb-0 ml- mr-0">
                        <div className="col-12">
                          <div className="container pl-2 pr-2">
                            <div className="slides" style={{ display: 'flex', overflowX: 'hidden', transition: 'transform 0.5s ease' }}>
                              <Slider {...settings}>
                                {filteredProducts.map((product) => (
                                  <Link to={`/ProductDetail/${product.id}`} tabIndex="-1" key={product.id}>
                                    <div style={{ flex: '1 0 48%', boxSizing: 'border-box', padding: '10px' }}>
                                      <div className="product-box" data-id={product.id} data-quantity="YOUR_PRODUCT_QUANTITY" data-price="YOUR_PRODUCT_PRICE">
                                        <div className="product-box__img">
                                          <img src={product.image} alt={product.title} className="lazy-scroll loaded" />
                                        </div>
                                        <div className="product-box__title">
                                          <span>{product.title}</span>
                                        </div>
                                        <div className="product-box__code">
                                          <div className="product-box__code">{product.id}</div>
                                        </div>
                                        <p className="product-box__desc">{product.description}</p>
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </Slider>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="featured-products__slider jsFeaturedProductsHome featured-products__slider h-100 slick-initialized slick-slider slick-dotted">
                <Slider {...carouselSettings}>
                  {FeaturedP?.map(product => (
                    <div key={product.Product.id} className="featured-products new-in-featured__box" style={{ backgroundImage: `url(${product.Product.imageUrl})` }}>
                      <Typography variant="h2" className="new-in-featured__title">{product.title}</Typography>
                      <div className="featured-products__tag">{product.Product.title}</div>
                      <div className="product-box">
                        <a href={product.Product.link} className="product-box__img" tabIndex="-1">
                          <img src={product.Product.image} alt={product.Product.title} />
                        </a>
                        <a href={product.link} className="product-box__title" tabIndex="-1">
                          <Typography variant="body1">{product.Product.title}</Typography>
                        </a>
                        <div className="product-box__availability product-box__availability--in-stock">
                          <Typography variant="body2">{product.Product.availability}</Typography>
                        </div>
                        <Typography variant="body2" className="product-box__desc">{product.Product.description}</Typography>
                        <Link to={`/ProductDetail/${product.Product.id}`} className="btn btn-secondary btn-primary-white">
                          <span>{t('viewDetails')}</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductBox;
