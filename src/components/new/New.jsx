import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects, selectAllProjects } from '../../Features/project/projectSlice';
import { useTranslation } from 'react-i18next';
import './New.css';

function New() {
  const dispatch = useDispatch();
  const projects = useSelector(selectAllProjects);
  const isLoading = useSelector((state) => state.projects.isLoading);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const goToPrevious = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const settings = {
    prevArrow: <ArrowBackIos sx={{ fontSize: 32 }} onClick={goToPrevious} />,
    nextArrow: <ArrowForwardIos sx={{ fontSize: 32 }} onClick={goToNext} />,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: 'linear',
    afterChange: (current) => setCurrentSlide(current),
  };

  return (
    <div className="image-mapper-container">
      {isLoading ? (
        <div>{t('loadingProjects')}</div>
      ) : (
        <Slider ref={sliderRef} {...settings}>
          {projects?.map((project, index) => (
            <div className="mapper-slick" key={index}>
              <div className="container-fluid main">
                <div className="row no-gutters">
                  <div className="col-lg-5 col-xl-5 col-md-12 text">
                    <div className="wrap inner pt-10 pb-10 pr-5 pl-5">
                      <div className="projects-title-cont">
                        <h2>{t('ourProjects')}</h2>
                        <Link to="/projects" className="more">
                          {t('viewAllProjects')}
                        </Link>
                      </div>
                      <h1>{project.title}</h1>
                      <p>{project.description}</p>
                      <div className="btn-container">
                        <Link to={`/project-select/${project.id}`} className="btn btn-primary-gray btn-big mt-4">
                          {t('learnMore')}
                        </Link>
                      </div>
                      <div className="arrows-notification">
                        <div className="notification">
                          {t('clickArrowButton')} <ArrowForwardIos className="icon" /> {t('viewMoreProducts')}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7 col-xl-7 col-md-12 pl-0 image-wrap">
                    <div className="imagemapper-wrapper">
                      <img src={project.image} alt={project.title} className="crisp canvas-img" />
                      {project.gallery?.map((pin, pinIndex) => (
                        <div
                          key={pinIndex}
                          className="imapper-pin pin-style"
                          data-sku={pin.sku}
                          style={{ top: pin.top, left: pin.left }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
      {/* Navigation buttons */}
      <button className="slider-nav-btn prev" onClick={goToPrevious}>
        <ArrowBackIos sx={{ fontSize: 32 }} />
      </button>
      <button className="slider-nav-btn next" onClick={goToNext}>
        <ArrowForwardIos sx={{ fontSize: 32 }} />
      </button>
    </div>
  );
}

export default New;
