import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, updateOrder } from '../features/order/orderSlice';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, isError, message } = useSelector((state) => state.orders);
  
  // State for filter
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  // Filter orders based on filter criteria
  const filteredOrders = filter === 'All'
    ? orders
    : orders.filter((order) => order.orderStatus === filter);

  const handleStatusUpdate = (e, orderId, orderData) => {
    e.preventDefault();
    try {
      dispatch(updateOrder({ id: orderId, orderData }));
    } catch (e) {
      console.error('Error updating order:', e);
      return;
    }
  };

  if (isLoading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          Error: {message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">All Orders</h1>

      {/* Filter */}
      <div className="mb-3">
        <label htmlFor="orderStatusFilter" className="form-label">Filter by Status:</label>
        <select
          id="orderStatusFilter"
          className="form-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Order Number</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Cost</th>
            <th>Comments</th>
            <th>User</th>
            <th>Products</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => {
            const orderCost = parseFloat(order.orderCost); // Ensure orderCost is a number

            return (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.orderDate}</td>
                <td>{order.orderStatus}</td>
                <td>${orderCost.toFixed(2)}</td>
                <td>{order.comment}</td>
                <td>{order.User?.name} ({order.User?.email})</td>
                <td>
                  {order.Products?.map((product) => (
                    <div key={product.id} className="d-flex align-items-center mb-2">
                      <img src={product.image} alt={product.title} className="img-thumbnail me-2" style={{ maxWidth: '100px' }} />
                      <p className="mb-0">{product.title}</p>
                    </div>
                  ))}
                </td>
                <td>
                  <button
                    className="btn btn-success me-2"
                    onClick={(e) => handleStatusUpdate(e, order.id, {
                      orderStatus: 'Shipped',
                      firstname: order.User.firstname,
                      lastname: order.User.lastname,
                      email: order.User.email
                    })}
                  >
                    Mark as Shipped
                  </button>
                  <button
                    className="btn btn-warning me-2"
                    onClick={(e) => handleStatusUpdate(e, order.id, {
                      orderStatus: 'Pending',
                      firstname: order.User.firstname,
                      lastname: order.User.lastname,
                      email: order.User.email
                    })}
                  >
                    Mark as Pending
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => handleStatusUpdate(e, order.id, {
                      orderStatus: 'Cancelled',
                      firstname: order.User.firstname,
                      lastname: order.User.lastname,
                      email: order.User.email
                    })}
                  >
                    Mark as Cancelled
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
