import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, updateProduct } from '../features/product/productSlice';
import { getBrands } from '../features/brand/brandSlice';
import { useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const markets = useSelector((state) => state.brand.brands);

  const [formState, setFormState] = useState({
    code: '',
    title: '',
    description: '',
    image: '',
    extraImages: [],
    extraVideo: '',
    price: '',
    availability: '',
    stockEta: '',
    features: '',
    technicalDetails: '',
    selectedMarket: '',
    selectedCategory: '',
    selectedSubcategory: '',
    selectedSubSubcategory: ''
  });

  useEffect(() => {
    dispatch(getProduct(id));
    dispatch(getBrands());
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setFormState({
        code: product.code,
        title: product.title,
        description: product.description,
        image: product.image,
        extraImages: product.extra_images || [],
        extraVideo: product.extra_video || '',
        price: product.price,
        availability: product.availability,
        stockEta: product.stock_eta,
        features: product.features,
        technicalDetails: product.technical_details,
        selectedMarket: product.marketId,
        selectedCategory: product.categoryId,
        selectedSubcategory: product.subcategoryId,
        selectedSubSubcategory: product.subSubcategoryId
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        id,
        ...formState,
        price: parseFloat(formState.price),
        marketId: parseInt(formState.selectedMarket),
        categoryId: parseInt(formState.selectedCategory),
        subcategoryId: parseInt(formState.selectedSubcategory),
        subSubcategoryId: parseInt(formState.selectedSubSubcategory)
      };
      dispatch(updateProduct({productId: id, productData: updatedProduct}));
      // Optionally, reset the form or navigate away
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Code:</label>
          <input
            type="text"
            className="form-control"
            name="code"
            value={formState.code}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formState.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            className="form-control"
            rows="3"
            name="description"
            value={formState.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={formState.image}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Extra Images:</label>
          <input
            type="text"
            className="form-control"
            name="extraImages"
            value={formState.extraImages.join(',')}
            onChange={(e) => handleInputChange({ target: { name: 'extraImages', value: e.target.value.split(',') } })}
          />
          <small className="form-text text-muted">Enter multiple URLs separated by commas</small>
        </div>
        <div className="form-group">
          <label>Extra Video:</label>
          <input
            type="text"
            className="form-control"
            name="extraVideo"
            value={formState.extraVideo}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            name="price"
            value={formState.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Availability:</label>
          <select
            className="form-control"
            name="availability"
            value={formState.availability}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Availability</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
        <div className="form-group">
          <label>Stock ETA:</label>
          <input
            type="text"
            className="form-control"
            name="stockEta"
            value={formState.stockEta}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Features:</label>
          <textarea
            className="form-control"
            rows="3"
            name="features"
            value={formState.features}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Technical Details:</label>
          <textarea
            className="form-control"
            rows="3"
            name="technicalDetails"
            value={formState.technicalDetails}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="market">Select Market</label>
          <select
            className="form-control"
            id="market"
            name="selectedMarket"
            value={formState.selectedMarket}
            onChange={handleInputChange}
          >
            <option value="">Select a market</option>
            {markets.map(market => (
              <option key={market.id} value={market.id}>{market.name}</option>
            ))}
          </select>
        </div>
        {formState.selectedMarket && (
          <div className="form-group">
            <label htmlFor="category">Select Category</label>
            <select
              className="form-control"
              id="category"
              name="selectedCategory"
              value={formState.selectedCategory}
              onChange={handleInputChange}
            >
              <option value="">Select a category</option>
              {markets.find(m => m.id === formState.selectedMarket)?.Categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        )}
        {formState.selectedCategory && (
          <div className="form-group">
            <label htmlFor="subcategory">Select Subcategory</label>
            <select
              className="form-control"
              id="subcategory"
              name="selectedSubcategory"
              value={formState.selectedSubcategory}
              onChange={handleInputChange}
            >
              <option value="">Select a subcategory</option>
              {markets.find(m => m.id === formState.selectedMarket)?.Categories.find(c => c.id === formState.selectedCategory)?.Subcategories.map(subcategory => (
                <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
              ))}
            </select>
          </div>
        )}
        {formState.selectedSubcategory && (
          <div className="form-group">
            <label htmlFor="subsubcategory">Select SubSubcategory</label>
            <select
              className="form-control"
              id="subsubcategory"
              name="selectedSubSubcategory"
              value={formState.selectedSubSubcategory}
              onChange={handleInputChange}
            >
              <option value="">Select a subsubcategory</option>
              {markets.find(m => m.id === formState.selectedMarket)?.Categories.find(c => c.id === formState.selectedCategory)?.Subcategories.find(sc => sc.id === formState.selectedSubcategory)?.SubSubcategories.map(subsub => (
                <option key={subsub.id} value={subsub.id}>{subsub.name}</option>
              ))}
            </select>
          </div>
        )}
        <button type="submit" className="btn btn-primary">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
