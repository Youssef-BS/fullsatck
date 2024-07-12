import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import Bloglist from "./pages/Bloglist";
import Blogcatlist from "./pages/Blogcatlist";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Colorlist from "./pages/Colotlist";
import Categorylist from "./pages/Categorylist";
import Brandlist from "./pages/Brandlist";
import Productlist from "./pages/Productlist";
import Addblog from "./pages/Addblog";
import Addblogcat from "./pages/Addblogcat";
import Addcolor from "./pages/Addcolor";
import Addcat from "./pages/Addcat";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";
import Couponlist from "./pages/Couponlist";
import AddCoupon from "./pages/AddCoupon";
import ViewEnq from "./pages/ViewEnq";  
import ViewOrder from "./pages/ViewOrder";
import { useSelector } from "react-redux";
import Authorised from "./utils/auth";
import EditProduct from "./pages/editProduct";
import Signup from "./pages/SignUp";
import AddCustomers from "./pages/AddCostumers";
import UserDetails from "./pages/UserDetails";
import AddSubCat from "./pages/AddSubCat";
import SubCatList from "./pages/SubCatList";
import SubSubList from "./pages/SubSubList";
import AddSubSubCat from "./pages/AddSubSubCat";
import UserToVerif from "./pages/UserToVerif";
import Projects from "./pages/Projects";
import AddProject from "./pages/AddProject";
import UpdateProject from "./pages/UpdateProject";
import AddProjectProduct from "./pages/AddProjectProduct";
import ProjectProductList from "./pages/ProjectProductList";

function App() {
  const currentUser = useSelector((state)=>state.auth.user);
  console.log(";;;;"+currentUser)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/signup" element={<Signup/>}/>

        <Route path="/admin" element={<Authorised user={currentUser}> <MainLayout /></Authorised>}>
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="enquiries/:id" element={<ViewEnq />} />
          <Route path="blog-list" element={<Bloglist />} />
          <Route path="blog" element={<Addblog />} />
          <Route path="blog/:id" element={<Addblog />} />
          <Route path="coupon-list" element={<Couponlist />} />
          <Route path="coupon" element={<AddCoupon />} />
          <Route path="coupon/:id" element={<AddCoupon />} />
          <Route path="blog-category-list" element={<Blogcatlist />} />
          <Route path="blog-category" element={<Addblogcat />} />
          <Route path="blog-category/:id" element={<Addblogcat />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order/:id" element={<ViewOrder />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers-not-verif" element={<UserToVerif />} />
          <Route path="add-customers" element={<AddCustomers />} />
          <Route path="projects" element={<AddProject />} />
          <Route path="list-project" element={<Projects />} />
          <Route path="edit_project/:id" element={<UpdateProject />} />
          <Route path="user-details/:id" element={<UserDetails />} />
          <Route path="list-color" element={<Colorlist />} />
          <Route path="color" element={<Addcolor />} />
          <Route path="color/:id" element={<Addcolor />} />
          <Route path="list-category" element={<Categorylist />} />
          <Route path="category" element={<Addcat />} />
          <Route path="list-subcategory" element={<SubCatList />} />
          <Route path="sub-category" element={<AddSubCat />} />
          <Route path="list-subsubcategory" element={<SubSubList />} />
          <Route path="subsub-category" element={<AddSubSubCat />} />
          <Route path="category/:id" element={<Addcat />} />
          <Route path="list-brand" element={<Brandlist />} />
          <Route path="brand" element={<Addbrand />} />
          <Route path="brand/:id" element={<Addbrand />} />
          <Route path="list-product" element={<Productlist />} />
          <Route path="product" element={<Addproduct />} />
          <Route path="edit_product/:id" element={<EditProduct />} />
          <Route path="addProjectProduct" element={<AddProjectProduct />} />
          <Route path="addProjectProductList" element={<ProjectProductList />} />
        </Route>
        <Route path= "/*" element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
