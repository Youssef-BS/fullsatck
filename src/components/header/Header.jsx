import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useDispatch, useSelector } from 'react-redux';
import $ from 'jquery';
import { GetAll } from '../../Features/Product/ProductSlice';
import { selectCurrentUser, login } from '../../Features/auth/authSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'

// Import MUI Icons
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';

const HeaderComponent = () => {
  const { t } = useTranslation(); // Initialize translation hook
  const CurrentUser = useSelector(selectCurrentUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register, setRegister] = useState(false);
  const [drop, setDrop] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetAll());
  }, [dispatch]);

  useEffect(() => {
    const handlePopupLinkClick = (e) => {
      e.preventDefault();
      $("body").toggleClass("popup-open");
      $(".login-popup-container").toggleClass("active");
      $(".login-popup").toggleClass("show");
    };

    const handleCloseIconClick = () => {
      $("body").toggleClass("popup-open");
      $(".login-popup-container").toggleClass("active");
      $(".login-popup").toggleClass("show");
    };

    $(".login-popup-link").click(handlePopupLinkClick);
    $(".login-popup > i").click(handleCloseIconClick);

    if (register) {
      handleReverseAction();
      navigate('/');
    }
  }, [register, navigate]);

  const handleReverseAction = () => {
    $("body").toggleClass("popup-open");
    $(".login-popup-container").toggleClass("active");
    $(".login-popup").toggleClass("show");
  };

  const toogleRegister = () => {
    setRegister((prevState) => !prevState);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDrop = () => {
    setDrop(!drop);
  };

  const dropdownStyle = {
    display: 'block',
    position: 'absolute',
    transform: 'translate3d(0px, 40px, 0px)',
    top: 0,
    left: 0,
    willChange: 'transform',
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await dispatch(login({ email, password }));
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.message);
      if (error.response) {
        const { data } = error.response;
        setError(data.message);
      } else {
        setError('Login failed. Please check your credentials.');
      }
    }
  };

  return (
    <>
      <div className="top-bar">
        <div className="container-fluid">
          <div className="row">
            <div className="col-6 col-lg-3 left">
              <div className="row d-flex align-items-center h-100">
                <div className="col header-social">
                  <span>{t('follow_us')}</span>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <FacebookIcon style={{ color: 'black' }} />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <InstagramIcon style={{ color: 'black' }} />
                  </a>
                </div>
              </div>
            </div>
            <div className="col d-none d-lg-flex center header-links">
              <Link to="/create-account">{t('become_a_dealer')}</Link>
              <span>⋅</span>
              <Link to="/projects" className="more">{t('projects')}</Link>
              <Link to="/compare" className="more">Compare</Link>

              <span>⋅</span>
              <div className="header-links__submenu dropdown">
                <a href="#" className="dropdown-toggle" onClick={toggleDropdown}>
                  {t('about_us')}
                </a>
                <ul className="dropdown-menu" style={isDropdownOpen ? { display: 'block' } : {}}>
                  <li>
                    <a href="#">{t('who_we_are')}</a>
                  </li>
                  <li>
                    <a href="#">{t('terms_of_cooperation')}</a>
                  </li>
                  <li>
                    <a href="#">{t('freight_handling_costs')}</a>
                  </li>
                  <li>
                    <a href="#">{t('why_choose_fos')}</a>
                  </li>
                  <li>
                    <a href="#">{t('trade_shows_events')}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-6 col-lg-3 right">
              <div className="row justify-content-end">
                <div className="col-auto icon h-100">
                  {CurrentUser ? (
                    <div id="logged" className="login h-100 d-flex align-items-center">
                      <a href="#" id="login-popup-link" className="login-popup-link h-100">
                        <span className="user-name" style={{ color: "white" }}>{CurrentUser.user.firstname}</span>
                        <AccountCircleIcon style={{ color: 'white' }} />
                      </a>
                      <ul className="logged_in_options">
                        <li>
                          <Link to={`/account-info/${'Account Information'}`}>{t('account_information')}</Link>
                        </li>
                        <li>
                          <Link to={`/account-info/${'Order History'}`}>{t('my_orders')}</Link>
                        </li>
                        <li>
                          <Link to={`/account-info/${'Change Password'}`}>{t('change_password')}</Link>
                        </li>
                        <li>
                          <Link to={`/account-info/${'XML Products'}`}>{t('xml_products')}</Link>
                        </li>
                        <li>
                          <Link to={'/log-off'}>{t('logout')}</Link>
                        </li>
                      </ul>
                    </div>
                  ) : (<>
                    <div id="not-logged" className="login h-100 d-flex align-items-center">
                      <a href="#" id="login-popup-link" className="login-popup-link h-100" onClick={toggleDrop}>
                        <span className="user-name">{t('login_register')}</span>
                        <AccountCircleIcon style={{ color: '#F58220' }} />
                      </a>
                    </div>
                    
                    <LanguageSwitcher/>

                    </>
                  )}
                </div>
              </div>
            </div>

            <div id="login-popup-container" className={`login-popup-container ${drop ? 'active' : ''}`}>
              <div id="login-popup" className={`login-popup ${drop ? 'show' : ''}`}>
                <i className="las la-times">
                  <CloseIcon onClick={toggleDrop} style={{ color: "black" }} />
                </i>
                <div className="column signupcolumn">
                  <form name="login_c" id="login_c" method="post">
                    <div>
                      <span id="title" style={{ color: 'black' }}>{t('new_customer')}</span>
                    </div>
                    <div className="intro" style={{ color: 'black' }}>
                      {t('new_customer_welcome')}
                    </div>
                    <div className="btncontainer">
                      <button type="button" className="shop-btn" onClick={toogleRegister}>
                        {t('register')}
                      </button>
                    </div>
                    <div className="clear"></div>
                  </form>
                </div>
                <div className="column logincolumn">
                  <form name="login" id="login" method="post" onSubmit={handleLogin}>
                    <div>
                      <span id="title" style={{ color: 'black' }}>{t('registered_user')}</span>
                      <input type="hidden" id="come_from" name="come_from" value="https://www.fos-lighting.eu/" />
                    </div>
                    <div className="intro" style={{ color: 'black' }}>
                      {t('are_you_registered')}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', justifyItems: 'center' }}>
                      <EmailIcon style={{ color: "black", marginRight: '8px' }} />
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="field"
                        placeholder={t('email_address')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', justifyItems: 'center' }}>
                      <LockIcon style={{ color: "black", marginRight: '8px' }} />
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="field"
                        placeholder={t('password')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="forgot-pass">
                      <a href="#" className="forgotpassword" id="forgotpassword">
                        {t('forgot_your_password')}
                      </a>
                    </div>
                    <div className="btncontainer">
                      <button type="submit" className="shop-btn">
                        {t('login')}
                      </button>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <div className="clear"></div>
                  </form>
                </div>
                <div className="clear"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
