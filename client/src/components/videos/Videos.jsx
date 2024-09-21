import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import ReactPlayer from 'react-player';
import { ChevronLeft, ChevronRight, PlayArrow } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProducts } from '../../Features/Product/ProductSlice'; 

// Custom next arrow component
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button 
      className="btn slick-next" 
      onClick={onClick} 
      style={{
        zIndex: 2,
        backgroundColor: 'rgba(56, 56, 56, 0.8)', // Transparent background
        borderRadius: '50%', // Round button
        width: '50px', 
        height: '50px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        border: 'none',
        position: 'absolute', 
        top: '50%',
        right: '10px', // Right of container
        transform: 'translateY(-50%)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out'
      }}
    >
      
    </button>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button 
      className="btn slick-prev" 
      onClick={onClick} 
      style={{
        zIndex: 2,
        backgroundColor: 'rgba(56, 56, 56, 0.8)',
        borderRadius: '50%', 
        width: '50px', 
        height: '50px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        border: 'none',
        position: 'absolute', 
        top: '50%',
        left: '10px', 
        transform: 'translateY(-50%)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out'
      }}
    >
    </button>
  );
};

const Videos = () => {
  const sliderRef = useRef(null); 
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
    <section className="mt-5" style={{ width: "100%" }}>
      <div className="container-fluid px-0" >
        <div className="row no-gutters">
          <div className="col-12">
            <Slider ref={sliderRef} {...settings}>
              {products?.map((product, index) => (
                <div key={index} className="product-info-video-wrapper product-info-video-wrapper--fullradius">
                  <div className="video-slider__video-wrapper jsVideoSlideWrapper jsNotYtVideo" style={{ position: 'relative', width: '100%' }}>
                    {product.extra_video ? (
                      <ReactPlayer
                        url={product.extra_video}
                        playing={true}
                        loop={true}
                        muted={true}
                        width='100%'
                        height='auto'
                        style={{ width: "100%" , height : "100%" }}
                      />
                    ) : (
                      <img
                        src={product.image}
                        alt={product.title}
                        style={{ width: "100%" , height : "100%" }}
                      />
                    )}
                    
                    <div className="video-slider__video-btn-wrapper" style={{ 
                      position: 'absolute', 
                      bottom: '20px', 
                      left: '50%', 
                      transform: 'translateX(-50%)', 
                      zIndex: 2 
                    }}>
                      <Link to={`/ProductDetail/${product.id}`} className="btn btn-primary btn-lg" style={{
                        backgroundColor: '#ff4b2b', 
                        border: 'none', 
                        borderRadius: '50px', 
                        padding: '10px 20px',
                        fontSize: '16px',
                        color: '#fff',
                        transition: 'all 0.3s ease-in-out'
                      }}>
                        Explore more
                      </Link>
                    </div>

                    <div className="video-slider__slide-play jsPlayVideoSlider d-md-none">
                      <PlayArrow style={{ color: 'red', fontSize: '40px' }} /> 
                    </div>
                    <div className="video-slider__slide-play jsLoadingVideoSlider">
                      <div>Loading...</div>
                    </div>
                  </div>
                  <div className="video-slider__video-info">
                    <div className="video-slider__video-info-text">
                      <h2 className="text-center">{product.title}</h2>
                      <p className="text-center">{product.description}</p>
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
