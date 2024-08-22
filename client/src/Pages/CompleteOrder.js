import React , {useState , useEffect} from 'react';
import { Edit, Lock, Add, Check, Truck, University, CashRegister, ShoppingCart, Percent  , LockOpen } from '@mui/icons-material';
import { Radio, FormControlLabel, TextareaAutosize } from '@mui/material';
import { LocalShippingOutlined, AccountBalanceOutlined, ShoppingCartOutlined , MonetizationOn } from '@mui/icons-material';
import { CheckBoxOutlineBlank, CheckBox } from '@mui/icons-material';
import { selectCurrentUser } from '../Features/auth/authSlice';
import { useSelector , useDispatch } from 'react-redux';
import { getUser , updateUser } from '../Features/users/userSlice';
import { fetchCart, updateCartItemQuantity } from '../Features/cart/cartSlice';
import { loadStripe } from '@stripe/stripe-js';
// const { generatePDFReceipt } = require('./pdf');

const Col1 = () => {
 
    const dispatch = useDispatch();
    const CurrentUser = useSelector(selectCurrentUser);
    const user = useSelector((state) => state.user.userSelect); 
    const [locked , setLocked] = useState(true) ;
    const [checked, setChecked] = useState(false);
    const [differentAddress, setDifferentAddress] = useState('');

    const handleCheckboxChange = (e) => {
        setChecked(e.target.checked);
    }

    const handleAddressChange = (e) => {
        setDifferentAddress(e.target.value);
    }
 
    const handleLock = ()=> {
        setLocked(!locked) ;
    }

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        vat: '',
        address: '',
        street: '',
        city: '',
        postcode: '',
        website: '',
        country: '',
        company: '',
      });

      useEffect(() => {
        if (user) {
          setFormData({
            email: user.email || '',
            password: '',
            country: user.country || '',
            company: user.company || '',
            street_address: user.street_address || '',
            postcode: user.postcode || '',
            city: user.city || '',
            lastname: user.lastname || '',
            firstname: user.firstname || '',
            vat: user.vat || '',
            telephone: user.telephone || '',
            website: user.website || '',
          });
        }
      }, [user]);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      useEffect(() => {
        dispatch(getUser(CurrentUser.user.id));
  }, [dispatch, CurrentUser]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const userId = CurrentUser.user.id;
    dispatch(updateUser({ id: userId, userData: formData }));
  };

    console.log(CurrentUser?.user)

    return (
        <div className="checkout-column column-1">
            <div className="checkout-box personal-details">
                <h3 className="step_title">
                    Company Details
                    <div className="edit-details" style={{ display: 'block' }} onClick={handleLock}>
                        <span>Edit</span>
                        {locked ? <Lock /> : <LockOpen />}
                    </div>

                </h3>
                {!locked ?   
                 <div className="description button">
                              <input
                                  type="submit"
                                  value="Save changes"
                                  id="confirm_order_submit"
                                  border="0"
                                  className="shop-btn"
                                  alt="Confirm Order"
                                  title="Confirm Order"
                                  style={{backgroundColor: 'red' , margin : 'auto' , textAlign: 'center'}}
                                  onClick={handleUpdate}
                              />
                          </div> : ""}
                <section className="step">
                    <div id="customer-details">
                        <div className="express-customer-toggle" style={{ display: 'none' }}>
                            Payment Details <Add />
                        </div>
                        <div id="expresscustomer" className="locked">
                            <div className="box">
                                <div className="field">
                                    <div className="fieldlabel">Company name:</div>
                                    <div className="fieldkey">
                                    <input 
                type="text" 
                name="company" 
                id="company" 
                value={formData.company}
                onChange={handleInputChange}
                readOnly={locked} 
            />
                                        <span className="inputRequirement">*</span>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="fieldlabel">VAT:</div>
                                    <div className="fieldkey">
                                        <input type="text" name="vat" id="vat" value={formData.vat}
                                    onChange={handleInputChange} readOnly={locked}  />
                                        <span className="inputRequirement">*</span>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="fieldlabel">First name:</div>
                                    <div className="fieldkey">
                                        <input type="text" name="firstname" id="firstname"   value={formData.firstname}
                                    onChange={handleInputChange} readOnly={locked}  />
                                        <span className="inputRequirement">*</span>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="fieldlabel">Last name:</div>
                                    <div className="fieldkey">
                                        <input type="text" name="lastname" id="lastname"   value={formData.lastname}
                                    onChange={handleInputChange} readOnly={locked}  />
                                        <span className="inputRequirement">*</span>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="fieldlabel">Telephone:</div>
                                    <div className="fieldkey">
                                        <input type="text" name="telephone" id="telephone"   value={formData.telephone}
                                        onChange={handleInputChange} 
                                        readOnly={locked}  />
                                        <span className="inputRequirement">*</span>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="fieldlabel">Email Address:</div>
                                    <div className="fieldkey">
                                        <input type="text" name="email_address" id="email_address"   value={formData.email}
                                    onChange={handleInputChange} readOnly={locked}  />
                                        <span className="inputRequirement">*</span>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="fieldlabel">Address:</div>
                                    <div className="fieldkey">
                                        <input type="text" name="street_address" id="street_address"   value={formData.street_address}
                                    onChange={handleInputChange} readOnly={locked}  />
                                        <span className="inputRequirement">*</span>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="fieldlabel">Postcode:</div>
                                    <div className="fieldkey">
                                        <input type="text" name="postcode" id="postcode"   value={formData.postcode}
                                    onChange={handleInputChange} readOnly={locked}  />
                                        <span className="inputRequirement">*</span>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="fieldlabel">City:</div>
                                    <div className="fieldkey">
                                        <input type="text" name="city" id="city"   value={formData.city}
                                    onChange={handleInputChange} readOnly={locked}  />
                                        <span className="inputRequirement">*</span>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="fieldlabel">Country:</div>
                                    <div className="fieldkey">
                                        <select name="country" id="country"   value={formData.country}
                                        onChange={handleInputChange}>
                                            <option value="">Select</option>
                                            <option value="84">Greece</option>
                                            <option value="55">Cyprus</option>
                                        </select>
                                        <span className="inputRequirement">*</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="fieldkey change-customer-details-container_mobile mobile">
                        <a href="https://www.fos-lighting.eu/account_edit.php?origin=checkout" id="change-customer-details" className="mainimagebutton1">
                            Account Information
                        </a>
                    </div>

                    <div className="checkbox-holder">
            <div className="cboxcontainer send-other">
                <input
                    type="checkbox"
                    name="send-to-different-address"
                    id="send-to-different-address"
                    checked={checked}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="send-to-different-address" className="css-label">
                    Ship to a different address?
                </label>
            </div>
            {checked && (
                <input
                    type='text'
                    placeholder='Enter the different address'
                    value={differentAddress}
                    onChange={handleAddressChange}
                />
            )}
        </div>

                    <div className="new-address">
                        <select name="available_addresses" id="autocomplete_available_addresses" className="update-totals">
                            <option value="#" disabled>Select Address</option>
                            <option value="19936">WEB EVENT SERVICES, Chaouki RAFRAFI, 7 rue Éric Tabarly, Massy, 91300, France</option>
                            <option value="new">New address</option>
                        </select>
                        <div className="show-action send-to-different-address">
                            <div className="box">
                                <div className="field">
                                    <div className="fieldlabel">First name:</div>
                                    <div className="fieldkey">
                                        <input type="text" name="firstname_shipping" id="firstname_shipping" />
                                        <span className="inputRequirement">*</span>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="fieldlabel">Last name:</div>
                                    <div className="fieldkey">
                                        <input type="text" name="lastname_shipping" id="lastname_shipping" />
                                        <span className="inputRequirement">*</span>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="fieldlabel">Address:</div>
                                    <div className="fieldkey">
                                        <input type="text" name="street_address_shipping" id="street_address_shipping" />
                                        <span className="inputRequirement">*</span>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="fieldlabel">Telephone:</div>
                                    <div className="fieldkey">
                                        <input type="text" name="telephone_shipping" id="telephone_shipping" />
                                        <span className="inputRequirement">*</span>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="fieldlabel">Postcode:</div>
                                    <div className="fieldkey">
                                        <input type="text" name="postcode_shipping" id="postcode_shipping" />
                                        <span className="inputRequirement">*</span>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="fieldlabel">City:</div>
                                    <div className="fieldkey">
                                        <input type="text" name="city_shipping" id="city_shipping" />
                                        <span className="inputRequirement">*</span>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="fieldlabel">Country:</div>
                                    <div className="fieldkey">
                                        <select name="country_shipping" id="country_shipping">
                                            <option value="">Select</option>
                                            <option value="84">Greece</option>

                                        </select>
                                        &nbsp;
                                    
                                        <span className="inputRequirement">*</span>
                                    </div>
                                </div>
                              
                            </div>
                           
                        </div>
                    </div>
                    
                </section>
            </div>
        </div>
    );
};


