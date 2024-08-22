import React ,{useState,useEffect}from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { GetMarketById } from '../Features/Product/ProductSlice';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Subcomponents for better code organization
const Categories = () => {
  const dispatch = useDispatch();

  const { marketId, categoryId } = useParams();
  const MarketState = useSelector((state)=> state?.product?.Market)

  useEffect(()=>{
    dispatch(GetMarketById(marketId))
  },[dispatch,marketId])
  console.log(MarketState)
  return (
    <div className="col-auto products-listing__col-left">
    <div className="products-listing__categories-wrapper">
      <div className="products-listing__categories-logo">
        <img className="header-logo" src="uploads/thumbnails/categories_0_cat_image_172.png.thumb_49x45.png" alt="Category Logo" />
      </div>
      <h2 className="products-listing__categories-title">Categories</h2>
      <ul className="products-listing__categories-links">
        {MarketState?.Categories?.map((category) => (
          <li key={category.id}>
            <Link 
              to={`/store/${marketId}/${category.id}`}
              className={category?.id == categoryId ? "active-link" : ""}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}
  

   


const Breadcrumb = ({  activeSubcategoryId, setActiveSubcategoryId }) => {
  const { marketId, categoryId } = useParams();

  const MarketState = useSelector((state)=> state?.product?.Market)
  const CategoryState = MarketState?.Categories?.filter((category) => category.id == categoryId) || []

  console.log(CategoryState[0]?.Subcategories)
  const handleSubcategoryClick = (subcategoryId) => {
    setActiveSubcategoryId(subcategoryId);
  };


  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return(
    <div className="row">
    <div className="container inner">
      <div className="row">
        <div className="col-12">
          <div className="breadcrumb_container">
            <div className="breadcrumb" id="breadcrumb_static">
              <div className="mainwrap">
                <a href="https://www.fos-lighting.eu" className="headerNavigation">Home</a><i>/</i>
                <a href="https://www.fos-lighting.eu/fos-technologies-c-172.html" className="headerNavigation">FOS Technologies</a><i>/</i>
                <a href="https://www.fos-lighting.eu/moving-lights-c-172_5.html" className="headerNavigation">Moving Lights</a><i>/</i>
                <a href="https://www.fos-lighting.eu/beam-c-172_5_7.html" className="headerNavigation">Beam</a>
              </div>
            </div>
            <div className="breadcrumb new fixed" id="breadcrumb_interactive">
              <div className="mainwrap">
                <div className="interactive_breadcrumb">
                  <div className="breadcrumb_seperator container home">
                    <a className="breadcrumb_home" href="https://www.fos-lighting.eu">
                      <i className="las la-home" aria-hidden="true"></i>
                    </a>
                  </div>
                  <div className="breadcrumb_seperator container">
                    <div className="holder">
                      <div className="inner_holder">
                        <div className="interactive wordwrap" data-type="products_category" data-id="172" data-link="https://www.fos-lighting.eu/fos-technologies-c-172.html">
                          <span>FOS Technologies</span>
                        </div>
                        <i className="las la-arrow-right gotolink" aria-hidden="true"></i>
                        <ul className="updated">
                          <li className="search">
                            <input type="text" name="search_breadcrumb" id="search_breadcrumb" value="Search" onBlur={() => { if (this.value=='') this.value='Search' }} onFocus={() => { if(this.value =='Search' ) this.value='' }} className="selectform search_breadcrumb" autoComplete="off" />
                            <i className="las la-times clear_breadcrumb_search" aria-hidden="true" style={{ display: 'block' }}></i>
                          </li>
                          <li data-initial-id="172" data-link="https://www.fos-lighting.eu/fos-technologies-c-172.html" className="update_breadcrumb_title selected">FOS Technologies</li>
                          <li data-initial-id="173" data-link="https://www.fos-lighting.eu/intelligent-audio-c-173.html" className="update_breadcrumb_title">Intelligent Audio</li>
                          <li data-initial-id="174" data-link="https://www.fos-lighting.eu/visualization-tools-c-174.html" className="update_breadcrumb_title"> Visualization Tools</li>
                          <li data-initial-id="175" data-link="https://www.fos-lighting.eu/truss-suspension-c-175.html" className="update_breadcrumb_title">Truss &amp; Suspension</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="breadcrumb_seperator container">
                    <div className="holder">
                      <div className="inner_holder">
                        <div className="interactive wordwrap" data-type="products_category" data-id="5" data-link="https://www.fos-lighting.eu/moving-lights-c-172_5.html">
                          <span>Moving Lights</span>
                        </div>
                        <i className="las la-arrow-right gotolink" aria-hidden="true"></i>
                        <ul className="updated">
                          <li className="search">
                            <input type="text" name="search_breadcrumb" id="search_breadcrumb" value="Search" onBlur={() => { if (this.value=='') this.value='Search' }} onFocus={() => { if(this.value =='Search' ) this.value='' }} className="selectform search_breadcrumb" autoComplete="off" />
                            <i className="las la-times clear_breadcrumb_search" aria-hidden="true" style={{ display: 'block' }}></i>
                          </li>
                          <li data-initial-id="5" data-link="https://www.fos-lighting.eu/moving-lights-c-172_5.html" className="update_breadcrumb_title selected">Moving Lights</li>
                          <li data-initial-id="68" data-link="https://www.fos-lighting.eu/led-par-c-172_68.html" className="update_breadcrumb_title">Led Par</li>
                          <li data-initial-id="17" data-link="https://www.fos-lighting.eu/stage-lighting-c-172_17.html" className="update_breadcrumb_title">Stage Lighting</li>
                          <li data-initial-id="11" data-link="https://www.fos-lighting.eu/static-led-c-172_11.html" className="update_breadcrumb_title">Static Led</li>
                          <li data-initial-id="58" data-link="https://www.fos-lighting.eu/battery-operated-c-172_58.html" className="update_breadcrumb_title">Battery Operated</li>
                          <li data-initial-id="19" data-link="https://www.fos-lighting.eu/led-strobe-c-172_19.html" className="update_breadcrumb_title">Led Strobe</li>
                          <li data-initial-id="20" data-link="https://www.fos-lighting.eu/laser-c-172_20.html" className="update_breadcrumb_title">Laser</li>
                          <li data-initial-id="73" data-link="https://www.fos-lighting.eu/follow-spots-c-172_73.html" className="update_breadcrumb_title">Follow Spots</li>
                          <li data-initial-id="72" data-link="https://www.fos-lighting.eu/moving-fixtures-c-172_72.html" className="update_breadcrumb_title">Moving Fixtures</li>
                          <li data-initial-id="30" data-link="https://www.fos-lighting.eu/dmx-tools-c-172_30.html" className="update_breadcrumb_title">DMX Tools</li>
                          <li data-initial-id="22" data-link="https://www.fos-lighting.eu/smoke-effects-c-172_22.html" className="update_breadcrumb_title">Smoke &amp; Effects</li>
                          <li data-initial-id="88" data-link="https://www.fos-lighting.eu/architectural-lighting-c-172_88.html" className="update_breadcrumb_title">Architectural Lighting</li>
                          <li data-initial-id="31" data-link="https://www.fos-lighting.eu/cables-plugs-c-172_31.html" className="update_breadcrumb_title">Cables &amp; Plugs</li>
                          <li data-initial-id="42" data-link="https://www.fos-lighting.eu/power-distribution-c-172_42.html" className="update_breadcrumb_title">Power Distribution</li>
                          <li data-initial-id="53" data-link="https://www.fos-lighting.eu/fabrics-gear-c-172_53.html" className="update_breadcrumb_title">Fabrics &amp; Gear</li>
                          <li data-initial-id="37" data-link="https://www.fos-lighting.eu/cases-accessories-c-172_37.html" className="update_breadcrumb_title">Cases &amp; Accessories</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="container">
                    <div className="holder">
                      <div className="inner_holder">
                        <div className="interactive wordwrap" data-type="products_category" data-id="7" data-link="https://www.fos-lighting.eu/beam-c-172_5_7.html">
                          <span>Beam</span>
                        </div>
                        <i className="las la-arrow-right gotolink" aria-hidden="true"></i>
                        <ul className="updated">
                          <li className="search">
                            <input type="text" name="search_breadcrumb" id="search_breadcrumb" value="Search" onBlur={() => { if (this.value=='') this.value='Search' }} onFocus={() => { if(this.value =='Search' ) this.value='' }} className="selectform search_breadcrumb" autoComplete="off" />
                            <i className="las la-times clear_breadcrumb_search" aria-hidden="true" style={{ display: 'none' }}></i>
                          </li>
                          <li data-initial-id="6" data-link="https://www.fos-lighting.eu/hybrid-c-172_5_6.html" className="update_breadcrumb_title selected">Hybrid</li>
                          <li data-initial-id="7" data-link="https://www.fos-lighting.eu/beam-c-172_5_7.html" className="update_breadcrumb_title ">Beam</li>
                          <li data-initial-id="8" data-link="https://www.fos-lighting.eu/wash-c-172_5_8.html" className="update_breadcrumb_title">Wash</li>
                          <li data-initial-id="9" data-link="https://www.fos-lighting.eu/spot-c-172_5_9.html" className="update_breadcrumb_title">Spot</li>
                          <li data-initial-id="86" data-link="https://www.fos-lighting.eu/waterproof-c-172_5_86.html" className="update_breadcrumb_title">Waterproof</li>
                          <li data-initial-id="10" data-link="https://www.fos-lighting.eu/multi-beam-c-172_5_10.html" className="update_breadcrumb_title">Multi Beam</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="clear"></div>
                </div>
              </div>
            </div>
            <div className="product-listing__info-header">
              Moving Lights subcategories:
            </div>
          </div>
        </div>
        <div className="col mb-2">  
          <div className="products-listing__subcategories-wrapper jsProductListingSubCatSlider slick-initialized slick-slider">
          <Slider {...settings}>
            {CategoryState[0]?.Subcategories
              .map((subcategory) => (
            
                <a href="#" className={`products-listing__subcategorie slick-slide ${activeSubcategoryId === subcategory.id ? 'slick-active active' : ''}`} 
                style={{ width: '244px' }} data-slick-index="2" aria-hidden="false" tabIndex="0"
                onClick={() => handleSubcategoryClick(subcategory.id)}
                >
                   <div className="image">
                <picture>
                    <source media="(min-width: 1361px)" srcSet={subcategory?.Products[0]?.image}/>
                    <img src={subcategory?.Products[0]?.image} className="lazyload" alt="ABS Active Speakers" width={50} />
                </picture>
            </div>
                  <span>{subcategory.name}</span>
                </a>
                ))}
              </Slider>
             
           
          </div>
          <div className="headingtitle padding_top">
            <h1 className="">
              Beam
            </h1>
          </div>
          <div className="products-in-listing-container">
            <span id="products-in-listing">9</span>
            <span className="items-description"> products</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

   
   


const FiltersComponent = () => {
  const [priceFrom, setPriceFrom] = useState(578.4);
  const [priceTo, setPriceTo] = useState(1998.4);
  const [availability, setAvailability] = useState([]);

  const handlePriceChange = (event, type) => {
    const value = parseFloat(event.target.value);
    if (type === 'from') {
      setPriceFrom(value);
    } else if (type === 'to') {
      setPriceTo(value);
    }
  };

  const handleAvailabilityChange = (event) => {
    const value = event.target.value;
    setAvailability((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  return (
    <div className="my-3">
      <div className="outer-filters-wrap">
        <div className="prefilters container-fluid">
          <div className="row filterbox bar">
            {/* Hidden input fields for product listing type */}
            <input type="hidden" name="product_listing_type" value="c_172_5_6" />
            <input type="hidden" name="chooseProductListingPage" value="1" id="chooseProductListingPage" className="chooseProductListingPage" />
            <input type="hidden" name="chooseProductListingItemsPerPage" value="72" id="chooseProductListingItemsPerPage" className="chooseProductListingItemsPerPage" />
            <input type="hidden" name="sort" value="asc" id="sort" className="sort_listing" />

            {/* Price Range Filter */}
            <div className="extended_filters_category filter basic price_range">
              <div className="flabel price_range_label toggle_filter_category">
                <span>Price Range</span>
                <i className="las la-angle-down" aria-hidden="true"></i>
              </div>
              <div className="extended_filter_field_container">
                <div className="ffield price_range_box">
                  <input type="hidden" name="price_from" value={priceFrom} />
                  <input type="hidden" name="price_to" value={priceTo} />
                  <input type="hidden" name="price_max" value={1998.4} />
                  <input type="hidden" name="price_min" value={578.4} />
                  <div className="ffield price_range_field">
                    <span className="irs irs--round js-irs-0 irs-with-grid">
                      <input
                        type="range"
                        min="578.4"
                        max="1998.4"
                        step="0.01"
                        value={priceFrom}
                        onChange={(e) => handlePriceChange(e, 'from')}
                      />
                      <input
                        type="range"
                        min="578.4"
                        max="1998.4"
                        step="0.01"
                        value={priceTo}
                        onChange={(e) => handlePriceChange(e, 'to')}
                      />
                      <span className="irs-bar" style={{ left: `${(priceFrom / 1998.4) * 100}%`, width: `${((priceTo - priceFrom) / 1998.4) * 100}%` }}></span>
                    </span>
                    <input className="range irs-hidden-input" type="text" name="" value="" style={{ display: 'none' }} tabIndex="-1" readOnly />
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Filter */}
            <div className="extended_filters_category extended_filters_category_traverse extended_filters_category_availability">
              <div className="flabel toggle_filter_category">
                <span className="cat-name">Availability</span>
                <span className="active_filters_local_count"></span>
                <i className="las la-angle-down" aria-hidden="true"></i>
              </div>
              <div className="extended_filter_field_container">
                <div className="ffield">
                  <input
                    type="checkbox"
                    name="filter_availability[]"
                    value="3"
                    checked={availability.includes('3')}
                    onChange={handleAvailabilityChange}
                    id="filter_availability_3_"
                    autoComplete="off"
                    data-tag="out-of-stock"
                  />
                  <label htmlFor="filter_availability_3_" data-name="Out of stock">Out of stock</label>
                </div>
                <div className="ffield">
                  <input
                    type="checkbox"
                    name="filter_availability[]"
                    value="1"
                    checked={availability.includes('1')}
                    onChange={handleAvailabilityChange}
                    id="filter_availability_1_"
                    autoComplete="off"
                    data-tag="in-stock"
                  />
                  <label htmlFor="filter_availability_1_" data-name="In stock">In stock</label>
                </div>
                <div className="clear"></div>
              </div>
              <div className="clear"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductList = ({  activeSubcategoryId }) => {
  const MarketState = useSelector((state)=> state?.product?.Market)

  const { marketId, categoryId } = useParams();
  const CategoryState = MarketState?.Categories?.filter((category) => category.id == categoryId) || []
  const SubCategoryState = CategoryState[0]?.Subcategories?.filter((subcategory) => subcategory.id == activeSubcategoryId) || []
console.log(SubCategoryState)


  return(
    <div id="productboxwrapContainer" className="productboxwrapContainer products_container">
    <input type="hidden" name="allow_max_page" value="1" />
    <input type="hidden" name="totalProducts" value="9" />
    <div id="productboxwrap" className="productboxwrap container-fluid">
      <div className="row align-items-center">
      {SubCategoryState[0]?.Products
            .map((product, index) => (
              <div key={product.id} className="col-md-6 col-lg-4 mb-4 px-3 ">
              <div className="card product-card shadow-sm h-100 ">
                <a href={`https://www.fos-lighting.eu/${product.slug}-p-${product.id}.html`} className="text-decoration-none">
                  <img
                    src={product.image || '/images/default-product.jpg'}
                    className="card-img-top"
                    alt={product.name}
                    loading="lazy"
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-dark">{product.title}</h5>
                    <p className="card-text text-muted small">{product.code}</p>
                    {product.quantity > 0 ? (
                      <p className="card-text text-success small">In Stock</p>
                    ) : (
                      <p className="card-text text-danger small">Out of Stock</p>
                    )}
                    <p className="card-text text-truncate">{product.description.slice(0, 120)}...</p>
                    <p className="text-success fw-bold mt-auto">{product.price}€</p>
                    {product.isHot && (
                      <div className="badge bg-danger text-white mt-2">
                        <i className="las la-fire"></i> Hot Product
                      </div>
                    )}
                  </div>
                </a>
              </div>
            </div>
             ))}
      </div>
    </div>
    <div id="no_products">There are currently no products.</div>
  </div>

  )
}

    

const Store = () => {
  const [activeSubcategoryId, setActiveSubcategoryId] = useState(null);

  return  (
    <div id="mainbody" className="mainbody">
    <div id="maincontent" className="maincontent">
      <div className="container-fluid pl-0 pr-0 products-listing__container">
        <div className="row no-gutters">
            <Categories/> 
          <div className="col products-listing__col-right">
            <div className="container-fluid category-description-container">
             <Breadcrumb activeSubcategoryId={activeSubcategoryId}
          setActiveSubcategoryId={setActiveSubcategoryId}
         />
             </div>
             <FiltersComponent/>
             <ProductList activeSubcategoryId={activeSubcategoryId}/>
              <div className="description prices-not-include-vat">
                Prices do not include VAT
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )

 
}
  


export default Store;
