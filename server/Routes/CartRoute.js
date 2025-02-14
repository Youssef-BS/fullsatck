const express  = require('express')
const { getCartItems,addToCart,removeFromCart,updateCartItemQuantity, getCart }  =require('../Controller/CartCtrl');

const router = express.Router();


// Get all products from a specific market
router.post('/:userId/add', addToCart);

router.get('/:cartId',getCartItems)
router.post('/:cartId/update',updateCartItemQuantity)

router.delete('/:cartId/remove',removeFromCart)
router.get('/:userId/cart',getCart)


module.exports = router