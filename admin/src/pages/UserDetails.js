import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUser, updateUser } from '../features/users/userSlice';

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector((state) => state.user.userSelect); 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    country: '',
    company: '',
    street_address: '',
    postcode: '',
    city: '',
    lastname: '',
    firstname: '',
    vat: '',
    telephone: '',
    website: '',
  });

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id, ...formData })).then(() => {
      toast.success('User updated successfully!');
    }).catch(() => {
      toast.error('Failed to update user.');
    });
  };

  return (
    <div className='container mt-5'>
      <h3 className='mb-4'>Update User Details</h3>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='firstname'>First Name</label>
          <input
            type='text'
            className='form-control'
            id='firstname'
            name='firstname'
            value={formData.firstname}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='lastname'>Last Name</label>
          <input
            type='text'
            className='form-control'
            id='lastname'
            name='lastname'
            value={formData.lastname}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='country'>Country</label>
          <input
            type='text'
            className='form-control'
            id='country'
            name='country'
            value={formData.country}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='company'>Company</label>
          <input
            type='text'
            className='form-control'
            id='company'
            name='company'
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='street_address'>Street Address</label>
          <input
            type='text'
            className='form-control'
            id='street_address'
            name='street_address'
            value={formData.street_address}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='postcode'>Postcode</label>
          <input
            type='text'
            className='form-control'
            id='postcode'
            name='postcode'
            value={formData.postcode}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='city'>City</label>
          <input
            type='text'
            className='form-control'
            id='city'
            name='city'
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='vat'>VAT</label>
          <input
            type='text'
            className='form-control'
            id='vat'
            name='vat'
            value={formData.vat}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='telephone'>Telephone</label>
          <input
            type='text'
            className='form-control'
            id='telephone'
            name='telephone'
            value={formData.telephone}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='website'>Website</label>
          <input
            type='text'
            className='form-control'
            id='website'
            name='website'
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        <button type='submit' className='btn btn-primary'>Update</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UserDetails;
