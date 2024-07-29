import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart, updateCartItemQuantity, removeFromCart } from '../Features/cart/cartSlice';
import { useTranslation } from 'react-i18next';

const Cart = ({ closeCart }) => {
  const userId = 1;
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart.cart);
  const updState = useSelector((state) => state.cart.upd);
  const [total, setTotal] = React.useState(0);
  const cartRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [userId, updState, dispatch]);

  useEffect(() => {
    if (cartState.length > 0) {
      let total = 0;
      cartState[0].CartProducts.forEach((cartProduct) => {
        total += cartProduct.Product.price * cartProduct.quantity;
      });
      setTotal(total);
    }
  }, [cartState]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        closeCart();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cartRef, closeCart]);

  const increaseQuantity = (cartId, productId, quantity) => {
    dispatch(updateCartItemQuantity({ cartId, productId, quantity: quantity + 1 }));
  };

  const decreaseQuantity = (cartId, productId, quantity) => {
    if (quantity > 1) {
      dispatch(updateCartItemQuantity({ cartId, productId, quantity: quantity - 1 }));
    } else {
      dispatch(removeFromCart({ cartId, productId }));
    }
  };

  const removeItem = (cartId, productId) => {
    dispatch(removeFromCart({ cartId, productId }));
  };

  const handleClickInside = (event) => {
    event.stopPropagation(); // Prevent clicks inside from closing the cart
  };

  return (
    <div
      id="shopping-cart-items-container"
      className="container dynamic_content active"
      ref={cartRef}
      onClick={handleClickInside}
    >
      {cartState[0]?.CartProducts.length === 0 ? (
        <div id="shopping-cart-items-wrapper">
          <div className="centerit empty">{t('yourCartIsEmpty')}</div>
        </div>
      ) : (
        <div id="shopping-cart-items-wrapper">
          <div className="panel" id="mini-cart-panel">
            <div className="items">
              {cartState[0]?.CartProducts.map((item) => (
                <div className="item" key={item.Product.id}>
                  <div className="image">
                    <Link to={`/ProductDetail/${item.Product.id}`}>
                      <img src={item.Product.image} className="mouseOver" alt={item.Product.name} />
                    </Link>
                  </div>
                  <div className="description">
                    <div className="title">
                      <Link to={`/ProductDetail/${item.Product.id}`}>
                        <span className="name">{item.Product.title}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="price_container">
                    <div className="price">
                      <span>{t('price')}:</span>{item.Product.price}€
                    </div>
                    <div className="actionbar">
                      <span>
                        <i
                          className="las la-minus update-minicart-quantity decrease-minicart-quantity"
                          onClick={() => decreaseQuantity(cartState[0].id, item.Product.id, item.quantity)}
                        ></i>
                      </span>
                      <span>
                        <input
                          type="text"
                          name="minicart_quantity[]"
                          value={item.quantity}
                          className="selectform minicart_quantity_action"
                          readOnly
                        />
                        <input type="hidden" name="minicart_products_id[]" value={item.Product.id} />
                        <input type="hidden" name="multiples_conversion" value="1" />
                      </span>
                      <span>
                        <i
                          className="las la-plus update-minicart-quantity increase-minicart-quantity"
                          onClick={() => increaseQuantity(cartState[0].id, item.Product.id, item.quantity)}
                        ></i>
                      </span>
                      <span className="productRemoveMiniCart">
                        <div className="delete action">
                          <input
                            type="checkbox"
                            name="minicart_delete[]"
                            value={item.Product.id}
                            className="minicart_delete_product_value minicart_close_value"
                          />
                        </div>
                        <div className="delete text minicart_close">
                          <i
                            className="las la-trash-alt minicart_delete_product"
                            onClick={() => removeItem(cartState[0].id, item.Product.id)}
                          ></i>
                        </div>
                      </span>
                    </div>
                    <div className="clear"></div>
                  </div>
                  <div className="clear"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="total total_amount">
            <span>{t('total')}:</span>{total.toFixed(2)}€
          </div>
          <div className="goto">
            <Link to="/shopcart">
              <button type="button" className="shop-btn outline">
                <span>{t('shoppingCart')}</span>
              </button>
            </Link>
            <Link className="shop-btn has-icon right" to='/complete-order' id="gotocheckout">
              {t('checkout')}<i className="las la-arrow-right"></i>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
