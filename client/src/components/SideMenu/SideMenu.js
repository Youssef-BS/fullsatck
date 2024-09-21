import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { GetAllProducts,GetMarkets } from '../../Features/Product/ProductSlice';
import { Link } from 'react-router-dom';
import { ChevronRight } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

const SideMenu = ({ isOpen,isopen2,onClose }) => {
  const Side = useSelector((state)=> state.product.All )
  const { t } = useTranslation();


 
  const [SideMeState, setSideMeState] = useState(useSelector((state)=> state?.product?.All));


  console.log(Side)
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [showThirdLevel, setShowThirdLevel] = useState(false);
    const [showFourthLevel, setShowFourthLevel] = useState(false);
    const [responsiveMob,setResponsiveMob]=useState("")
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeMarket, setActiveMarket] = useState("");
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeSub, setAtiveSub] = useState("");
  
  const dispatch = useDispatch()
  
    useEffect (()=>{
      dispatch(GetMarkets())
      dispatch(GetAllProducts())
  
    },[dispatch]);
    const handleMarketClick = (market) => {
      if (market === activeMarket) {
        setShowSubMenu(!showSubMenu); // Toggle third level if clicking on the same category
      } else {
        setActiveMarket(market); // Set new active category
        setShowSubMenu(true); // Show third level for the new category
      }
      };
      const handleCategoryClick = (categoryId) => {
      
        if (categoryId === activeCategory) {
          setShowThirdLevel(!showThirdLevel); // Toggle third level if clicking on the same category
        } else {
          setActiveCategory(categoryId); // Set new active category
          setShowThirdLevel(true); // Show third level for the new category
        }// assuming market object has a products property
      };
      const handleSubcategoryClick = (sub) => {
        if (sub === activeSub) {
          setShowFourthLevel(!showFourthLevel); // Toggle third level if clicking on the same category
        } else {
          setAtiveSub(sub); // Set new active category
          setShowFourthLevel(true); // Show third level for the new category
        } // assuming market object has a products property
      };
// Define event handlers to toggle visibility of menu levels
const ss = (marketId) => {
  setSideMeState(prevState => {
      const updatedState = prevState?.map(market => {
          if (market.id === marketId) {
              return {
                  ...market,
                  showSubMenu: !market.showSubMenu
              };
          }
          return market;
      });
      return updatedState;
  });
};

const dd = (marketId, categoryId) => {
  setSideMeState(prevState => {
      const updatedState = prevState?.map(market => {
          if (market.id === marketId) {
              const updatedCategories = market?.Categories.map(category => {
                  if (category.id === categoryId) {
                      return {
                          ...category,
                          showThirdLevel: !category.showThirdLevel
                      };
                  }
                  return category;
              });
              return {
                  ...market,
                  categories: updatedCategories
              };
          }
          return market;
      });
      return updatedState;
  });
};
console.log(activeMarket)

