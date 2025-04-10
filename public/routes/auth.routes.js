//login signup verification for all user
import express from 'express';
import { authoriseUserApi, createPasswordPage, createVendorPasswordPage, getadminlogin, getCity, getUserLogin, getUserSignup, getVendorLogin, getVendorSignup, otpVerification, otpVerificationPage, postadminlogin, postUserLogin, postUserSingup, postVendorLogin, postVendorSingup, validateUserDetails, validateVendorDetails, vendorOtpVerification, vendorOtpVerificationPage } from '../controller/auth.controller.js';
import { upload } from '../middleware/multerValidation.js';
import { validateToken } from '../middleware/jwtToken.js';

const routes = express();

//--------------------------------------User Side-------------------------------------------

//get user signup ,login ,password,otp verfication page
routes.get('/signup', getUserSignup);
routes.all("/login", getUserLogin);
routes.post('/create-password-page',createPasswordPage)
routes.post('/otp-verification',otpVerificationPage);


//validating the token user using api,otp ,user deatils
routes.post('/authorise-user-api',validateToken,authoriseUserApi)
routes.post('/validate-user-details',upload.none(),validateUserDetails);
routes.post('/otp-verification-submit',upload.none(),otpVerification)


//Submiting the data to the database while signup and login
routes.post('/post-signup',upload.none(),validateToken,postUserSingup);
routes.post('/post-login',upload.none(), postUserLogin);


//--------------------------------------Vendor Side-------------------------------------------
//get vendor signup ,login ,password,otp verfication page
routes.get('/vendor-signup', getVendorSignup);
routes.all("/vendor-login", getVendorLogin);
routes.post('/vendor-create-password-page',createVendorPasswordPage)
routes.post('/vendor-otp-verification',vendorOtpVerificationPage);
routes.post('/getCity',getCity);

routes.post('/validate-vendor-details',upload.none(),validateVendorDetails)
routes.post('/vendor-otp-verification-submit',upload.none(),vendorOtpVerification)
routes.post('/post-vendor-signup',upload.none(),validateToken,postVendorSingup);
routes.post('/post-vendor-login',upload.none(),postVendorLogin)
routes.get('/admin',getadminlogin)
routes.post('/admin-login',upload.none(),postadminlogin)
export default routes;