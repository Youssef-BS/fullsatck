import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBrand } from '../features/brand/brandSlice';

const MarketForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    try {
      dispatch(createBrand(formData));
      setMessage('Market created successfully!');
    } catch (error) {
      setMessage('Error creating market');
      console.error('There was an error creating the market!', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Brand</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="name">Brand Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Brand Image</label>
          <input
            type="text"
            className="form-control"
            id="image"
            value={image}
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MarketForm;
