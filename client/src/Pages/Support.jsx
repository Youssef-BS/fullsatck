import React from "react";
import "./Support.css";

const Support = () => {
  return (
    <>
      <div className="container mt-5">
        <header className="d-flex justify-content-between align-items-center">
          <div>
            <p className="mb-0">
              Guest User | <a href="#" className="text-primary">Sign In</a>
            </p>
          </div>
          <a className="navbar-brand" href="http://localhost:3001" title="Support Center">
            <img src="https://www.fos-lighting.eu/images/logo.svg" alt="FOS Technologies" className="img-fluid" height={100} width={100} />
          </a>
        </header>

        <nav className="nav mt-3 mb-4">
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link" href="#">Support Center Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">Open a New Ticket</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Check Ticket Status</a>
            </li>
          </ul>
        </nav>

        <div className="content">
          <h1 className="mb-4">Open a New Ticket</h1>
          <p>Please fill in the form below to open a new ticket.</p>
          <form className="ticket-form" method="post" action="#" encType="multipart/form-data">
            <input type="hidden" name="__CSRFToken__" value="577abff6fd216564c92762ea5f17ba4d89b4fd22" />
            <input type="hidden" name="a" value="open" />

            <div className="form-section mb-4">
              <h3>Contact Information</h3>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  <span className="required">Email Address<span className="text-danger">*</span></span>
                </label>
                <input type="email" id="email" name="email" className="form-control" placeholder="" required />
              </div>
              <div className="mb-3">
                <label htmlFor="company" className="form-label">Company</label>
                <input type="text" id="company" name="company" className="form-control" placeholder="" />
              </div>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  <span className="required">Full Name<span className="text-danger">*</span></span>
                </label>
                <input type="text" id="fullName" name="fullName" className="form-control" placeholder="" required />
              </div>
              <div className="mb-3">
                <label htmlFor="customerId" className="form-label">Customer ID</label>
                <input type="text" id="customerId" name="customerId" className="form-control" placeholder="" />
              </div>
            </div>

            <div className="form-section mb-4">
              <h3>Help Topic</h3>
              <select id="topicId" name="topicId" className="form-select" required>
                <option value="">— Select a Help Topic —</option>
                <option value="18">Support</option>
              </select>
              <span className="text-danger">*</span>
            </div>

            <div className="form-section mb-4">
              <h3>Ticket Details</h3>
              <div className="mb-3">
                <label htmlFor="issueSummary" className="form-label">
                  <span className="required">Issue Summary<span className="text-danger">*</span></span>
                </label>
                <input type="text" id="issueSummary" name="issueSummary" className="form-control" placeholder="" required />
              </div>
              <div className="mb-3">
                <label htmlFor="details">Details</label>
                <textarea
                  className="form-control"
                  id="details"
                  rows="5"
                  placeholder="Details on the reason(s) for opening the ticket."
                ></textarea>
              </div>
            </div>

            <div className="form-buttons mb-4">
              <button type="submit" className="btn btn-primary">Create Ticket</button>
              <button type="reset" className="btn btn-secondary ms-2">Reset</button>
              <button type="button" className="btn btn-danger ms-2">Cancel</button>
            </div>
          </form>
        </div>
      </div>
      <footer className="text-center mt-5">
        <p>&copy; 2024 FOS Technologies - All rights reserved.</p>
        <a href="#" target="_blank" rel="noopener noreferrer">Helpdesk software - powered by SupportSystem</a>
      </footer>
    </>
  );
};

export default Support;