const handleSubcategoryClickl = (marketId, categoryId, subcategoryId) => {
  setSideMeState(prevState => {
      const updatedState = prevState.map(market => {
          if (market.id === marketId) {
              const updatedCategories = market.Categories.map(category => {
                  if (category.id === categoryId) {
                      const updatedSubcategories = category.Subcategories.map(subcategory => {
                          if (subcategory.id === subcategoryId) {
                              return {
                                  ...subcategory,
                                  showFourthLevel: !subcategory.showFourthLevel
                              };
                          }
                          return subcategory;
                      });
                      return {
                          ...category,
                          subcategories: updatedSubcategories
                      };
                  }
                  return category;
              });
              return {
                  ...market,
                  categories: updatedCategories
              };
          }
          return market;
      });
      return updatedState;
  });
};

    const toggleSubMenu = () => {
        setShowSubMenu(!showSubMenu);
    };

    const toggleThirdLevel = () => {
        setShowThirdLevel(!showThirdLevel);
    };

    const toggleFourthLevel = () => {
        setShowFourthLevel(!showFourthLevel);
    };
    const toggleFiveLevel = () => {
      setShowFourthLevel(!showFourthLevel);
  };
    const toggleMenuu = () => {
        setIsMenuOpen(true);
        setResponsiveMob(false)
      };

    useEffect(() => {
        if (window.innerWidth > 1000) {
        document.body.className = isOpen ? 'guest no-scroll' : 'guest';}
        else if (window.innerWidth < 1000){
            setResponsiveMob(isopen2)
            document.body.className = responsiveMob ? 'guest menu-open' : 'guest';}
            if(isMenuOpen){
                document.body.className = 'guest';


            }


    }, [isOpen,isMenuOpen,isopen2]);

    return (
      <>
      <nav id="ddfullscreenmenu" className={responsiveMob ? 'openmenu' : ''}>
          <div className="mobile-title-menu">{t('mainMenu')}</div>
          <div id="closex" onClick={toggleMenuu}></div>
          <div id="ulwrapper">
              <ul className="submenu" style={{ zIndex: 183 }}>
                  <li className="breadcrumb">FOS Technologies</li>
                  <li className="menu-view-all">
                      <a href="#">{t('viewCategory')}</a>
                  </li>
                  <li className="header">
                      <a href="#">Stage Lighting</a>
                  </li>
                  <li className="header">
                      <a href="#">Static Led</a>
                  </li>
              </ul>
              <ul id="fullscreenmenu-ul" className="firstLevel" style={{ zIndex: 182 }}>
                  <li className="header">
                      <a href="#">
                          FOS Technologies
                          <div className="root-image">
                              <img src="https://www.fos-lighting.eu/images/logo.svg" border="0" title="FOS Technologies" alt="FOS Technologies" />
                          </div>
                      </a>
                  </li>
                  <li className="mobile-menu-item">
                      <a href="#">{t('newsroom')}</a>
                  </li>
                  <li className="mobile-menu-item">
                      <a href="projects.php">{t('projects')}</a>
                  </li>
                  <li className="mobile-menu-item">
                      <a href="#">{t('aboutUs')}</a>
                  </li>
                  <li className="mobile-menu-item">
                      <a href="#">{t('contactUs')}</a>
                  </li>
                  
                      <LanguageSwitcher  className="mobile-menu-item"/>
                  
              </ul>
          </div>
      </nav>
      <section className={`side-menu main-menu-container mt-3 ${isOpen ? '' : 'hide'}`}>
          <div className="inner">
              <div className="first-level">
                  <ul>
                      {Side?.map((market) => (
                          <li style={{display:'flex',alignItems:'center'}}
                              key={market.id}
                              className={`has-children menu-item jsFirstLevelMenuItem ${showSubMenu ? 'second-level-container' : ''} ${
                                  market.id === activeMarket ? 'active' : ''
                              }`}
                          >
                              <a
                                  onClick={() => handleMarketClick(market?.id)}
                                  className="d-flex flex-column main-parent-cat op-50"
                                  title={market.name}
                                  data-href={market.url}
                              >
                                  <img className="img-fluid" src={market.image} alt={market.name} />
                                  {market.name}
                                  <ChevronRight
                  className="las la-angle-right"
                  data-href="#"
                  onClick={toggleThirdLevel}
                />
                              </a>
                              
                              {showSubMenu && market.id === activeMarket && (
                                  <ul className="second-level" style={{ display: showSubMenu ? 'block' : 'none' }}>
                                      <ul className="inner-second" style={{ maxHeight: '571px' }}>
                                          {Side?.find((m) => m.id == activeMarket)?.Categories?.map((category) => {
                                              return (
                                                  <li style={{display:'flex',alignItems:'center'}}
                                                      key={category.id}
                                                      className={`menu-item has-children third-level-container ${
                                                          category.id === activeCategory ? 'active' : ''
                                                      }`}
                                                  >
                                                      <a
                                                          onClick={() => handleCategoryClick(category?.id)}
                                                          title={category?.name}
                                                          data-href={category.url}
                                                      >
                                                          {category.name}
                                                      </a>
                                                      <ChevronRight 
                                                          className={`las la-angle-right`}
                                                          data-href="#"
                                                          onClick={toggleThirdLevel}
                                                      />
                                                      {showThirdLevel && category.id === activeCategory && (
                                                          <ul
                                                              className="third-level"
                                                              style={{ display: showThirdLevel ? 'block' : 'none' }}
                                                          >
                                                              <ul className="inner-third" style={{ maxHeight: '571px' }}>
                                                                  {category.Subcategories.length > 0 ? (
                                                                      category.Subcategories.map((subcategory) => (
                                                                          <li style={{display:'flex',alignItems:'center'}}
                                                                              key={subcategory.id}
                                                                              className={`menu-item ${
                                                                                  subcategory.id === activeSub ? 'active' : ''
                                                                              }`}
                                                                          >
                                                                              <a
                                                                                  onClick={() =>
                                                                                      handleSubcategoryClick(
                                                                                          subcategory?.id
                                                                                      )
                                                                                  }
                                                                                  title={subcategory.name}
                                                                                  data-href={subcategory.url}
                                                                              >
                                                                                  {subcategory.name}
                                                                              </a>
                                                                              <ChevronRight
                                                                                  className={`las la-angle-right`}
                                                                                  data-href="#"
                                                                              />
                                                                              {showFourthLevel &&
                                                                                  subcategory.id === activeSub && (
                                                                                      <ul
                                                                                          className="fourth-level menu-products-container"
                                                                                          style={{
                                                                                              display: showFourthLevel
                                                                                                  ? 'block'
                                                                                                  : 'none',
                                                                                          }}
                                                                                      >
                                                                                          {Side.find(
                                                                                              (m) => m.id == activeMarket
                                                                                          )?.Categories.find(
                                                                                              (c) => c.id == activeCategory
                                                                                          )?.Subcategories.find(
                                                                                              (c) => c.id == activeSub
                                                                                          )?.Products.map(
                                                                                              (product) => (
                                                                                                  <li key={product.id}>
                                                                                                      <Link
                                                                                                          onClick={onClose}
                                                                                                          to={`/ProductDetail/${product.id}`}
                                                                                                          target="_self"
                                                                                                          className="menu-product-link d-inline-flex align-items-center"
                                                                                                      >
                                                                                                          <div className="menu-product-link__img mr-3">
                                                                                                              <img
                                                                                                                  src={product.image}
                                                                                                                  alt={product.image}
                                                                                                              />
                                                                                                          </div>
                                                                                                          <div className="menu-product-link__title">
                                                                                                              <span>{product.title}</span>
                                                                                                          </div>
                                                                                                      </Link>
                                                                                                  </li>
                                                                                              )
                                                                                          )}
                                                                                      </ul>
                                                                                  )}
                                                                          </li>
                                                                      ))
                                                                  ) : (
                                                                      category.Products.map((product) => (
                                                                          <li key={product.id}>
                                                                              <Link
                                                                                  onClick={onClose}
                                                                                  to={`/ProductDetail/${product.id}`}
                                                                                  target="_self"
                                                                                  className="menu-product-link d-inline-flex align-items-center"
                                                                              >
                                                                                  <div className="menu-product-link__img mr-3">
                                                                                      <img
                                                                                          src={product.image}
                                                                                          alt={product.image}
                                                                                      />
                                                                                  </div>
                                                                                  <div className="menu-product-link__title">
                                                                                      <span>{product.title}</span>
                                                                                  </div>
                                                                              </Link>
                                                                          </li>
                                                                      ))
                                                                  )}
                                                              </ul>
                                                          </ul>
                                                      )}
                                                  </li>
                                              );
                                          })}
                                      </ul>
                                  </ul>
                              )}
                          </li>
                      ))}
                  </ul>
                  <div className="tags-menu">
                      <span className="news">
                          <a href="#">{t('newsroom')}</a>
                      </span>
                      <span className="account">
                          <a href="#">{t('become_a_dealer')}</a>
                      </span>
                      <span className="projects">
                          <a href="projects.php">{t('projects')}</a>
                      </span>
                      <span className="about">
                          <a href="who-we-are-pr-1.html">{t('aboutUs')}</a>
                      </span>
                      <span className="contact">
                          <a href="#">
                            {t('contactUs')}
                          </a>  
                      </span>        
                  </div>
              </div>
          </div>
      </section>
  </>
    );
};

export default SideMenu;
