import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { verificationEmail } from '../Features/auth/authSlice';

const VerificationCode = () => {
    const [verificationError, setVerificationError] = useState('');
    const [verificationCode, setCodeVerificationCode] = useState('');
    const dispatch = useDispatch();
    const location = useLocation();
    const verifyState = useSelector((state) => state.auth.verificationEmail);



    // Extract token from query params
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    console.log(token , verificationCode)

    const handleVerificationSubmit = async (e) => {
        e.preventDefault();
        if (!verificationCode) {
            setVerificationError('Verification code is required');
            toast.error('Verification code is required');
            return;
        }

        try {
            dispatch(verificationEmail({ verificationCode, token }));
        } catch (error) {
            setVerificationError(error.message);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (verifyState) {
            toast.success('Email verification successful, we will send a confirmation email');
        }
    }, [verifyState]);

    return (
        <div className="container-fluid">
            <ToastContainer />
            <div className="section-bg-w-br-30 create-account px-3 px-lg-5 pb-0 pb-lg-5">
                <form name="verification_form" id="verification_form" noValidate onSubmit={handleVerificationSubmit}>
                    <div className="row text-center">
                        <div className="col-12 col-lg-11 offset-lg-1">
                            <div>
                                <h1 className="headingtitle text-left pt-4 pb-3 pt-lg-5 pb-lg-5">Email Verification</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row pb-5 mb-5">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="field">
                                <div className="fieldlabel">Verification Code:</div>
                                <div className="fieldkey">
                                    <input
                                        type="text"
                                        name="verificationCode"
                                        id="verificationCode"
                                        value={verificationCode}
                                        onChange={(e) => setCodeVerificationCode(e.target.value)}
                                    />
                                    <span className="inputRequirement">*</span>
                                </div>
                                <div className="clear"></div>
                            </div>
                            <Button type="submit" className="btn-submit btn-rounder btn-filled">Verify Email</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerificationCode;
