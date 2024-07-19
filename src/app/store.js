import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/users/userSlice";
import customerReducer from "../features/cutomers/customerSlice"; // Corrected typo in import path
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import pCategoryReducer from "../features/pcategory/pcategorySlice";
import bCategoryReducer from "../features/bcategory/bcategorySlice";
import blogReducer from "../features/blogs/blogSlice";
import colorReducer from "../features/color/colorSlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import uploadReducer from "../features/upload/uploadSlice";
import couponReducer from "../features/coupon/couponSlice";
import pSubCategoryReducer from '../features/pSubcategory/pSubcategorySlice';
import pSubSubCategoryReducer from '../features/subSubCategory/pSubSubcategorySlice';
import projectReducer from "../features/project/projectSlice";
import projectProductReducer from "../features/projectProduct/projectProductSlice";
import newsroomReducer from "../features/newsRoom/newsroomSlice";
import featuredProductReducer from "../features/featuredProduct/featuredProductSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    pCategory: pCategoryReducer,
    bCategory: bCategoryReducer,
    blogs: blogReducer,
    color: colorReducer,
    enquiry: enquiryReducer,
    upload: uploadReducer,
    coupon: couponReducer,
    pSubCategory: pSubCategoryReducer,
    pSubSubCategory: pSubSubCategoryReducer,
    projects: projectReducer,
    projectProduct : projectProductReducer,
    newsroom: newsroomReducer,
    featuredProduct: featuredProductReducer,
  },
});
