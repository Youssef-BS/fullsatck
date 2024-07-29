import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import ReactPlayer from 'react-player';
import { ChevronLeft, ChevronRight, PlayArrow } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProducts } from '../../Features/Product/ProductSlice'; // Adjust the import path

// Custom next arrow component
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button 
      className="btn slick-next" 
      onClick={onClick} 
      style={{ 
        zIndex: 1, 
        borderRadius: '100%', 
        width: '75px', 
        height: '75px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
      }}
    >
      {/* <ChevronRight style={{ color: 'white', fontSize: '24px' }} /> */}
    </button>
  );
};

// Custom previous arrow component
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button 
      className="btn slick-prev" 
      onClick={onClick} 
      style={{ 
        zIndex: 1, 
        backgroundColor: '#383838', 
        borderRadius: '100%', 
        width: '75px', 
        height: '75px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
      }}
    >
      {/* <ChevronLeft style={{ color: 'white', fontSize: '24px' }} /> */}
    </button>
  );
};

const Videos = () => {
  const sliderRef = useRef(null); // Ref for the Slider component
  const dispatch = useDispatch();
  const products = useSelector((state) => state?.product?.Products);
  const isLoading = useSelector(state => state.product.isLoading);

  useEffect(() => {
    dispatch(GetAllProducts());
  }, [dispatch]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="section-video-slider mb-4">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Slider ref={sliderRef} {...settings}>
              {products?.map((product, index) => (
                <div key={index} className="product-info-video-wrapper product-info-video-wrapper--fullradius">
                  <div className="video-slider__video-wrapper jsVideoSlideWrapper jsNotYtVideo">
                    {product.extra_video ? (
                      <ReactPlayer
                        url={product.extra_video}
                        playing={true}
                        loop={true}
                        muted={true}
                        width='100%'
                        height='auto'
                      />
                    ) : (
                      <img
                        src={product.image}
                        alt={product.title}
                        style={{ width: '100%', height: 'auto' }}
                      />
                    )}
                    <div className="video-slider__slide-play jsPlayVideoSlider d-md-none">
                      <PlayArrow style={{ color: 'red', fontSize: '40px' }} /> {/* Replacing image with PlayArrow icon */}
                    </div>
                    <div className="video-slider__slide-play jsLoadingVideoSlider">
                      {/* You can replace loading image with any loading animation */}
                      <div>Loading...</div>
                    </div>
                  </div>
                  <div className="video-slider__video-info">
                    <div className="video-slider__video-info-text">
                      <h2>{product.title}</h2>
                      <p>{product.description}</p>
                    </div>
                    <div className="video-slider__video-info-btn">
                      <Link to={`/ProductDetail/${product.id}`} className="btn btn-primary btn-big jsPlayVideoSliderBtn" tabIndex="-1">Explore more</Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Videos;