const OrderSummary = () => {

    const [selectedMethod, setSelectedMethod] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [comments, setSelectedComments] = useState('');

    console.log(selectedMethod , selectedPaymentMethod, comments) ;

    const cartState = useSelector((state) => state.cart.cart);
    const updState = useSelector((state) => state.cart.upd);

    console.log(cartState[0]?.CartProducts)

    const dispatch = useDispatch() ;
    const CurrentUser = useSelector(selectCurrentUser);
     
    const userId = CurrentUser?.user?.id ; 
    useEffect(() => {
        dispatch(fetchCart(userId));
      }, [userId, updState]);


    
  return (

      <div className="checkout-column column-2">
          <div className="checkout-box shipping">
          <section id="step_2">
            <div className="title shippings">
                <h3 className="step_title"><LocalShippingOutlined /> Shipping Method</h3>
            </div>
            <div className="box">
                <div>
                    <div className="module form-check">
                        <label className="form-check-label">
                            <input
                                type="radio"
                                className="form-check-input"
                                name="shipping"
                                value="delivery_at_place"
                                checked={selectedMethod === 'delivery_at_place'}
                                onChange={() => setSelectedMethod('delivery_at_place')}
                            />
                            <br />
                            <div className="module-title">
                                Delivery at Place<br />
                                (freight cost will be included to your invoice)
                            </div>
                        </label>
                    </div>
                </div>
                <div>
                    <div className="module form-check">
                        <label className="form-check-label">
                            <input
                                type="radio"
                                className="form-check-input"
                                name="shipping"
                                value="delivery_at_carrier"
                                checked={selectedMethod === 'delivery_at_carrier'}
                                onChange={() => setSelectedMethod('delivery_at_carrier')}
                            />
                            <br />
                            <div className="module-title">
                                Delivery at carrier on Friday<br />
                                (freight cost will be included to your invoice)
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </section>
          </div>

          <div className="checkout-box payment">
            <h3 className="step_title"><AccountBalanceOutlined /> Payment Method</h3>
            <section id="step_3" className="inactivate step">
                <div className="payment-details-container">
                    <div className="payment-module form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="payment"
                            value="bank_account_deposit"
                            id="bank_account_deposit"
                            checked={selectedPaymentMethod === 'bank_account_deposit'}
                            onChange={() => setSelectedPaymentMethod('bank_account_deposit')}
                        />
                        <label className="form-check-label" htmlFor="bank_account_deposit">
                            Bank account deposit
                        </label>
                    </div>
                    <div className="payment-module form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="payment"
                            value="payment_by_card"
                            id="payment_by_card"
                            checked={selectedPaymentMethod === 'payment_by_card'}
                            onChange={() => setSelectedPaymentMethod('payment_by_card')}
                        />
                        <label className="form-check-label" htmlFor="payment_by_card">
                            Payment By Card
                        </label>
                    </div>
                </div>
            </section>
        </div>

        <div className="confirmation-product">
                {cartState[0]?.CartProducts?.map((cartProduct) => (
                    <div className="description" key={cartProduct.Product.id}>
                        <div className="item">
                            <span className="image">
                                <img
                                    src={cartProduct.Product.image}
                                    alt={cartProduct.Product.title}
                                    style={{ width: '57px', height: '38px' }}
                                />
                            </span>
                            <div className="inner">
                                <span className="name">{cartProduct.Product.title}</span>
                                <span className="model">Model: {cartProduct.Product.code}</span>
                            </div>
                        </div>
                        <div className="qty">
                            
                            <input
                                type="text"
                                name="cart_quantity[]"
                                id="cart_quantity[]"
                                value={cartProduct.quantity}
                                style={{ width: '40px', textAlign: 'center' }}
                                className="selectform cart_quantity_action cart_quantity_value"
                                readOnly
                            />
                            
                        </div>
                        <div className="price">{cartProduct.Product.price}€</div>
                    </div>
                ))}
            </div>

          <div className="checkout-box comments">
              <div className="comments-container">
                  <div className="title">
                      <h3 className="step_title">Add Comments About Your Order</h3>
                  </div>
                  <div className="description">
                      <textarea  
                          name="comments"
                          placeholder="Add comments or instructions about your order ..."
                          rowsMin={2}
                          style={{ width: '100%' }}
                          onChange={(e)=> setSelectedComments(e.target.value)}
                      />
                  </div>
              </div>
          </div>
      </div>
  );
};

