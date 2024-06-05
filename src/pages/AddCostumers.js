import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/users/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCustomers = () => {
  const dispatch = useDispatch();
  const [customer, setCustomer] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addUser(customer));
      // Clear form after successful submission
      setCustomer({
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
      // Show success toast notification
      toast.success('New user added successfully!');
    } catch (error) {
      console.error('Error adding user:', error.message);
      // Display error toast notification
      toast.error(error.message);
    }
  };

  return (
    <div className='container mt-5'>
      <h1 className='mb-4'>Add New Customers</h1>
      <form className='form-user' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='firstname'>First Name</label>
          <input type='text' className='form-control' id='firstname' name='firstname' value={customer.firstname} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='lastname'>Last Name</label>
          <input type='text' className='form-control' id='lastname' name='lastname' value={customer.lastname} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' className='form-control' id='email' name='email' value={customer.email} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='password' className='form-control' id='password' name='password' value={customer.password} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='country'>Country</label>
          <input type='text' className='form-control' id='country' name='country' value={customer.country} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='company'>Company</label>
          <input type='text' className='form-control' id='company' name='company' value={customer.company} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='street_address'>Street Address</label>
          <input type='text' className='form-control' id='street_address' name='street_address' value={customer.street_address} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='postcode'>Postcode</label>
          <input type='text' className='form-control' id='postcode' name='postcode' value={customer.postcode} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='city'>City</label>
          <input type='text' className='form-control' id='city' name='city' value={customer.city} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='vat'>VAT</label>
          <input type='text' className='form-control' id='vat' name='vat' value={customer.vat} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='telephone'>Telephone</label>
          <input type='text' className='form-control' id='telephone' name='telephone' value={customer.telephone} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='website'>Website</label>
          <input type='text' className='form-control' id='website' name='website' value={customer.website} onChange={handleChange} />
        </div>
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
};

export default AddCustomers;
