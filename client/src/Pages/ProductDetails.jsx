import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useParams , Link } from "react-router-dom";
import { UseSelector,useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { GetProductById } from '../Features/Product/ProductSlice';
import AccountPage from '../components/Accountinfo/Accountinfo';
import { removeFromCart, updateCartItemQuantity,addToCart, fetchCart } from '../Features/cart/cartSlice';
import { addProductToWishlist, getWishlistsByUser } from '../Features/wishlist/wishlistSlice';
import ReactPlayer from 'react-player';
import {PlayArrow } from '@mui/icons-material';
import { getAccesoryByProduct } from '../Features/Product/ProductSlice';
import { selectCurrentUser } from '../Features/auth/authSlice';
import { toast } from 'react-toastify';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; 
import AutorenewIcon from '@mui/icons-material/Autorenew'; 
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


function ProductDetail() {
 
  const CurrentUser = useSelector(selectCurrentUser);
  const userId = parseInt(CurrentUser?.user?.id) ;


  console.log("thats me" + userId)

  console.log("worket" + CurrentUser)
  const [xDisplayStyle, setXDisplayStyle] = useState('none');
  const [bDisplayStyle, setBDisplayStyle] = useState('block');
  const [Quantity,setQuantity]=useState(1)
  const params = useParams()
  const dispatch = useDispatch();
  const ProductState = useSelector((state)=> state.product.Product)
  const Accesory = useSelector((state)=> state.product.Accesory);
  const [activeTab, setActiveTab] = useState('features');
  const [activeSection, setActiveSection] = useState(null);
  const [sectionData, setSectionData] = useState({});

  useEffect(()=>{
    dispatch(GetProductById(params.id))
    dispatch(getAccesoryByProduct(params.id))
  },[params.id])

  console.log(ProductState)
  console.log("dd"+Accesory)

  let Extra_images = [];

  const safeProductState = ProductState || {};
  if (Array.isArray(safeProductState?.extra_image)) {
    Extra_images = safeProductState?.extra_image;
  } else if (typeof safeProductState.extra_image === 'string') {
    try {
      Extra_images = JSON.parse(safeProductState.extra_image);
    } catch (e) {
      Extra_images = safeProductState?.extra_image.split(',');
    }
  } else {
    console.error('Unexpected format for extra_image:', safeProductState?.extra_image);
  }
  console.log(Extra_images);
  const features = Array.isArray(ProductState?.features) ? ProductState?.features?.split(',') : [];
  const settingsProduct = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, 
    slidesToScroll: 1, 
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settingsProduct: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 768,
        settingsProduct: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settingsProduct: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };
  


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1114) {
        setXDisplayStyle('none');
        setBDisplayStyle('block');
      } else {
        setXDisplayStyle('block');
        setBDisplayStyle('none');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const cartState = useSelector((state)=> state.cart.cart)
  const updState = useSelector((state)=> state.cart.upd)
  const WishlistState = useSelector((state)=> state?.Wishlist?.wishlists)

  useEffect(()=>{
    dispatch(fetchCart(userId))
   
  },[updState,userId])

  useEffect(()=>{
    dispatch(getWishlistsByUser(userId))
  },[WishlistState,userId,dispatch])
  
  const decreaseQuantity = () => {
    if (Quantity > 1) {
    setQuantity(Quantity-1)
    
  };}

  const increaseQuantity = () => {

    setQuantity(Quantity+1)
  };

  const AddToCart = (userId, productId, quantity) => {
    dispatch(addToCart({userId, productId, quantity}))
    toast.success("product added to cart")
  };

  
  const AddToWishlist = (userId, productId, quantity) => {
    dispatch(addProductToWishlist({userId, productId, quantity}))
  };
  
  const handleSectionClick = (section) => {
    if (activeSection !== section) {
      setActiveSection(section);
    } else {
      setActiveSection(null);
    }
  };
  
  return (
    <div id="mainbody" className="mainbody pinfo">
      {/* Breadcrumb */}
      <div className="breadcrumb" id="breadcrumb_static">
        <div className="mainwrap container-fluid">
          <a href="https://www.fos-lighting.eu" className="headerNavigation">Home</a>
          <i>/</i>
          <a href="https://www.fos-lighting.eu/fos-technologies-c-172.html" className="headerNavigation">FOS Technologies</a>
          <i>/</i>
          <a href="https://www.fos-lighting.eu/stage-lighting-c-172_17.html" className="headerNavigation">Stage Lighting</a>
          <i>/</i>
          <a href="https://www.fos-lighting.eu/retro-lighting-c-172_17_164.html" className="headerNavigation">Retro Lighting</a>
          <i>/</i>
          <a href="https://www.fos-lighting.eu/fos-halo-led-p-432.html" className="headerNavigation">FOS Halo Led</a>
        </div>
      </div>

      {/* Main Content */}
      <div id="maincontent" className="maincontent">
        {/* Product Main Content */}
        <div className="container-fluid mb-40px">
          <form
            name="cart_quantity_form"
            id="cart_quantity_form"
            action="https://www.fos-lighting.eu/fos-halo-led-p-432.html?action=add_product"
            method="post"
            className="cart_quantity_form"
          >
            {/* Product Details */}
            <div className="product-main-section-wrapper">
              <div className="row product-main-row">
                {/* PRODUCT COLUMN 1 */}
                <div className="col product-c-1">
                  <div className="headingtitle" style={{ display: bDisplayStyle }}>
                    <h1>{ProductState?.title}</h1>
                    <div className="product__category-img">
                      <a href="https://www.fos-lighting.eu/fos-technologies-c-172.html">
                        <img className="cat-logo" src="/images/logo1.svg" alt="Category Logo" />
                      </a>
                    </div>
                    <div className="product_model">
                      <div className="model-wrap">
                        <div className="model">
                          <span>Product code:</span>
                          {ProductState?.code}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-title-info row no-gutters" style={{ display: bDisplayStyle }}>
      <div className="availability-container w-100 d-flex">
        <div className="availability align-self-center d-flex">
          <span className="product-box__availability--in-stock">{ProductState?.availability}</span>
        </div>
      </div>
      <div className="country-storage d-flex align-items-center">
        <div className="country-storage__item d-flex align-items-center">
          <img src="images/icons/storage-sofia.svg" alt="storage-athens" />
          <span className="country-storage__country"> Sofia Warehouse:</span>
          <span className="country-storage__avail country-storage__avail--available">113</span>
        </div>
        <span className="country-storage__seperator"></span>
        <div className="country-storage__item d-flex align-items-center">
          <img src="images/icons/storage-athens.svg" alt="storage-athens" />
          <span className="country-storage__country"> Athens Warehouse:</span>
          <span className="country-storage__avail country-storage__avail--null">0</span>
        </div>
      </div>
      <div className="eta-quantity w-100">
        <span> Stock ETA:</span>
        <span><b> in the last week of September 2024</b></span>
      </div>
      <div className="eta-quantity w-100 mb-0">
        <span> Restocking Quantity:</span>
        <span>100</span>
      </div>
    </div>                  <div className="product-c-1__wrapper">
                    <div className="product-gallery">
                      <div className="image">
                        <a href={ProductState?.image} id="main_product_image_link">
                          <img src={ProductState?.image} className="crisp" draggable="false" border="0" />
                          <div className="product-box__extra-info">
                            <div className="product-box__hot">
                              <i className="las la-fire"></i>
                              <span>Hot product</span>
                            </div>
                          </div>
                        </a>
                      </div>
                      <input type="hidden" name="product_original_image" value={ProductState?.image} />
                      <div className="extra-images vertical">
                      {Extra_images?.map((image, index) => (
        <div className="box additional_image" key={index}>
          <a href={image} data-fancybox="product-image" data-caption={safeProductState?.title} className="gallerySmallImage" data-change={image}>
            <img src={image} border="0" title={safeProductState?.title} alt={safeProductState?.title} />
          </a>
        </div>
      ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* PRODUCT COLUMN 2 */}
                <div className="col product-c-2">
                <div className="product-c-2__wrapper">

                  <div className="headingtitle" style={{ display: xDisplayStyle }}>
                    <h1>{ProductState?.title}</h1>
                    <div className="product__category-img">
                      <a href="https://www.fos-lighting.eu/fos-technologies-c-172.html">
                        <img className="cat-logo" src="/images/logo1.svg" alt="Category Logo" />
                      </a>
                    </div>
                    <div className="product_model">
                      <div className="model-wrap">
                        <div className="model">
                          <span>Product code:</span>
                          {ProductState?.code}
                        </div>
                      </div>
                    </div>
                  </div>
                  {CurrentUser && (
                 <div className="product-title-info row no-gutters" style={{ display: xDisplayStyle }}>
                 <div className="availability-container w-100 d-flex">
                   <div className="availability align-self-center d-flex">
                     <span className="product-box__availability--in-stock">
                       {ProductState?.quantity > 0 ? (
                         <p style={{ color: 'green' }}>
                           <CheckCircleIcon style={{ marginRight: '5px' }} />
                           In Stock: {ProductState?.quantity} available
                         </p>
                       ) : (
                         <p style={{ color: 'red' }}>
                           <CancelIcon style={{ marginRight: '5px' }} />
                           Out of Stock
                         </p>
                       )}
                     </span>
                   </div>
                 </div>
                 
                 <div className="country-storage d-flex align-items-center">
                   <div className="country-storage__item d-flex align-items-center">
                     <WarehouseIcon style={{ marginRight: '5px' }} />
                     <span className="country-storage__country"> Sofia Warehouse:</span>
                     <span className="country-storage__avail country-storage__avail--available">
                       {ProductState?.quantity}
                     </span>
                   </div>
                   
                   <span className="country-storage__seperator"></span>
                   
                   <div className="country-storage__item d-flex align-items-center">
                     <WarehouseIcon style={{ marginRight: '5px' }} />
                     <span className="country-storage__country"> Athens Warehouse:</span>
                     <span className="country-storage__avail country-storage__avail--null">0</span>
                   </div>
                 </div>
                 
                 <div className="eta-quantity w-100 d-flex align-items-center">
                   <AccessTimeIcon style={{ marginRight: '5px' }} />
                   <span> Stock ETA:</span>
                   <span><b>{ProductState?.updatedAt}</b></span>
                 </div>
                 
                 <div className="eta-quantity w-100 mb-0 d-flex align-items-center">
                   <AutorenewIcon style={{ marginRight: '5px' }} />
                   <span> Restocking Quantity:</span>
                   <span>{ProductState?.quantity}</span>
                 </div>
               </div>
                  )}
 

                  
                    <div className="product_description">{ProductState?.description}</div>
                    {!CurrentUser && <p><b>Login to See more Details</b></p>}
                    {CurrentUser && <div className="product-info-third-part">
                      
                      <div className="productprice wholesale">
                        <div className="inner">
                          <div id="text" className="price-container">
                            <span className="vat">Dealer price: </span>
                            <span className="price finalPriceClean">{ProductState?.price}</span>
                          </div>
                          <div id="value" className="price-container">
                            <span className="vat">Your price: </span>
                            <span className="productSpecialPrice finalPrice">467.08€</span>
                          </div>
                        </div>
                      </div>
                
                      <div className="productattributes options">
                        <script type="application/json" id="attributes_combinations_quantities">[]</script>
                        <input type="hidden" id="attr_count" className="attr_count" value="0" />
                      </div>
                
                      <div className="clear-selections-actions">
                        <div className="btn btn-default clear-selections" style={{ display: 'none' }}>
                          <span>IMAGE_BUTTON_CLEAR_SELECTIONS</span>
                        </div>
                      </div>
                
                      <div className="inside qty-prewrap">
                      <div className="qty-wrap">
                        
                        <div className="qty-label d-none">Quantity:</div>
                        {ProductState?.quantity > 0 && 
                        (
                          <div className="productQuantity">
                          <RemoveIcon className="update-product-quantity decrease-product-quantity" onClick={() => decreaseQuantity()} style={{ cursor: 'pointer' }} />
                          <input type="text" name="cart_quantity" id="cart_quantity" value={Quantity} className="cart_quantity_value" />
                          <input type="hidden" name="multiples_conversion" value="1" />
                          <input type="hidden" name="solid_quantity" value="1" id="solid_quantity" />
                          <AddIcon className="update-product-quantity increase-product-quantity" onClick={() => increaseQuantity()} style={{ cursor: 'pointer' }} />
                          <div className="max-quantity-warning" style={{ display: 'none' }}>Max available quantity</div>
                        </div>
                        )}
 

                        {ProductState?.quantity > 0 && (
 <div className="addtocart">
 <button type="button"onClick={() => AddToCart(userId,ProductState?.id,Quantity)} className="btn btn-icon btn-default btn-primary btn-fn-18 btn-big shop-btn update-shopping-cart final" >
   <svg viewBox="0 0 26 23">
     <g fill="none" fillRule="nonzero" stroke="#000">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1.606 1h4.503l2.195 11.848a2.678 2.678 0 002.634 2.192h9.305c1.22 0 2.286-.824 2.593-2.004l2.071-8.007a.73.73 0 00-.706-.913L10.938 4.11"></path>
       <path fill="#000" d="M11.833 18.253a1.793 1.793 0 100 3.586 1.793 1.793 0 000-3.586zM19.909 18.253a1.793 1.793 0 10.003 3.586 1.793 1.793 0 00-.003-3.586z"></path>
     </g>
   </svg>
   <span> Add to cart</span>
 </button>
 <input type="hidden" name="customer_group_id" value="19" />
 <input type="hidden" name="main_max_quantity" value="IN_PRODUCTION_MAX_QUANTITY" />
 <button type="button" className="btn btn-default shop-btn outline add-to-collection update-wishlist final ml-3" id="add_to_wishlist" data-id="1775" onClick={() => AddToWishlist(userId,ProductState?.id,Quantity)}>
   <svg xmlns="http://www.w3.org/2000/svg" width="22" height="19" viewBox="0 0 22 19" fill="#f58220">
     <path d="M6.125 0.75C3.02246 0.75 0.5 3.30176 0.5 6.375C0.5 7.44727 0.986328 8.37598 1.4375 9.04688C1.88867 9.71777 2.35156 10.1484 2.35156 10.1484L10.4609 18.2812L11 18.8203L11.5391 18.2812L19.6484 10.1484C19.6484 10.1484 21.5 8.5166 21.5 6.375C21.5 3.30176 18.9775 0.75 15.875 0.75C13.2998 0.75 11.6416 2.2998 11 2.95312C10.3584 2.2998 8.7002 0.75 6.125 0.75ZM6.125 2.25C8.36621 2.25 10.4375 4.42969 10.4375 4.42969L11 5.0625L11.5625 4.42969C11.5625 4.42969 13.6338 2.25 15.875 2.25C18.1572 2.25 20 4.12207 20 6.375C20 7.53223 18.5938 9.09375 18.5938 9.09375L11 16.6875L3.40625 9.09375C3.40625 9.09375 3.04297 8.74512 2.67969 8.20312C2.31641 7.66113 2 6.95508 2 6.375C2 4.12207 3.84277 2.25 6.125 2.25Z" stroke="#f58220" strokeWidth="0"></path>
   </svg>
   <span>Add to list</span>
 </button>
</div>
                        )}
                       
                        <input type="hidden" name="products_id" value="1775" />
                      </div>
                    </div>
                    <div className="inside qty-prewrap">
                        <div className="qty-wrap">
                          <div className="addtocart only-add-to-wish-btn-wrapper">
                            <form
                              name="cart_quantity_form"
                              id="cart_quantity_form"
                              action="https://www.fos-lighting.eu/kos-system-p-1774.html?action=add_product"
                              method="post"
                              className="cart_quantity_form"
                            >
                              <input type="hidden" name="main_max_quantity" value="1" />
                          
                              <input type="hidden" name="main_max_quantity" value="1" />
                              <input type="hidden" name="multiples_conversion" value="1" />
                              <input type="hidden" name="solid_quantity" value="1" id="solid_quantity" />
                              <input type="hidden" name="products_id" value="1774" />
                              <input type="hidden" name="customer_group_id" value="19" />
                            </form>
                          </div>
                        </div>
                      </div>
                      {ProductState?.quantity === 0 && (<>
                        <button
                          type="submit"
                          className="btn btn-default shop-btn outline add-to-collection update-wishlist final ml-3"
                          id="add_to_wishlist"
                          data-id="1774"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="19" viewBox="0 0 22 19" fill="none">
                            <path
                              d="M6.125 0.75C3.02246 0.75 0.5 3.30176 0.5 6.375C0.5 7.44727 0.986328 8.37598 1.4375 9.04688C1.88867 9.71777 2.35156 10.1484 2.35156 10.1484L10.4609 18.2812L11 18.8203L11.5391 18.2812L19.6484 10.1484C19.6484 10.1484 21.5 8.5166 21.5 6.375C21.5 3.30176 18.9775 0.75 15.875 0.75C13.2998 0.75 11.6416 2.2998 11 2.95312C10.3584 2.2998 8.7002 0.75 6.125 0.75ZM6.125 2.25C8.36621 2.25 10.4375 4.42969 10.4375 4.42969L11 5.0625L11.5625 4.42969C11.5625 4.42969 13.6338 2.25 15.875 2.25C18.1572 2.25 20 4.12207 20 6.375C20 7.53223 18.5938 9.09375 18.5938 9.09375L11 16.6875L3.40625 9.09375C3.40625 9.09375 3.04297 8.74512 2.67969 8.20312C2.31641 7.66113 2 6.95508 2 6.375C2 4.12207 3.84277 2.25 6.125 2.25Z"
                              stroke="#f58220"
                              strokeWidth="0"
                              fill="#f58220"
                            />
                          </svg>
                          <span>Add to list</span>
                        </button>
                       <div className="more_actions d-flex justify-content-between">
                       <div className="request-product-container">
                         <div id="request-product" className="d-flex flex-column">
                           <label id="request-product-label">Need an immediate response?</label>
                           <a href="#" className="btn btn-primary mainimagebutton3" data-toggle="modal" data-target="#requestModal" id="request_product_button">Send Request</a>
                         </div>
                       </div>
                       <div id="or"><span>Or</span></div>
                       <div className="notify-when-in-stock js">
                         <form
                           name="notify_product"
                           id="notify_product"
                           action="https://www.fos-lighting.eu/contact-submit.php"
                           method="POST"
                           noValidate
                         >
                           <input type="hidden" name="action" value="send" />
                           <input type="hidden" name="form_origin" value="notify_product" />
                           <input type="hidden" name="product_id" value="1774" />
                           <input type="hidden" name="prod_quantity" value="0" />
                           <label>Send me email when the product is in stock</label>
                           <input type="text" name="email_notify" id="email_notify" value="wes.france@yahoo.com" placeholder="Email" autoComplete="off" />
                           <input type="text" name="notify_foo" id="notify_foo" className="foo" />
                           <input
                             type="submit"
                             border="0"
                             alt="Continue"
                             value="Continue"
                             title="Continue"
                             className="btn btn-primary mainimagebutton3"
                             id="notify-customer-for-stock"
                           />
                         </form>
                         <div id="notifyProductSuccess" className="notifyProductSuccess">
                           <i className="las la-check-circle"></i>Your request was successfully sent.
                         </div>
                       </div>
                       </div>
                      </>)
                          
                      }
                   
                    </div> 
                    }
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* Product Page Sections */}
        <div className="container-fluid mb-40px">
          <div className="row">
            <div className="col-12">
              <div className="product-page-section position-relative">
                {/* Product Tabs */}
                <div className="product-page-section-bottom">
                <nav className="position-relative mb-lg-5 mb-3">
  <div className="nav nav-tabs d-flex justify-content-start justify-content-lg-center border-btm-unset jsProductTabs" id="product-tabs" role="tablist">
    
  {ProductState?.feature && 
        <button
        className={`nav-link ${activeTab === 'features' ? 'active' : ''}`}
        id="features-tab"
        data-bs-toggle="tab"
        data-bs-target="#features"
        type="button"
        role="tab"
        aria-controls="features"
        aria-selected={activeTab === 'features'}
        onClick={() => setActiveTab('features')}
      >
        Features
      </button>
   }

   
{
  ProductState?.technical_details &&  
  <button
  className={`nav-link ${activeTab === 'technical-details' ? 'active' : ''}`}
  id="technical-details-tab"
  data-bs-toggle="tab"
  data-bs-target="#technical-details"
  type="button"
  role="tab"
  aria-controls="technical-details"
  aria-selected={activeTab === 'technical-details'}
  onClick={() => setActiveTab('technical-details')}
>
  Technical Details
</button>
}
   
  
 

    {Accesory.length > 0 && (
      <button
        className={`nav-link ${activeTab === 'accessories' ? 'active' : ''}`}
        id="accessories-tab"
        data-bs-toggle="tab"
        data-bs-target="#accessories"
        type="button"
        role="tab"
        aria-controls="accessories"
        aria-selected={activeTab === 'accessories'}
        onClick={() => setActiveTab('accessories')}
      >
        Accessories
      </button>
    )}

 
      <button
        className={`nav-link ${activeTab === 'documents' ? 'active' : ''}`}
        id="documents-tab"
        data-bs-toggle="tab"
        data-bs-target="#documents"
        type="button"
        role="tab"
        aria-controls="documents"
        aria-selected={activeTab === 'documents'}
        onClick={() => setActiveTab('documents')}
      >
        Documents
      </button>
 

    {
      ProductState?.extra_video && 
      <button
      className={`nav-link ${activeTab === 'videos' ? 'active' : ''}`}
      id="videos-tab"
      data-bs-toggle="tab"
      data-bs-target="#videos"
      type="button"
      role="tab"
      aria-controls="videos"
      aria-selected={activeTab === 'videos'}
      onClick={() => setActiveTab('videos')}
    >
      Videos
    </button>
    }
    
  
  </div>
</nav>


                  {/* Tab Contents */}
                  <div className="tab-content jsProductTabsContent" id="myTabContent">
                    
                    {activeTab === 'features' && ProductState?.feature && (
                      <div className="tab-pane fade show active" id="features" role="tabpanel" aria-labelledby="features-tab">
                        <div className="product-info-video-wrapper">
                          <iframe width="100%" height="100%" id="video" src={ProductState?.features} frameBorder="0" allowFullScreen="" title="FOS Nitro BSW" data-gtm-yt-inspected-8="true"></iframe>
                        </div>
                        <ul>
                          {features?.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
 {activeTab === 'technical-details' && (
  <div className="tab-pane fade show active" id="technical-details" role="tabpanel" aria-labelledby="technical-details-tab">
    <div className="row">
      <div className="col-lg-7 m-auto col-single">
        <div className="accordion accordion--products-details" id="detailsAccordion">
          {Object.keys(ProductState?.technical_details).map((section, index) => (
            <div className="card" key={index}>
              <div className="card-header" id={`heading-details-${index}`}>
                <div
                  className={`collapsed ${activeSection === section ? 'show' : ''}`}
                  type="button"
                  data-toggle="collapse"
                  data-target={`#details-${index}`}
                  aria-expanded={activeSection === section}
                  aria-controls={`details-${index}`}
                  onClick={() => handleSectionClick(section)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  {section}
                  {activeSection === section ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </div>
              </div>
              <div
                id={`details-${index}`}
                className={`collapse ${activeSection === section ? 'show' : ''}`}
                aria-labelledby={`heading-details-${index}`}
                data-parent="#detailsAccordion"
              >
                <div className="card-body">
                  <p>{ProductState?.technical_details[section]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)}

                    {activeTab === 'accessories' && (
                      <div className="tab-pane fade show active" id="accessories" role="tabpanel" aria-labelledby="accessories-tab">
                         <Slider {...settingsProduct}>
                  {Accesory.map((product, index) => (
                    <div key={index}>
                      <a href={product.id}>
                        <div className="product-box" data-id={product.id} data-quantity={product.quantity} data-price={product.price} data-on_request={product.onRequest} data-flag_instock={product.inStock} data-set={product.set}>
                          <div className="product-box__img">
                            <img className="lazy-scroll loaded" src={product.image} />
                          </div>
                          <div className="product-box__title">
                            <span>{product.name}</span>
                          </div>
                          <div className="product-box__code">
                            <div className="product-box__code"></div>
                          </div>
                          <p className="product-box__desc">{product.description}</p>
                        </div>
                      </a>
                    </div>
                  ))}
                </Slider>
                      </div>
                    )}
                    {activeTab === 'documents' && (
                      <div className="tab-pane fade show active" id="documents" role="tabpanel" aria-labelledby="documents-tab">
                        {ProductState.description}
                      </div>
                    )}
                    {activeTab === 'videos' && (
                      <div className="tab-pane fade show active" id="videos" role="tabpanel" aria-labelledby="videos-tab">
                         <div className="video-slider__video-wrapper jsVideoSlideWrapper jsNotYtVideo">
                    {ProductState.extra_video ? (
                      <ReactPlayer
                        url={ProductState.extra_video}
                        playing={true}
                        loop={true}
                        muted={true}
                        width='100%'
                        height='auto'
                      />
                    ) : (
                      <img
                        src={ProductState?.image}
                        alt={ProductState?.title}
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
                      </div>
                    )}
                  </div>
                  <div className="back-to-top">
                    <a href="#top">Back to top</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