const OrderTotals = () => {
    const cartState = useSelector((state) => state.cart.cart);
    const updState = useSelector((state) => state.cart.upd);
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch() ;
    const CurrentUser = useSelector(selectCurrentUser);
     
    const userId = CurrentUser?.user?.id ; 
    const email = CurrentUser?.user?.email ; 

    useEffect(() => {
        dispatch(fetchCart(userId));
      }, [userId, updState]);

    useEffect(() => {
        if (cartState.length > 0) {
          let total = 0;
          cartState[0].CartProducts.map((cartProduct) => {
            total += cartProduct.Product.price * cartProduct.quantity;
          });
          setTotal(total);
        }
      }, [cartState]);

      const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51PjN2iP46Jm8DMlLNxj6oDfoNVimNEKG4YBUbSURYNn25QSrJ2ApPuZL89FxSlqTIw5VMvuKa6z4eeQuk5KxqVCG00mIZixeqI");
        
        const body = {
          products: cartState[0]?.CartProducts,
          email: email
        };
      
        const headers = {
          'Content-Type': 'application/json',
        };
      
        const response = await fetch('http://localhost:3000/cart/payment', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(body),
        });
      
        if (!response.ok) {
          console.error('Error:', await response.text());
          return;
        }
      
        const session = await response.json();
      
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
      
        if (result.error) {
          console.error(`Error redirecting to Checkout: ${result.error.message}`);
        }
      };
      

  return (
      <div className="checkout-column column-3">
          <div className="title">
              <h3 className="step_title"><MonetizationOn /> Order Totals</h3>
          </div>
          <div className="container">
              <div className="checkout-totals-container">
                  <div className="checkout-box totals">
                      <div className="confirmation-check-totals">
                          <div className="order-total-container">
                              <div className="order-total total">
                                  <div className="order-total-title">Total:</div>
                                  <div className="order-total-text"><b>{total}€</b></div>
                              </div>
                          </div>
                          <div className="description prices-not-include-vat">
                              Prices do not include VAT
                          </div>
                          <div className="description button">
                              <input

                                  onClick={makePayment}
                                  type="button"
                                  value="Confirm Order"
                                  className="shop-btn"
                                  id="confirm_order_submit"
                                  border="0"
                                  alt="Confirm Order"
                                  title="Confirm Order"
                              />
                          </div>
                      </div>
                  </div>
              </div>

              <div className="field agree-check-box" style={{ marginTop: '12px' }}>
                  <div className="cboxcontainer d-flex flex-column">
                      <input type="checkbox" name="agreeterms" value="0" id="agreeterms" />
                      <label htmlFor="agreeterms" className="css-label">
                          <CheckBoxOutlineBlank /> I agree with<a className="ml-1" href="https://www.fos-lighting.eu/gdpr.php" target="_blank" style={{ textDecoration: 'underline' }}> personal data terms</a>
                      </label>
                  </div>
              </div>

              <div className="field agree-check-box">
                  <div className="cboxcontainer d-flex flex-column">
                      <input type="checkbox" name="agreeterms_cooperations" value="0" id="agreeterms_cooperations" />
                      <label htmlFor="agreeterms_cooperations" className="css-label">
                          <CheckBoxOutlineBlank /> I accept <a href="https://www.fos-lighting.eu/terms-of-cooperation-pr-3.html" target="_blank">cooperation terms</a>
                      </label>
                  </div>
              </div>

              <div className="field coupon-btn-container">
                  <span className="coup-btn">Got a coupon? Click here to use it</span>
              </div>

              <div className="container coupon-main-cont" style={{ display: 'none' }}>
                  <div className="checkout-box discount">
                      <div className="discount-coupon-container">
                          <div className="title"><Percent /> Discount Coupon</div>
                          <div className="description fieldkey">
                              <Percent />
                              <input type="text" name="discount_coupon" id="discount_coupon" className="has-icon" placeholder="Coupon Code" />
                          </div>
                      </div>
                  </div>
              </div>

          </div>
      </div>
  );
};




const CompleteOrderForm = () => {
    
    return (
       
        <form name="checkout" id="checkout" action="#" method="post" noValidate>
            <input type="hidden" name="action" value="process" />
            <input type="hidden" name="pass" value="true" />
            <input type="hidden" name="form-action" value="#" />
            <input type="hidden" name="customer_id" value="16445" />
            <div className="progress-container">
                <ul className="progress-steps">
                    <li className="done" value="0"><i className="las la-door-open"></i></li>
                    <li className="active checkout" value="0"><i className="las la-shopping-cart"></i></li>
                    <li className="final" value="0"><i className="las la-check"></i></li>
                </ul>
            </div>
            <div className="one-page-checkout">
                <div className="headingtitle">
                    <h1>Complete Your Order</h1>
                </div>
                <div className="mainwrap inner">
                    <div className="tablet-container">
                        <Col1/>
                        <OrderSummary/>  
                    </div>
                    <OrderTotals/>
                </div>
            </div>
            </form>
            
            
       
    );
};

export default CompleteOrderForm;
