import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProducts } from '../features/product/productSlice';

const Addproduct = () => {
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [extraImages, setExtraImages] = useState([]);
  const [extraVideo, setExtraVideo] = useState('');
  const [price, setPrice] = useState('');
  const [availability, setAvailability] = useState('');
  const [stockEta, setStockEta] = useState('');
  const [features, setFeatures] = useState('');
  const [technicalDetails, setTechnicalDetails] = useState('');
  const [marketId, setMarketId] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [subcategoryId, setSubcategoryId] = useState(null);
  const [subSubcategoryId, setSubSubcategoryId] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        code,
        title,
        description,
        image,
        extra_images: extraImages,
        extra_video: extraVideo,
        price: parseFloat(price), // Ensure price is converted to float
        availability,
        stock_eta: stockEta,
        features,
        technical_details: technicalDetails,
        marketId: parseInt(marketId), // Ensure marketId is converted to integer if needed
        categoryId: parseInt(categoryId),
        subcategoryId: parseInt(subcategoryId),
        subSubcategoryId: parseInt(subSubcategoryId),
      };

      dispatch(createProducts(newProduct)); // Dispatch action with new product data
      // Optionally, you can reset the form fields here
      resetForm();
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error (show error message, etc.)
    }
  };

  // Function to reset form fields after submission
  const resetForm = () => {
    setCode('');
    setTitle('');
    setDescription('');
    setImage('');
    setExtraImages([]);
    setExtraVideo('');
    setPrice('');
    setAvailability('');
    setStockEta('');
    setFeatures('');
    setTechnicalDetails('');
    setMarketId('');
    setCategoryId(null);
    setSubcategoryId(null);
    setSubSubcategoryId(null);
  };

  return (
    <div className="container mt-5">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Code:</label>
          <input type="text" className="form-control" value={code} onChange={(e) => setCode(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Title:</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Image URL:</label>
          <input type="text" className="form-control" value={image} onChange={(e) => setImage(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Extra Images:</label>
          <input type="text" className="form-control" value={extraImages} onChange={(e) => setExtraImages(e.target.value.split(','))} />
          <small className="form-text text-muted">Enter multiple URLs separated by commas</small>
        </div>

        <div className="form-group">
          <label>Extra Video:</label>
          <input type="text" className="form-control" value={extraVideo} onChange={(e) => setExtraVideo(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input type="number" step="0.01" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Availability:</label>
          <select className="form-control" value={availability} onChange={(e) => setAvailability(e.target.value)} required>
            <option value="">Select Availability</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        <div className="form-group">
          <label>Stock ETA:</label>
          <input type="text" className="form-control" value={stockEta} onChange={(e) => setStockEta(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Features:</label>
          <textarea className="form-control" rows="3" value={features} onChange={(e) => setFeatures(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Technical Details:</label>
          <textarea className="form-control" rows="3" value={technicalDetails} onChange={(e) => setTechnicalDetails(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Market ID:</label>
          <input type="number" className="form-control" value={marketId} onChange={(e) => setMarketId(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Category ID:</label>
          <input type="number" className="form-control" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Subcategory ID:</label>
          <input type="number" className="form-control" value={subcategoryId} onChange={(e) => setSubcategoryId(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Subsubcategory ID:</label>
          <input type="number" className="form-control" value={subSubcategoryId} onChange={(e) => setSubSubcategoryId(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
};

export default Addproduct;
