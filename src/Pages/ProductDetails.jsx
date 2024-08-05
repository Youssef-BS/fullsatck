import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useParams } from "react-router-dom";
import { UseSelector,useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { GetProductById } from '../Features/Product/ProductSlice';
import AccountPage from '../components/Accountinfo/Accountinfo';
import { removeFromCart, updateCartItemQuantity,addToCart, fetchCart } from '../Features/cart/cartSlice';
import { addProductToWishlist, getWishlistsByUser } from '../Features/wishlist/wishlistSlice';
function ProductDetail() {
  const userId = 9;

  const [xDisplayStyle, setXDisplayStyle] = useState('none');
  const [bDisplayStyle, setBDisplayStyle] = useState('block');
  const [Quantity,setQuantity]=useState(1)
  const params = useParams()
  const dispatch = useDispatch();
  const ProductState = useSelector((state)=> state.product.Product)
  useEffect(()=>{
    dispatch(GetProductById(params.id))

  },[params.id])
  console.log(ProductState)
  const Extra_images = ProductState?.extra_image ? JSON.parse(ProductState.extra_image) : null;

const products = [
  {
    id: 1,
    name: "Product 1",
    link: "https://example.com/product1",
    image: "/images/product.jpg",
    quantity: 10,
    price: 99.99,
    onRequest: 0,
    inStock: 1,
    set: 0,
    description: "Description of Product 1"
  },
  {
    id: 2,
    name: "Product 2",
    link: "https://example.com/product2",
    image: "/images/product.jpg",
    quantity: 5,
    price: 149.99,
    onRequest: 0,
    inStock: 1,
    set: 0,
    description: "Description of Product 2"
  },
  {
    id: 3,
    name: "Product 3",
    link: "https://example.com/product3",
    image: "/images/product.jpg",
    quantity: 20,
    price: 79.99,
    onRequest: 1,
    inStock: 0,
    set: 0,
    description: "Description of Product 3"
  },
  {
    id: 4,
    name: "Product 4",
    link: "https://example.com/product4",
    image: "/images/product.jpg",
    quantity: 15,
    price: 199.99,
    onRequest: 0,
    inStock: 1,
    set: 0,
    description: "Description of Product 4"
  },
  {
    id: 5,
    name: "Product 5",
    link: "https://example.com/product5",
    image: "/images/product.jpg",
    quantity: 8,
    price: 129.99,
    onRequest: 0,
    inStock: 1,
    set: 0,
    description: "Description of Product 5"
  },
  {
    id: 6,
    name: "Product 6",
    link: "https://example.com/product6",
    image: "/images/product.jpg",
    quantity: 12,
    price: 109.99,
    onRequest: 0,
    inStock: 1,
    set: 0,
    description: "Description of Product 6"
  },
  {
    id: 7,
    name: "Product 7",
    link: "https://example.com/product7",
    image: "/images/product.jpg",
    quantity: 25,
    price: 89.99,
    onRequest: 0,
    inStock: 1,
    set: 0,
    description: "Description of Product 7"
  }
];


  const settingsProduct = {
    dots: false,
    arrows: true,

    infinite: true,
    speed: 500,
    slidesToShow: 5, // Display five products at a time
    slidesToScroll: 1, // Slide by one product
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
  
const product = [
  {
    code: "L006793",
    title: "FOS Ares Profile",
    description: "Professional low noise Led profile moving head for stages and theater applications, high power 600W LED engine module, 4-55° linear zoom, intelligent fan, noise 45dB, Framing system: 4 Blades with +/-45° rotation, Color system: CMY + independent CTO, Animation wheel, Iris, 7 interchangeable rotating and 7 static gobos, 6 dichroic color filters, 4-facet prism, 0-100% linear frost, Linear Dimmer 0-100%, 32kg.",
    extra_image: [
      "https://www.fos-lighting.eu/uploads/products_1_image_2748.jpg",
      "https://www.fos-lighting.eu/uploads/products_2_image_2748.jpg",
      "https://www.fos-lighting.eu/uploads/products_3_image_2748.jpg",
      "https://www.fos-lighting.eu/uploads/products_4_image_2748.jpg",
      "https://www.fos-lighting.eu/uploads/products_5_image_2748.jpg"
    ],
    price: 2498,
    availability: "Out of stock",
    stock_eta: "in the last week of April 2024",
    features: "https://www.youtube.com/embed/PAhbZ_wBZUQ",
    technical_details: {
      technical_details_1: {
        technical_details_title: "Product description",
        technical_details_description: "Profile moving head, with maximum light shaping capabilities, and CRI: ≥ 70 suitable for event, theater, and tv applications, Intelligent fan, noise levels from 45 DB. Modular design for easy production, testing, and maintenance. X / Y positioning is smooth and accurate, ±1°, Magnetic encoder technology. Lens diameter 149 with up to 53.5 degrees linear smooth zoom. 4 blades move smoothly, and bi-directional control."
      },
      technical_details_2: {
        technical_details_title: "Light Source / Optics",
        technical_details_description: "High Power 600 Watt LED, with an approximate lifespan of 20,000 hours. Motorized zoom from 4.5 to 53.5 degrees. Linear dimming & 4 dimmer curves."
      },
      technical_details_3: {
        technical_details_title: "Mechanical effects",
        technical_details_description: "CMY & CTO linear color mixing system. 6x dichroic color & rainbow effect. Slide-in and continuous rotating animation wheel. 7x interchangeable rotating gobos. 7x fixed gobos. Soft edge and hard edge frost filters with immediate or linear insertion. 4-Facet rotating prism. Motorized iris with linear control (5 to 100%)."
      },
      technical_details_4: {
        technical_details_title: "Framing System",
        technical_details_description: "4x blades with insertion and angle control of +/- 45 degrees. Full coverage of the light path. A single blade can block the light output completely. Rotation of the framing system from 0 to 45 degrees."
      },
      technical_details_5: {
        technical_details_title: "Technical Specifications",
        technical_details_description: "CRI ≥ 70, suitable for events. Input voltage: AC100 - 240 Volt. Maximum power consumption: 800W. 3 & 5 pin XLR for DMX connection. DMX Control with 29, 34 or 37 CH. IP20, for indoor use only. Working temperature from 0 to 45 degrees Celsius. Cooling fan smart control, noise levels from 45 to 57 dB. Dimensions: 374 x 355 x 736 mm. Net weight: 32 Kg."
      },
      technical_details_6: {
        technical_details_title: "Packing Details",
        technical_details_description: "Carton box for 1 pc: 71 x 61 x 72 cm - 35 kg"
      }
    },
    MarketId: 1,
    CategoryId: 1,
    SubcategoryId: 1
  },]

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

    // Initial call
    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const cartState = useSelector((state)=> state.cart.cart)
  const updState = useSelector((state)=> state.cart.upd)
  const WishlistState = useSelector((state)=> state?.Wishlist?.wishlists)

 

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
    // Implement add to cart logic here
  };

  
  const AddToWishlist = (userId, productId, quantity) => {
    dispatch(addProductToWishlist({userId, productId, quantity}))
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
                        <img className="cat-logo" src="/images/download.jfif " alt="Category Logo" />
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
          <span className="product-box__availability--in-stock">In stock: 113 available</span>
        </div>
      </div>
      <div className="country-storage d-flex align-items-center">
        <div className="country-storage__item d-flex align-items-center">
          <img src="/images/icons/search.svg" alt="storage-athens" />
          <span className="country-storage__country"> Sofia Warehouse:</span>
          <span className="country-storage__avail country-storage__avail--available">113</span>
        </div>
        <span className="country-storage__seperator"></span>
        <div className="country-storage__item d-flex align-items-center">
          <img src="/images/icons/search.svg" alt="storage-athens" />
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
                      <input type="hidden" name="product_original_image" value={product.image} />
                      <div className="extra-images vertical">
                        {Extra_images?.map((image, index) => (
                          <div className="box additional_image" key={index}>
                            <a href={image} data-fancybox="product-image" data-caption={product.title} className="gallerySmallImage" data-change={image}>
                              <img src={image} border="0" title={product.title} alt={product.title} />
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
                        <img className="cat-logo" src="/images/download.jfif" alt="Category Logo" />
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
                  <div className="product-title-info row no-gutters" style={{ display: xDisplayStyle }}>
      <div className="availability-container w-100 d-flex">
        <div className="availability align-self-center d-flex">
          <span className="product-box__availability--in-stock">In stock: 113 available</span>
        </div>
      </div>
      <div className="country-storage d-flex align-items-center">
        <div className="country-storage__item d-flex align-items-center">
          <img src="/images/icons/search.svg" alt="storage-athens" />
          <span className="country-storage__country"> Sofia Warehouse:</span>
          <span className="country-storage__avail country-storage__avail--available">113</span>
        </div>
        <span className="country-storage__seperator"></span>
        <div className="country-storage__item d-flex align-items-center">
          <img src="/images/icons/search.svg" alt="storage-athens" />
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
    </div>
                  
                    <div className="product_description">{ProductState?.description}</div>
                 
                    <div className="product-info-third-part">
                      
      <div className="productprice wholesale">
        <div className="inner">
          <div id="text" className="price-container">
            <span className="vat">Dealer price: </span>
            <span className="price finalPriceClean">583.85€</span>
          </div>
          <div id="value" className="price-container">
            <span className="vat">Your price: </span>
            <span className="productSpecialPrice finalPrice"> 467.08€</span>
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
        <div className="productQuantity">
          <i className="las la-minus update-product-quantity decrease-product-quantity" onClick={() => decreaseQuantity()}></i>
          <input type="text" name="cart_quantity" id="cart_quantity" value={Quantity} className="cart_quantity_value" />
          <input type="hidden" name="multiples_conversion" value="1" />
          <input type="hidden" name="solid_quantity" value="1" id="solid_quantity" />
          <i className="las la-plus update-product-quantity increase-product-quantity" onClick={() => increaseQuantity()}></i>
          <div className="max-quantity-warning" style={{ display: 'none' }}>Max available quantity</div>
        </div>
        <div className="addtocart">
          <button type="button"onClick={() => AddToCart(userId,ProductState.id,Quantity)} className="btn btn-icon btn-default btn-primary btn-fn-18 btn-big shop-btn update-shopping-cart final" >
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
              <input type="hidden" name="main_max_quantity" value="1" />
              <input type="hidden" name="multiples_conversion" value="1" />
              <input type="hidden" name="solid_quantity" value="1" id="solid_quantity" />
              <input type="hidden" name="products_id" value="1774" />
              <input type="hidden" name="customer_group_id" value="19" />
            </form>
          </div>
        </div>
      </div>
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
    </div>
    
  
                    {/* Additional Product Details */}
                    {/* You can add more details here */}
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
                <div className={"product-page-section-bottom"}>
                  <nav className="position-relative mb-lg-5 mb-3">
                    <div className="nav nav-tabs d-flex justify-content-start justify-content-lg-center border-btm-unset jsProductTabs" id="product-tabs" role="tablist">
                      <button className="nav-link active" id="features-tab" data-toggle="tab" data-target="#features" type="button" role="tab" aria-controls="features" aria-selected="true">Features</button>
                      <button className="nav-link" id="techical-details-tab" data-toggle="tab" data-target="#techical-details" type="button" role="tab" aria-controls="techical-details" aria-selected="true">Technical Details</button>
                      <button className="nav-link" id="accesorries-tab" data-toggle="tab" data-target="#accesorries" type="button" role="tab" aria-controls="accesorries" aria-selected="true">Accessories</button>
                    <button className="nav-link" id="documents-tab" data-toggle="tab" data-target="#documents" type="button" role="tab" aria-controls="documents" aria-selected="true">Documents</button>
                    <button className="nav-link" id="videos-tab" data-toggle="tab" data-target="#videos" type="button" role="tab" aria-controls="videos" aria-selected="true">Videos</button>
                      {/* Add more tabs here */}
                    </div>
                  </nav>
               <div className="tab-content jsProductTabsContent" id="myTabContent">
  <div className="tab-pane fade " id="features" role="tabpanel" aria-labelledby="features-tab">
    <div className="product-info-video-wrapper">
      <iframe
        width="100%"
        height="100%"
        id="video"
        src="//www.youtube.com/embed/bGNl3PMiAeQ?enablejsapi=1&amp;html5=1"
        frameBorder="0"
        allowFullScreen=""
        title="FOS Nitro BSW"
        data-gtm-yt-inspected-8="true"
      ></iframe>
    </div>
  </div>
  <div className="tab-pane fade" id="techical-details" role="tabpanel" aria-labelledby="techical-details-tab">
  <div className="row">
      <div className="col-lg-7 m-auto col-single">
        <div className="accordion accordion--products-details" id="detailsAccordion">
          <div className="card">
            <div className="card-header" id="heading-details-1">
              <div className="collapsed" type="button" data-toggle="collapse" data-target="#details-1" aria-expanded="false" aria-controls="details-1">
                Product Description
              </div>
            </div>
            <div id="details-1" className="collapse" aria-labelledby="heading-details-1" data-parent="#detailsAccordion">
              <div className="card-body">
                <p>Beam/Spot/Wash fixture, based on Stage 295 Watt Discharge Lamp.<br />
                  The newest technology NEOLUX lamp 295 watt become Nitro BSW&nbsp; the ideal solution<br />
                  for large events and concerts that demand a work horse luminaire.<br />
                  &nbsp;</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="heading-details-2">
              <div className="" type="button" data-toggle="collapsed" data-target="#details-2" aria-expanded="false" aria-controls="details-2">
                Light Source / Optics
              </div>
            </div>
            <div id="details-2" className="collapse show " aria-labelledby="heading-details-2" data-parent="#detailsAccordion">
              <div className="card-body">
                <p>Based on Stage 295 Watt discharge lamp, 8000 Kelvin, lifespan of 1500 hours, and maximum luminous flux of 14000 lm.&nbsp;<br />
                  Linear zoom and focus.<br />
                  Beam mode offers 3° to 27°, spot mode ranges from 7° to 36° beam angles.<br />
                  Frost filter for wash light simulation projection.<br />
                  &nbsp;</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="heading-details-1">
              <div className="collapsed" type="button" data-toggle="collapse" data-target="#details-1" aria-expanded="false" aria-controls="details-1">
                Product Description
              </div>
            </div>
            <div id="details-1" className="collapse" aria-labelledby="heading-details-1" data-parent="#detailsAccordion">
              <div className="card-body">
                <p>Beam/Spot/Wash fixture, based on Stage 295 Watt Discharge Lamp.<br />
                  The newest technology NEOLUX lamp 295 watt become Nitro BSW&nbsp; the ideal solution<br />
                  for large events and concerts that demand a work horse luminaire.<br />
                  &nbsp;</p>
              </div>
            </div>
          </div>
          {/* Additional card elements for Effects, Control, Technical Specifications */}
        </div>
      </div>
    </div>
</div>
<div className="tab-pane fade  active show " id="features" role="tabpanel" aria-labelledby="features-tab">
  <div className="product-page-section product-page-section--slider">
    <div className="products-carouesl-product-info">
      <div className="jsProductCarosulFiveProducts slick-initialized slick-slider">
        <Slider {...settingsProduct}>
                  {/* Render product slides */}
                  {products.map((product, index) => (
                    <div key={index}>
                      <a href={product.link}>
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
    </div>
  </div>
  </div>

  {/* Additional tab panes go here */}
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
