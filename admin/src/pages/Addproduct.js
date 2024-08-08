import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { createProducts } from '../features/product/productSlice';
import { getBrands } from '../features/brand/brandSlice';

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
  const [selectedMarket, setSelectedMarket] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState('');
  const dispatch = useDispatch();

  const handleMarketChange = (e) => {
    setSelectedMarket(e.target.value);
    setSelectedCategory('');
    setSelectedSubcategory('');
    setSelectedSubSubcategory('');
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory('');
    setSelectedSubSubcategory('');
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
    setSelectedSubSubcategory('');
  };

  const handleSubSubcategoryChange = (e) => {
    setSelectedSubSubcategory(e.target.value);
  };

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
        marketId: parseInt(selectedMarket), // Ensure marketId is converted to integer if needed
        categoryId: parseInt(selectedCategory),
        subcategoryId: parseInt(selectedSubcategory),
        subSubcategoryId: parseInt(selectedSubSubcategory),
      };

      dispatch(createProducts(newProduct)); // Dispatch action with new product data
      // Optionally, you can reset the form fields here
      resetForm();
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error (show error message, etc.)
    }
  };
  const markets = useSelector((state) => state.brand.brands);

  useEffect(()=>{
    dispatch(getBrands());
  },[dispatch])
console.log(markets)

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
  const renderOptions = (items, level = 0) => {
    return items.map(item => (
      <React.Fragment key={item.id}>
        <option value={item.id}>
          {'-'.repeat(level) + ' ' + item.name}
        </option>
        {item.children && renderOptions(item.children, level + 1)}
      </React.Fragment>
    ));
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
          <label htmlFor="market">Select Market</label>
          <select
            className="form-control"
            id="market"
            value={selectedMarket}
            onChange={handleMarketChange}
          >
            <option value="">Select a market</option>
            {markets.map(market => (
              <option key={market.id} value={market.id}>{market.name}</option>
            ))}
          </select>
        </div>
        {selectedMarket && (
          <div className="form-group">
            <label htmlFor="category">Select Category</label>
            <select
              className="form-control"
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Select a category</option>
              {markets?.find(m => m.id == selectedMarket)?.Categories?.map(category => (
                <option key={category?.id} value={category?.id}>{category?.name}</option>

              ))}
            </select>
          </div>
        )}
        {selectedCategory && (
          <div className="form-group">
            <label htmlFor="subcategory">Select Subcategory</label>
            <select
              className="form-control"
              id="subcategory"
              value={selectedSubcategory}
              onChange={handleSubcategoryChange}
            >
              <option value="">Select a subcategory</option>
              {markets.find(m => m.id == selectedMarket)?.Categories.find(c => c.id == selectedCategory)?.Subcategories.map(subcategory => (
                <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
              ))}
            </select>
          </div>
        )}
        {selectedSubcategory && (
          <div className="form-group">
            <label htmlFor="subsubcategory">Select SubSubcategory</label>
            <select
              className="form-control"
              id="subsubcategory"
              value={selectedSubSubcategory}
              onChange={handleSubSubcategoryChange}
            >
              <option value="">Select a subsubcategory</option>
              {markets.find(m => m.id == selectedMarket)?.Categories.find(c => c.id == selectedCategory)?.Subcategories.find(sc => sc.id == selectedSubcategory)?.SubSubcategories.map(subsub => (
                <option key={subsub.id} value={subsub.id}>{subsub.name}</option>
              ))}
            </select>
          </div>
        )}

        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
};

export default Addproduct;