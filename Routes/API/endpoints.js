const AllAPI = require("express").Router();
const {
  product,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductForMe,
} = require("../Controller/Product");
const { VerifyTokenAndAuthorization, VerifyAdmin } = require("./VerifyUser");
const {
  order,
  updateOrder,
  createOrder,
  findOrder,
  findOneOnly,
} = require("../Controller/Order");
const { sales } = require("../Controller/admin/Sales");
const { bill, createBill } = require("../Controller/admin/BillingAddress");
const { createPhone, Phone } = require("../Controller/admin/Phone");
const { createPolicy, policy } = require("../Controller/admin/Policy");
const { apiEndpoints } = require("../Controller/view");
const {
  adminProfile,
  adminUpdateProfile,
} = require("../Controller/admin/User");
const {
  userProfile,
  userUpdateProfile,
  getAllUsers,
} = require("../Controller/User");

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
const { all } = require("../Controller/admin/All");
const { categories } = require("../Controller/Categories");

// SEARCH FOR PRODUCTS
AllAPI.get("/query/:id", queryDB);
AllAPI.get("/category", categories);

// products
AllAPI.get("/get/all", all);
AllAPI.get("/", apiEndpoints);
AllAPI.get("/product/find/:id", findProduct);
AllAPI.post("/product/create", upload.array("image"), product);

AllAPI.get("/product", getProduct);
AllAPI.post("/get/all/product/id", getProductForMe);
AllAPI.put("/product/update/:id", upload.array("image"), updateProduct);
AllAPI.delete("/product/delete/:id", deleteProduct);

// Order
AllAPI.get("/order/", order);
AllAPI.get("/order/find/1/:id", findOneOnly);
AllAPI.get("/order/find/:id", findOrder);
AllAPI.post("/order/create", createOrder);
AllAPI.put("/order/update/:id", updateOrder);

// Sales
AllAPI.get("/sales", sales);

//Billing
AllAPI.get("/billing", bill);
AllAPI.post("/billing/create", createBill);

//Phone
AllAPI.get("/phone", Phone);
AllAPI.post("/phone/create", createPhone);

//Phone
AllAPI.get("/policy", policy);
AllAPI.post("/policy/create", createPolicy);

// Admin
AllAPI.get("/admin/profile/:id", adminProfile);
AllAPI.post("/admin/reset/password", adminUpdatePassword);
AllAPI.put("/admin/profile/update/:id", adminUpdateProfile);

// Reviews
AllAPI.get("/review", getReview);
AllAPI.get("/review/:id", getOneProductReviews);
AllAPI.post("/review/create", review);

// USER PROFILE
AllAPI.get("/users", getAllUsers);
AllAPI.get("/user/profile/:id", userProfile);
AllAPI.post("/user/reset/password", userUpdatePassword);
AllAPI.put("/user/profile/update/:id", userUpdateProfile);
module.exports = AllAPI;
