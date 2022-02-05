const AllAPI = require("express").Router();
const {
  product,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../Controller/Product");
const { VerifyTokenAndAuthorization } = require("./VerifyUser");
const { order, updateOrder } = require("../Controller/Order");
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

AllAPI.get("/", apiEndpoints);
AllAPI.post("/product/create", VerifyTokenAndAuthorization, product);
AllAPI.get("/product", getProduct);
AllAPI.put("/product/update/:id", VerifyTokenAndAuthorization, updateProduct);
AllAPI.delete(
  "/product/delete/:id",
  VerifyTokenAndAuthorization,
  deleteProduct
);

// Order
AllAPI.get("/order/", VerifyTokenAndAuthorization, order);
AllAPI.post("/order/create", VerifyTokenAndAuthorization, order);
AllAPI.put("/order/update/:id", VerifyTokenAndAuthorization, updateOrder);

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

AllAPI.get("/user/profile/:id", VerifyTokenAndAuthorization, userProfile);
AllAPI.post(
  "/user/profile/password",
  VerifyTokenAndAuthorization,
  userUpdatePassword
);
AllAPI.put(
  "/user/profile/update/:id",
  VerifyTokenAndAuthorization,
  userUpdateProfile
);
module.exports = AllAPI;
