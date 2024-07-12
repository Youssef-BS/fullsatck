const Cart = require('../Models/Cart');
const Product = require('../Models/Products');
const CartProduct = require('../Models/CartProduct');
const asyncHandler = require('express-async-handler');

// Add product to cart
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.params.userId;
  try {
    // Check if the product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the cart already exists or create a new one
    let cart = await Cart.findOrCreate({
      where: { UserId: userId },
      defaults: { totale: 0, UserId: userId }
    });
    // `findOrCreate` returns an array, where the first element is the instance, and the second element indicates if it was created
    cart = cart[0];

    // Check if the cart already contains this product
    let cartProduct = await CartProduct.findOne({
      where: { CartId: cart.id, ProductId: productId }
    });

    if (cartProduct) {
      // Update quantity if the product is already in the cart
      await cartProduct.update({ quantity: cartProduct.quantity + quantity });
    } else {
      // Create a new cart product if it doesn't exist
      cartProduct = await CartProduct.create({
        CartId: cart.id,
        ProductId: productId,
        quantity: quantity
      });
    }
    // Update the total price in the Cart model
    const updatedTotal = cart.totale + (product.price * quantity);
    await cart.update({ totale: updatedTotal });

    res.status(201).json(cartProduct);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Failed to add product to cart' });
  }
});


// Retrieve all items in the cart
const getCartItems = asyncHandler(async (req, res) => {
  const cartId = req.params.cartId; // Assuming cartId is passed as a parameter

  try {
    const cartItems = await CartProduct.findAll({
      where: { cartId },
      include: [Product]
    });

    res.json(cartItems);
  } catch (error) {
    console.error('Error retrieving cart :', error);
    res.status(500).json({ message: 'Failed to retrieve cart ' });
  }
});
const getCart = asyncHandler(async (req, res) => {
    const userId = req.params.userId; // Assuming cartId is passed as a parameter
  
    try {
      const cart = await Cart.findAll({
        where: { UserId : userId},
        include: [{
          model :CartProduct,
        include : [
          {
            model : Product,
          }
        ]}]
      });
  
      res.json(cart);
    } catch (error) {
      console.error('Error retrieving cart items:', error);
      res.status(500).json({ message: 'Failed to retrieve cart items' });
    }
  });
// Update quantity of a product in the cart
const updateCartItemQuantity = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const cartId = req.params.cartId; // Assuming cartId is passed as a parameter

  try {
    // Check if the cart product exists
    let cartProduct = await CartProduct.findOne({
      where: { CartId:cartId, ProductId:productId }
    });

    if (!cartProduct) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Update the quantity
    await cartProduct.update({ quantity:quantity });

    // Update the total price in the Cart model
    const product = await Product.findByPk(productId);
    const cart = await Cart.findByPk(cartId);

    if (!product || !cart) {
      return res.status(404).json({ message: 'Product or cart not found' });
    }

    const cartItems = await CartProduct.findAll({
      where: { cartId }
    });

    let updatedTotal = 0;
    cartItems.forEach((item) => {
      updatedTotal += item.quantity * product.price;
    });

    await cart.update({ totale: updatedTotal });

    res.json(cartProduct);
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    res.status(500).json({ message: 'Failed to update cart item quantity' });
  }
});

// Remove a product from the cart
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const cartId = req.params.cartId; // Assuming cartId is passed as a parameter

  try {
    // Check if the cart product exists
    const cartProduct = await CartProduct.findOne({
      where: { cartId, productId }
    });

    if (!cartProduct) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Delete the cart product
    await cartProduct.destroy();

    // Update the total price in the Cart model
    const product = await Product.findByPk(productId);
    const cart = await Cart.findByPk(cartId);

    if (!product || !cart) {
      return res.status(404).json({ message: 'Product or cart not found' });
    }

    const cartItems = await CartProduct.findAll({
      where: { cartId }
    });

    let updatedTotal = 0;
    cartItems.forEach((item) => {
      updatedTotal += item.quantity * product.price;
    });

    await cart.update({ total: updatedTotal });

    res.json( cart);
  } catch (error) {
    console.error('Error removing product from cart:', error);
    res.status(500).json({ message: 'Failed to remove product from cart' });
  }
});

module.exports = {
  addToCart,
  getCartItems,
  updateCartItemQuantity,
  removeFromCart,
  getCart
};
