import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createCategory,
  getAProductCategory,
  resetState,
  updateAProductCategory,
} from "../features/subSubCategory/pSubSubcategorySlice";

import { getSubCategories } from "../features/pSubcategory/pSubcategorySlice";

let schema = yup.object().shape({
  name: yup.string().required("SubSubCategory Name is Required"),
  subcategoryId: yup.string().required("sub Category is Required"),
});

const AddSubSubCat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getPCatId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const [category, setcategory] = useState([]);
  
  const newCategory = useSelector((state) => state.pCategory);
  
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    categoryName,
    updatedCategory,
  } = newCategory;

  useEffect(() => {
    dispatch(getSubCategories()).then((response) => {
      if (response.payload) {
        setcategory(response.payload);
      }
    });
    if (getPCatId !== undefined) {
      dispatch(getAProductCategory(getPCatId));
    } else {
      dispatch(resetState());
    }
  }, [getPCatId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("SubSubCategory Added Successfully!");
    }
    if (isSuccess && updatedCategory) {
      toast.success("Category Updated Successfully!");
      navigate("/admin/list-category");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdCategory, updatedCategory, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: categoryName || "",
      subcategoryId: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getPCatId !== undefined) {
        const data = { id: getPCatId, pCatData: values };
        dispatch(updateAProductCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4  title">
        {getPCatId !== undefined ? "Edit" : "Add"} SubSubCategory
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Product SubSubCategory"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
            id="category"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <div className="form-group">
            <label htmlFor="brand">Select SubCategory</label>
            <select
              className="form-control"
              id="category"
              name="subcategoryId"
              onChange={formik.handleChange("subcategoryId")}
              onBlur={formik.handleBlur("subcategoryId")}
              value={formik.values.subcategoryId}
            >
              <option value="">Select category</option>
              {category.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            <div className="error">
              {formik.touched.subcategoryId && formik.errors.subcategoryId}
            </div>
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getPCatId !== undefined ? "Edit" : "Add"} SubSubCategory
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSubSubCat;
