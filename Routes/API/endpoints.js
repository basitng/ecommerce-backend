const AllAPI = require("express").Router();
const {
  product,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../Controller/Product");
const { VerifyTokenAndAuthorization, VerifyAdmin } = require("./VerifyUser");
const {
  order,
  updateOrder,
  createOrder,
  findOrder,
} = require("../Controller/Order");
const { sales, createSale, updateSale } = require("../Controller/admin/Sales");
const { bill, createBill } = require("../Controller/admin/BillingAddress");
const { createPhone, Phone } = require("../Controller/admin/Phone");
const { createPolicy, policy } = require("../Controller/admin/Policy");
const { apiEndpoints } = require("../Controller/view");
const {
  adminProfile,
  adminUpdateProfile,
} = require("../Controller/admin/User");
const { userProfile, userUpdateProfile } = require("../Controller/User");
const { adminUpdatePassword } = require("../Controller/admin/Password");
const { userUpdatePassword } = require("../Controller/Password");
const { upload } = require("../../cloud");
const {
  getReview,
  review,
  getOneProductReviews,
} = require("../Controller/Review");
const { findProduct } = require("../Controller/findProduct");
const { queryDB } = require("../Controller/SearchBar");

// SEARCH FOR PRODUCTS
AllAPI.get("/query/:id", queryDB);

// products
AllAPI.get("/", apiEndpoints);
AllAPI.get("/product/find/:id", findProduct);
AllAPI.post("/product/create", VerifyAdmin, upload.array("image"), product);

// AllAPI.get("/product", getProduct);
// AllAPI.put("/product/update/:id", VerifyAdmin, updateProduct);
// AllAPI.delete(
//   "/product/delete/:id",
//   VerifyTokenAndAuthorization,
//   deleteProduct
// );

// Order
AllAPI.get("/order/", order);
AllAPI.get("/order/find/:id", findOrder);
AllAPI.post("/order/create", createOrder);
AllAPI.put("/order/update/:id", VerifyAdmin, updateOrder);

// Sales
AllAPI.get("/sales", VerifyTokenAndAuthorization, sales);
AllAPI.post("/sales/create", VerifyTokenAndAuthorization, createSale);
AllAPI.put("/sales/update/:id", VerifyTokenAndAuthorization, updateSale);

//Billing
AllAPI.get("/billing", VerifyTokenAndAuthorization, bill);
AllAPI.post("/billing/create", VerifyTokenAndAuthorization, createBill);

//Phone
AllAPI.get("/phone", VerifyTokenAndAuthorization, Phone);
AllAPI.post("/phone/create", VerifyTokenAndAuthorization, createPhone);

//Phone
AllAPI.get("/policy", VerifyTokenAndAuthorization, policy);
AllAPI.post("/policy/create", VerifyTokenAndAuthorization, createPolicy);

// Admin
AllAPI.get("/admin/profile/:id", VerifyTokenAndAuthorization, adminProfile);
AllAPI.post(
  "/admin/profile/password",
  VerifyTokenAndAuthorization,
  adminUpdatePassword
);
AllAPI.put(
  "/admin/profile/update/:id",
  VerifyTokenAndAuthorization,
  adminUpdateProfile
);

// Reviews
AllAPI.get("/review", getReview);
AllAPI.get("/review/:id", getOneProductReviews);
AllAPI.post("/review/create", review);

// USER PROFILE
AllAPI.get("/user/profile/:id", userProfile);
AllAPI.post("/user/profile/password", userUpdatePassword);
AllAPI.put("/user/profile/update/:id", userUpdateProfile);
module.exports = AllAPI;
